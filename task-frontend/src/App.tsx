import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, Space } from "antd";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import React, { useCallback } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import useOpenCloseActionsWithState from "./hooks/useOpenCloseActionsWithState";
import DeviceList from "./components/Devices/DeviceList";
import PeripheralsList from "./components/Peripherals/PeripheralsList";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const { visible, handleClose, handleOpen } = useOpenCloseActionsWithState();
  const toggle = useCallback(() => {
    if (!visible) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [visible, handleClose, handleOpen]);
  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={visible}>
          <Row justify="space-around" align="middle">
            <img src={logo} alt="logo" className="logo mock-block" />
          </Row>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Devices
              <Link to="/devices" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 5 }}>
            {React.createElement(
              !visible ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 480,
            }}
          >
            <Row justify="space-around" align="middle" style={{padding:30}}>
              Welcome to Device App
            </Row>
            <Routes>
              <Route path="/" element={<DeviceList />} />
              <Route path="devices" element={<DeviceList />} />
              <Route path="peripheral" element={<PeripheralsList />} />
            </Routes>
          </Content>

          <Footer style={{ textAlign: "center" }}>MulsaSoft Demo</Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
