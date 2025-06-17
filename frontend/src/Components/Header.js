import React, { useState } from 'react';
import { Layout, Button, Modal, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined } from '@ant-design/icons';
import { LogoutOutlined, ReloadOutlined } from '@ant-design/icons';

const { Header } = Layout;
const CORRECT_PIN = '1515';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pin, setPin] = useState('');

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    setPin('');
  };
  const onRefresh = () => {
    window.location.reload(); // Full hard reload of the page
  };

  const handleConfirm = () => {
    if (pin === CORRECT_PIN) {
      message.success('PIN confirmed!');
      setIsModalVisible(false);
      navigate('/transportlog');
    } else {
      message.error('กรุณา ลองใหม่');
      alert('กรุณา ลองใหม่ รหัสไม่ถูกต้อง')
      setPin('');
    }
  };

  return (
    <Header
      style={{
        padding: '0 24px',
        background: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Button icon={<ReloadOutlined />} onClick={onRefresh}>
        Refresh
      </Button>
      <span></span>
      <Button type="primary" icon={<LoginOutlined />} onClick={showModal}>
        Login
      </Button>
      
      <Modal
        title="Enter PIN"
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Confirm"
      >
        <Input.Password
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          maxLength={4}
        />
      </Modal>
    </Header>
  );
};

export default HeaderComponent;
