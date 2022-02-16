import {
  Button,
  Card,
  Col, Empty, Input, PageHeader, Popconfirm,
  Row,
  Spin, Switch, Typography
} from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useOpenCloseActionsWithState from "../../hooks/useOpenCloseActionsWithState";
import { Config } from "../../utils/config";
import { openNotification } from "../../utils/notify";
import validateFields from "../../utils/validateFields";
import { DeviceModel } from "../models/device-model";
import { PeripheralsModel } from "../models/peripheral-model";
import { ResponseModel } from "../models/response-mode";
import { defaultNewPeripheral } from "./constants";


const { Text } = Typography;
const PeripheralsList = () => {
  const location = useLocation();
  //@ts-ignore
  const parent = location.state?.data! as DeviceModel;
  const [data, setData] = useState<PeripheralsModel[]>([]);
  const [record, setRecord] = useState<PeripheralsModel>({
    ...defaultNewPeripheral,
    gateway: parent._id,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();
  const [formErrorState, setFormErrorState] = useState<any>({});
  const navigate = useNavigate();

  const getData = useCallback(() => {
    const url = `${Config.apiUrl}${Config.peripheral}${Config.getAll}/${parent._id}`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        const data = jsondata as ResponseModel<PeripheralsModel>;
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
    (model: PeripheralsModel) => {
      setRecord({ ...model, record_status: "q", gateway: parent._id });
      handleOpen();
    },
    [handleOpen, parent]
  );
  const addNewRecord = useCallback(() => {
     setRecord(defaultNewPeripheral);
    handleOpen();
  }, [handleOpen]);
  const closeModal = useCallback(() => {
    setFormErrorState({});
    setRecord(defaultNewPeripheral);
    handleClose();
  }, [handleClose]);

  const handleSave = useCallback(
    (model: PeripheralsModel) => {
      const { vendor, uid, status } = model;
      const values = [vendor, uid].some((value) => !!value);

      if (!values) {
        setFormErrorState({
          ...formErrorState,
          ...validateFields({
            vendor,
            uid,
          }),
        });
        return;
      }
      setLoading(true);

      setFormErrorState({});

      const items =
        model.record_status === "n"
          ? {
              vendor: vendor,
              uid: uid,
              gateway: parent._id,
              status: status ? "ONLINE" : "OFFLINE",
            }
          : {
              ...model,
              gateway: parent._id,
              status: status ? "ONLINE" : "OFFLINE",
            };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: items,
        }),
      };
      const isNewRecord = model.record_status === "n";
      let url = `${Config.apiUrl}${Config.peripheral}`;
      url = isNewRecord
        ? `${url}${Config.createPeripheral}`
        : `${url}${Config.updatePeripheral}`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((jsondata) => {
          const data = jsondata as ResponseModel<any>;
          if (!data.error) {
            getData();
            openNotification(
              "success",
              `${
                isNewRecord ? "added new peripheral " : "updated successfully"
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
    [closeModal, formErrorState, getData, parent._id]
  );
  const handleDelete = useCallback(
    (model: PeripheralsModel) => {
      const url = `${Config.apiUrl}${Config.peripheral}${Config.deletePeripheral}/${model._id}`;
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
    if (parent._id) getData();
    //es-lint ignore-next-line
  }, [parent]);
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);
  const goBack = useCallback(() => {
    navigate("/devices");
  }, [navigate]);
  const handleSwitchChange = useCallback((checked: boolean) => {
    setRecord((prevState) => ({
      ...prevState,
      status: checked?"ONLINE":"OFFLINE",
    }));
  }, []);
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={goBack}
        title={`Device Peripherals-> ${parent.name} `}
      />
      <Row justify="end" style={{ padding: 15 }}>
        <Button onClick={addNewRecord} type="primary">
          Add New Peripheral
        </Button>
      </Row>
      {parent && (
        <Row justify="center">
          <div className="site-statistic-demo-card">
            <Card
              type="inner"
              title={`main device ${parent.name}`}
              style={{ width: 250 }}
            >
              <p>device name {parent.name} </p>
              <p>device IP {parent.ip} </p>
              <p>
                device Created At
                {moment(parent.createdAt).format("YYYY-MM-DD")}{" "}
              </p>
            </Card>
          </div>
        </Row>
      )}{" "}
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
                  <Card
                    size="small"
                    title={`device UID ${model.uid}`}
                    // style={{ width: 300}}
                  >
                    <p>Status {model.status} </p>
                    <p>Vendor{model.vendor} </p>
                    <p>
                      device Created At{" "}
                      {moment(model.createdAt).format("YYYY-MM-DD")}{" "}
                    </p>
                    <Row justify="space-around">
                      <Col span={6}>
                        <Button
                          onClick={(e) => {
                            handleEdit(model);
                          }}
                          type="primary"
                          children="   Edit"
                        />
                      </Col>
                      <Col span={6}>
                        <Popconfirm
                          title="Are you sure to delete this device?"
                          onConfirm={(e) => {
                            handleDelete(model);
                          }}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger children="   Delete" />
                        </Popconfirm>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              );
            })}
        </>
        <Modal
          title={
            record.record_status === "n"
              ? "Add New Peripheral"
              : `Edit Peripheral ${record}`
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
            <label>UID</label>
            <Input
              type="text"
              name="uid"
              onChange={handleChange}
              style={{ width: 150 }}
              value={record.uid}
              placeholder={"ip"}
            />
            {formErrorState && formErrorState["uid"] && (
              <Text type="danger">{formErrorState["uid"]}</Text>
            )}
            <label>vendor</label>

            <Input
              type="text"
              name="vendor"
              onChange={handleChange}
              style={{ width: 150 }}
              value={record.vendor}
              placeholder="vendor"
            />
            {formErrorState && formErrorState["vendor"] && (
              <Text type="danger">{formErrorState["vendor"]}</Text>
            )}
            <label>Status</label>

            <Switch
              title={"Status"}
              checked={record.status==="ONLINE"}
              onChange={handleSwitchChange}
              checkedChildren={"Online"}
              unCheckedChildren={"Offline"}
            />
          </Row>
        </Modal>
      </Row>
    </>
  );
};

export default memo(PeripheralsList);
