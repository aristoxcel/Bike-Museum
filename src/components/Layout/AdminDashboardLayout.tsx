import {
  MdAddChart,
  MdDashboard,
  MdManageHistory,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";

import { GiSplitCross } from "react-icons/gi";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import React, { useState } from "react";

import { Button, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";

import { FaJediOrder, FaUserCog } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
// import { useAppSelector } from "../../redux/hooks";
// import { useCurrentUser } from "../../redux/features/auth/authSlice";

const { Header, Content, Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "user",
};
const AdminDashboardLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // const user = useAppSelector(useCurrentUser);
  const user = "67f4d6a7b8dd5006f0ed6476";
  let sidebarItems;

  switch (user!) {
    case userRole.USER:
      sidebarItems = [
        {
          key: "UserDashboard",
          icon: <MdDashboard />,
          label: <NavLink to={"/user/dashboard"}>Dashboard</NavLink>,
        },
        {
          key: "view-order-history",
          icon: <FaMoneyCheckDollar />,
          label: (
            <NavLink to={"/user/dashboard/view-order-history"}>
              View order history
            </NavLink>
          ),
        },
      ];
      break;
    case userRole.ADMIN:
      sidebarItems = [
        {
          key: "AdminDashboard",
          icon: <MdDashboard />,
          label: <NavLink to={"/admin/dashboard"}>Dashboard</NavLink>,
        },
        {
          key: "ProductManagement",
          icon: <MdOutlineProductionQuantityLimits />,
          label: "Product Management",
          children: [
            {
              key: "AddProduct",
              icon: <MdAddChart />,
              label: (
                <NavLink to={"/admin/dashboard/add-product"}>
                  Add Product
                </NavLink>
              ),
            },
            {
              key: "ManageProduct",
              icon: <MdManageHistory />,

              label: (
                <NavLink to={"/admin/dashboard/manage-product"}>
                  Manage Product
                </NavLink>
              ),
            },
            {
              key: "ManagingOrders",
              icon: <FaJediOrder />,
              label: (
                <NavLink to={"/admin/dashboard/managing-orders"}>
                  Managing Orders
                </NavLink>
              ),
            },
          ],
        },
        {
          key: "UserManagement",
          icon: <FaUserCog />,
          label: "User Management",
          children: [
            {
              key: "DeactivatingAccounts",
              icon: <GiSplitCross />,
              label: (
                <NavLink to={"/admin/dashboard/deactivating-accounts"}>
                  Deactivating Accounts
                </NavLink>
              ),
            },
          ],
        },
      ];
      break;

    default:
      break;
  }
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, position: "sticky", top: 0, zIndex: 1000 }}
          className="bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] min-w-f"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white",
            }}
          />
        </Header>
        <Content>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardLayout;
