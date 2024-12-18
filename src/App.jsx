import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';
import GenerativePress from './pages/GenerativePress';
import BlogPage from './pages/BlogPage';
import CreatorOnboard from './pages/CreatorOnboard';
import SignInPage from './pages/SignInPage';
import NewPasswordPage from './pages/NewPasswordPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import TeamsPage from './pages/TeamsPage';
import ProfilePage from './pages/ProfilePage';
import DraftPage from './pages/DraftPage';

const initialRouteConfig = [
  { path: '/', element: <Dashboard />, hideSidebar: false, hideHeader: false },
  { path: '/admin', element: <AdminPage />, hideSidebar: false, hideHeader: true },
  { path: '/teams', element: <TeamsPage />, hideSidebar: false, hideHeader: true },
  { path: '/profile', element: <ProfilePage />, hideSidebar: false, hideHeader: true },
  { path: '/drafts', element: <DraftPage />, hideSidebar: false, hideHeader: true },
  { path: '/sign-up', element: <SignUpPage />, hideSidebar: true, hideHeader: true },
  { path: '/sign-in', element: <SignInPage />, hideSidebar: true, hideHeader: true },
  { path: '/create-pass', element: <NewPasswordPage />, hideSidebar: true, hideHeader: true },
  { path: '/generativepress', element: <GenerativePress />, hideSidebar: true, hideHeader: false },
  { path: '/blog', element: <BlogPage />, hideSidebar: true, hideHeader: false },
  { path: '/creator-onboard', element: <CreatorOnboard />, hideSidebar: true, hideHeader: false },
  { path: '/explore', element: <Dashboard />, hideSidebar: false, hideHeader: false },
];

const Layout = ({ hideSidebar, hideHeader, children, onToggle }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(!hideSidebar);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
    if (onToggle) onToggle(!isSidebarVisible);
  };

  return (
    <Container fluid className="p-0" style={{ height: '100vh', width: '97vw' }}>
      <Row className="no-gutters" style={{ height: '100%' }}>
        {/* Conditional Sidebar */}
        {isSidebarVisible && !hideSidebar && (
          <Col
            xs={2}
            className="bg-light sidebar p-4"
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
        <Col
          xs={12}
          md={hideSidebar || !isSidebarVisible ? 12 : 10}
          className="body-content"
          style={{
            marginLeft: hideSidebar || !isSidebarVisible ? '1%' : '17.67%',
            transition: 'margin-left 0.3s ease',
          }}
        >
          {/* Conditional Header */}
          {!hideHeader && <Header toggleSidebar={toggleSidebar} />}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const [routeConfig, setRouteConfig] = useState(initialRouteConfig);

  const currentRoute = routeConfig.find((route) => route.path === location.pathname) || {};
  const { hideSidebar = false, hideHeader = false } = currentRoute;

  const handleToggle = (isSidebarVisible) => {
    const updatedRouteConfig = routeConfig.map((route) => {
      if (location.pathname === '/blog' || location.pathname === '/generativepress') {
        if (route.path === location.pathname) {
          return { ...route, hideSidebar: !isSidebarVisible };
        }
      }
      return route;
    });
    setRouteConfig(updatedRouteConfig);
  };

  const handleBackNavigation = () => {
    // Reset the state for `/blog` and `/generativepress` when navigating back
    setRouteConfig(
      routeConfig.map((route) =>
        route.path === '/blog' || route.path === '/generativepress'
          ? { ...route, hideSidebar: true }
          : route
      )
    );
  };

  React.useEffect(() => {
    // Listen for back/forward navigation
    window.addEventListener('popstate', handleBackNavigation);
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [routeConfig]);

  return (
    <Layout
      hideSidebar={hideSidebar}
      hideHeader={hideHeader}
      onToggle={handleToggle}
    >
      <Routes>
        {routeConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {/* Redirect to home if route doesn't match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
