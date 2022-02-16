import { memo, useCallback, useEffect, useState } from "react";
import * as isIp from "is-ip";

import {
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Input,
  Popconfirm,
  Row,
  Spin,
  Typography,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import useOpenCloseActionsWithState from "../../hooks/useOpenCloseActionsWithState";
import { Config } from "../../utils/config";
import { openNotification } from "../../utils/notify";
import validateFields from "../../utils/validateFields";
import { DeviceModel } from "../models/device-model";
import { ResponseModel } from "../models/response-mode";
import { defaultNewDevice } from "./constants";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const DeviceList = () => {
  const [data, setData] = useState<DeviceModel[]>([]);
  const [record, setRecord] = useState<DeviceModel>(defaultNewDevice);
  const [loading, setLoading] = useState<boolean>(false);
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();
  const [formErrorState, setFormErrorState] = useState<any>({});
  const navigate = useNavigate();

  const getData = useCallback(() => {
    const url = `${Config.apiUrl}${Config.gateways}${Config.getAll}`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        const data = jsondata as ResponseModel<DeviceModel>;
        if (!data.error) {
          setData(data?.data);
          setLoading(false);
        }
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEdit = useCallback(
    (model: DeviceModel) => {
      setRecord({ ...model, record_status: "q" });
      handleOpen();
    },
    [handleOpen]
  );
  const viewPeripherals = useCallback(
    (model: DeviceModel) => {
      navigate("/peripheral", { state: { data: model } });
    },
    [navigate]
  );
  const addNewRecord = useCallback(() => {
    setRecord(defaultNewDevice);
    handleOpen();
  }, [handleOpen]);
  const closeModal = useCallback(() => {
    setFormErrorState({});
    setRecord(defaultNewDevice);
    handleClose();
  }, [handleClose]);

  const validatedIp = useCallback(
    (e) => {
      const { value } = e.target;

      const isValidIp = isIp.isIPv4(value);
      if (!isValidIp) {
        setFormErrorState({
          ...formErrorState,
          ip: " not valid IP ",
        });
      } else {
        setFormErrorState({
          ...formErrorState,
          ip: undefined,
        });
      }
    },
    [formErrorState]
  );

  const handleSave = useCallback(
    (model: DeviceModel) => {
      const { name, ip, serial } = model;
      const values = [name, ip, serial].some((value) => !!value);

      if (!values) {
        setFormErrorState({
          ...formErrorState,
          ...validateFields({
            name,
            ip,
            serial,
          }),
        });
        return;
      }
      setLoading(true);

      setFormErrorState({});

      const items =
        model.record_status === "n"
          ? { name: name, ip: ip, serial: serial }
          : { ...model };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: items,
        }),
      };
      const isNewRecord = model.record_status === "n";
      let url = `${Config.apiUrl}${Config.gateways}`;
      url = isNewRecord
        ? `${url}${Config.createGateWay}`
        : `${url}${Config.updateGateway}`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((jsondata) => {
          const data = jsondata as ResponseModel<any>;
          if (!data.error) {
            getData();
            openNotification(
              "success",
              `${
                isNewRecord ? "added new device " : "updated successfully"
              }     🤓`
            );

            closeModal();
          } else {
            openNotification("error", data.message);
          }
          setLoading(false);
        })

        .catch((error) => {
          console.error(error);
          setLoading(false);
          openNotification("error", "something went wrong");
        });
    },
    [closeModal, formErrorState, getData]
  );
  const handleDelete = useCallback(
    (model: DeviceModel) => {
      const url = `${Config.apiUrl}${Config.gateways}${Config.deleteGateway}/${model._id}`;
      setLoading(true);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: model._id,
        }),
      };
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((jsondata) => {
          const data = jsondata as ResponseModel<any>;
          if (!data.error) {
            getData();
            openNotification("success", "deleted successfully");
          }
          setLoading(false);
        })

        .catch((error) => {
          console.error(error);
          setLoading(false);
          openNotification("error", "something went wrong");
        });
    },
    [getData]
  );

  useEffect(() => {
    getData();
    //es-lint ignore-next-line
  }, []);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return (
    <>
      <Row justify="end" style={{ padding: 15 }}>
        <Button onClick={addNewRecord} type="primary">
          Add New Device
        </Button>
      </Row>
      {!loading && data.length === 0 && (
        <Row justify="center" children={<Empty />} />
      )}
      <Row justify="center">
        <Spin spinning={loading} size="large" />
      </Row>
      <Row justify="space-between">
        <>
          {!loading &&
            data &&
            data.map((model, index) => {
              return (
                <Col span={5} key={index}>
                  <Badge.Ribbon
                    text={`peripherals ${model.peripherals.length}`}
                    color="blue"
                  >
                    <Card
                      size="small"
                      title={`device serial ${model.serial}`}
                      // style={{ width: 300}}
                    >
                      <p>device name {model.name} </p>
                      <p>device IP {model.ip} </p>
                      <p>
                        device Created At
                        {moment(model.createdAt).format("YYYY-MM-DD")}{" "}
                      </p>
                      <Col md={12} span={12}>
                        <div>
                          <Button
                            onClick={(e) => {
                              viewPeripherals(model);
                            }}
                            size="small"
                            type="link"
                            children="View Peripherals"
                          />
                        </div>
                      </Col>
                      <Row justify="space-around">
                        <Col span={2}>
                          <Button
                            onClick={(e) => {
                              handleEdit(model);
                            }}
                            type="primary"
                            size="small"
                            children="   Edit"
                          />
                        </Col>
                        <Col span={2}>
                          <Popconfirm
                            title="Are you sure to delete this device?"
                            onConfirm={(e) => {
                              handleDelete(model);
                            }}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button
                              disabled={model.peripherals.length > 0}
                              danger
                              size="small"
                              children="   Delete"
                            />
                          </Popconfirm>
                        </Col>
                      </Row>
                    </Card>
                  </Badge.Ribbon>
                </Col>
              );
            })}
        </>

        <Modal
          title={
            record.record_status === "n"
              ? "Add New Device"
              : `Edit Device ${record.name}`
          }
          confirmLoading={loading}
          onOk={(e) => handleSave(record)}
          centered
          destroyOnClose
          visible={visible}
          width={800}
          onCancel={closeModal}
        >
          <Row justify="space-around">
            <label>IP</label>
            <Input
              type="text"
              name="ip"
              onChange={handleChange}
              style={{ width: 150 }}
              onBlur={validatedIp}
              value={record.ip}
              placeholder={"ip"}
            />
            {formErrorState && formErrorState["ip"] && (
              <Text type="danger">{formErrorState["ip"]}</Text>
            )}
            <label>Device Name</label>

            <Input
              type="text"
              name="name"
              onChange={handleChange}
              style={{ width: 150 }}
              value={record.name}
              placeholder="name"
            />
            {formErrorState && formErrorState["name"] && (
              <Text type="danger">{formErrorState["name"]}</Text>
            )}
            <label>Device Serial</label>

            <Input
              type="text"
              name="serial"
              onChange={handleChange}
              style={{ width: 150 }}
              value={record.serial}
              placeholder="serial"
            />
            {formErrorState && formErrorState["serial"] && (
              <Text type="danger">{formErrorState["serial"]}</Text>
            )}
          </Row>
        </Modal>
      </Row>
    </>
  );
};

export default memo(DeviceList);
