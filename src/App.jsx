import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import GenerativePress from './pages/GenerativePress'; // Import the new page
import Header from './components/Header';

function App() {
  const [count, setCount] = useState(0);

  const MainLayout = () => {
    const location = useLocation();
    const hideLayout = location.pathname === '/generativepress';

    return (
      <Container fluid className="p-0" style={{ height: '100vh', width:hideLayout?'98vw':'95vw' }}>
        <Row className="no-gutters" style={{ height: '100%' }}>
          {!hideLayout && (
            <Col
              xs={2}
              className="bg-light p-4"
              style={{
                boxShadow: '4px 0 6px rgba(0, 0, 0, 0.1)',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                height: '100vh',
              }}
            >
              <Sidebar />
            </Col>
          )}

          <Col xs={hideLayout ? 12 : 10} className="p-4" style={{ marginLeft: hideLayout ? 0 : '17.67%' }}>
            {!hideLayout && <Header />}

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/generativepress" element={<GenerativePress />} />
              <Route path="/explore" element={<Dashboard />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
