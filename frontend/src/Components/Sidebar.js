import React, { memo, useEffect } from 'react';
import { HomeOutlined, UserOutlined, ExceptionOutlined, FileExcelOutlined, FileExclamationOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();

 

  // If user is not loaded yet, don't render the sidebar

  const items = [

    { key: '1', icon: <HomeOutlined />, label: <Link to="/roundtransport">บันทึก Box</Link> },

    { key: 'Package', icon: <ExceptionOutlined />, label: <Link to="/transportlog">รายการบันทึกฝุ่น</Link>},

    { key: 'department', icon: <FileExclamationOutlined />, label: <Link to="/department">หน่วยงาน</Link>},

    { key: 'type', icon: <FileExclamationOutlined />, label: <Link to="/type">ประเภทของเสีย</Link>},

    { key: 'Concern_person', icon: <FileExclamationOutlined />, label: <Link to="/concernperson">ชื่อผู้ชั่ง</Link>},

    { key: 'area', icon: <FileExclamationOutlined />, label: <Link to="/area">ชื่อสถานที่</Link>},
   
  ].filter(item => !item.hidden); // Filter out hidden items

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        background: 'linear-gradient(180deg, #001529 0%, #0a3d62 100%)',
        boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="logo" style={{ padding: '16px', textAlign: 'center', color: '#fff' }}>
        <div>
          {collapsed ? 'Compact' : 'Compact Brake'}
        </div>
        <div>
        </div>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

// Memoize the Sidebar component to prevent unnecessary re-renders
export default memo(Sidebar);
