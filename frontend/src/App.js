import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';
import { Layout } from 'antd';
// Display
import HomepageTwin from './Components/Homepage';
import CreateRoundtransportlog from './Transportlog/Createtransportlogg';
import TransportLog from './Transportlog/Transportlogg';
import UpdateRoundtransportlog from './Transportlog/UpdateTransportlog';

import RoundTransport from './Roundtransport/Roundtransport';


import Department from './Department/Department';


import Type from './Type/Type';

import Concernperson from './Concernperson/Concernperson';

import Area from './Area/Area';
const { Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <MainLayout collapsed={collapsed} setCollapsed={setCollapsed} />
    </Router>
  );
};

const MainLayout = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const hideSidebarPaths = ['/']; // Add paths where the sidebar should be hidden

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Conditionally render Sidebar */}
      {!hideSidebarPaths.includes(location.pathname) && (
        <Sidebar collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} />
      )}

      <Layout>
        {/* Header */}
        <HeaderComponent />

        {/* Main Content */}
        <Content
          style={{
            margin: '24px 16px',
            padding: '24px',
            background: '#ffffff',
            borderRadius: '4px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Routes>
            {/* <Route path='/' element={<HomepageTwin />} /> */}
            <Route path='/' element={<CreateRoundtransportlog />} />
            <Route path='/transportLog' element={<TransportLog />} />
            <Route path='/transportLog/:id' element={<UpdateRoundtransportlog />} />

            <Route path='/roundtransport' element={<RoundTransport />} />

            <Route path='/department' element={<Department />} />

            <Route path='/type' element={<Type />} />

            <Route path='/concernperson' element={<Concernperson />} />

            <Route path='/area' element={<Area />} />

          </Routes>
        </Content>

        <FooterComponent />
      </Layout>
    </Layout>
  );
};

export default App;
