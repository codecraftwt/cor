// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useLocation, matchPath, useParams, useSearchParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, ToastContainer } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { isAuthenticated, startTokenWatcher } from './utils/auth';

// Pages
import Dashboard from './pages/Dashboard';
import GenerativePress from './pages/GenerativePress';
import BlogPost from './pages/BlogPost';
import CreatorOnboard from './pages/CreatorOnboard';
import SignInPage from './pages/SignInPage';
import NewPasswordPage from './pages/NewPasswordPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import TeamsPage from './pages/TeamsPage';
import ProfilePage from './pages/ProfilePage';
import DraftPage from './pages/DraftPage';
import BlogPage from './pages/BlogPage';
// import TeamMemberInvitations from './pages/teamMemberInvitations';
import TeamMemberInvitations from './pages/TeamMemberInvitations';
import PressRelease from './pages/PressRelease';
import { motion, AnimatePresence } from 'framer-motion';
import BlogsharePage from './pages/BlogsharePage';
import PresssharePage from './pages/PresssharePage';
// import CountryDropdown from './components/CountryDropdown';

const initialRouteConfig = [
  { path: '/', element: <Dashboard />, hideSidebar: false, hideHeader: false },
  // { path: '/CountryDropdown', element: <CountryDropdown />, hideSidebar: false, hideHeader: false },
  { path: '/admin', element: <AdminPage />, hideSidebar: false, hideHeader: false },
  { path: '/blogShare', element: <BlogsharePage />, hideSidebar: true, hideHeader: true },
  { path: '/pressShare', element: <PresssharePage />, hideSidebar: true, hideHeader: true },
  { path: '/teams', element: <TeamsPage />, hideSidebar: false, hideHeader: false },
  { path: '/profile', element: <ProfilePage />, hideSidebar: false, hideHeader: false },
  { path: '/drafts', element: <DraftPage />, hideSidebar: false, hideHeader: false },
  { path: '/press-release', element: <PressRelease />, hideSidebar: false, hideHeader: false },
  { path: '/blog', element: <BlogPage />, hideSidebar: false, hideHeader: false },
  { path: '/sign-up', element: <SignUpPage />, hideSidebar: true, hideHeader: true },
  { path: '/sign-in', element: <SignInPage />, hideSidebar: true, hideHeader: true },
  { path: '/create-pass', element: <NewPasswordPage />, hideSidebar: true, hideHeader: true },
  { path: '/generativepress', element: <GenerativePress />, hideSidebar: true, hideHeader: true },
  { path: '/generativepress/:id', element: <GenerativePress />, hideSidebar: true, hideHeader: true },
  { path: '/blog-post', element: <BlogPost />, hideSidebar: true, hideHeader: true },
  { path: '/blog-posts/:id', element: <BlogPost />, hideSidebar: true, hideHeader: true },
  { path: '/creator-onboard', element: <CreatorOnboard />, hideSidebar: true, hideHeader: true },
  { path: '/explore', element: <Dashboard />, hideSidebar: false, hideHeader: false },
  { path: '/team-member-invitations', element: <TeamMemberInvitations />, hideSidebar: true, hideHeader: true },
  { path: '/auth', element: <SignInPage />, hideSidebar: true, hideHeader: true },
];

const Layout = ({ hideSidebar, hideHeader, children, onToggle }) => {
  const location = useLocation();
  const { id: routeId } = useParams();
  const id = routeId
  const [isSidebarVisible, setSidebarVisible] = useState(!hideSidebar);
  const [isHeaderVisible, setHeaderVisible] = useState(!hideHeader);
  useEffect(() => {
    console.log(id,'id');
    console.log(location,'location');
    const matchPressId = matchPath('/generativepress/:id', location.pathname);
    const matchBlogId = matchPath('/blog-posts/:id', location.pathname);
    console.log(matchBlogId,'matchBlogId');
    
    // console.log(match,'match');
    // Check if it matches
  const isMatch = !!matchPressId || !!matchBlogId // `true` if it matches, `false` otherwise

  console.log(isMatch, 'Does it match?');
    
    if (location.pathname == '/sign-in' || location.pathname == '/sign-up' || location.pathname == '/create-pass' || location.pathname == '/team-member-invitations' || location.pathname == '/auth' || location.pathname == '/generativepress' || location.pathname == '/generativepress/id' || location.pathname == '/blog-post' || location.pathname == '/blog-posts/:id') {
      setSidebarVisible(true);

    }else if(isMatch){
      
      setSidebarVisible(true);
    }
  }, [id]);

  useEffect(()=>{
    console.log(id,'id');
    console.log(location,'location');
    const matchPressId = matchPath('/generativepress/:id', location.pathname);
    const matchBlogId = matchPath('/blog-posts/:id', location.pathname);
    console.log(matchBlogId,'matchBlogId');
    
    // console.log(match,'match');
    // Check if it matches
  const isMatch = !!matchPressId || !!matchBlogId 
  if(isMatch){
    setHeaderVisible(false);
  }else{
    setHeaderVisible(!hideSidebar);
  }
  },[
    hideHeader
  ])

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // Check if the window size is laptop/desktop
      if (windowWidth >= 1024) {
        setSidebarVisible(true); // Hide sidebar for laptop/desktop
      } else {
        setSidebarVisible(true); // Show sidebar for smaller screens
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hideSidebar]);


  const toggleSidebar = () => {
    const newVisibility = !isSidebarVisible;
    setSidebarVisible(newVisibility); 
    if (onToggle) onToggle(newVisibility); 
  };

  return (
    <Container fluid className="p-0" style={{ height: '100vh', width: '97vw' }}>
      <Row className="no-gutters" style={{ height: '100%' }}>
        {!hideSidebar && (
          <Col
            xs={2}
            className="sidebar p-4"
            style={{
              boxShadow: '0px 3.5px 5.5px 0px rgba(0, 0, 0, 0.02)',
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              height: '100vh',
              backgroundColor: '#FFF',
            }}
          >
            <Sidebar />
          </Col>
        )}
        <AnimatePresence>
          {!isSidebarVisible && ( // Render only when visible
            <motion.div
              initial={{ x: '-100%' }} // Start off-screen (left)
              animate={{ x: 0 }}      // Animate to visible position
              exit={{ x: '-100%' }}   // Animate back to off-screen when hiding
              transition={{ type: 'spring', stiffness: 100, damping: 20 }} // Smooth animation
              style={{
                boxShadow: '0px 3.5px 5.5px 0px rgba(0, 0, 0, 0.02)',
                position: 'fixed',
                top: 0,
                left: 0,
                bottom: 0,
                height: '100vh',
                backgroundColor: '#FFF',
                zIndex: 99,
                width: '40%',
                borderRight: '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <button className='position-absolute border-0 p-3 bg-transparent' style={{ right: '0' }} onClick={toggleSidebar}>X</button>
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>
        <Col
          xs={12}
          md={hideSidebar ? 12 : 10}
          className="body-content"
          style={{
            marginLeft: hideSidebar ? '1%' : '17.67%',
            // transition: 'margin-left 0.3s ease',
          }}
        >
          <AnimatePresence>
            {isHeaderVisible && <Header toggleSidebar={toggleSidebar} />}
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>

        </Col>
      </Row>
    </Container>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const [routeConfig, setRouteConfig] = useState(initialRouteConfig);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() && location.pathname !== '/sign-in' && location.pathname !== '/sign-up' && location.pathname !== '/create-pass' && location.pathname !== '/team-member-invitations' && location.pathname !== '/auth' && location.pathname !=='/blogShare' && location.pathname !=='/pressShare') {
      navigate('/sign-in');
    }
  }, [location.pathname, navigate]);

  const currentRoute = routeConfig.find((route) => route.path === location.pathname) || {};

  const { hideSidebar = true, hideHeader = false } = currentRoute;

  const handleToggle = (isSidebarVisible) => {
    // const updatedRouteConfig = routeConfig.map((route) => {
    //   if (location.pathname === '/blog-post' || location.pathname === '/generativepress') {
    //     if (route.path === location.pathname) {
    //       return { ...route, hideSidebar: !isSidebarVisible };
    //     }
    //   }
    //   return route;
    // });
    // setRouteConfig(updatedRouteConfig);
  };

  const handleBackNavigation = () => {
    setRouteConfig(
      routeConfig.map((route) =>
        route.path === '/blog-post' || route.path === '/generativepress'
          ? { ...route, hideSidebar: true }
          : route
      )
    );
  };

  useEffect(() => {
    window.addEventListener('popstate', handleBackNavigation);
    return () => {
      window.removeEventListener('popstate', handleBackNavigation);
    };
  }, [routeConfig]);

  return (
    <Layout hideSidebar={hideSidebar} hideHeader={hideHeader} onToggle={handleToggle}>
      <AnimatePresence mode="wait">
        <Routes>
          {routeConfig.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => {
  useEffect(() => {
    startTokenWatcher(); // Start watching token expiration
  }, []);

  return (
    <Router>
      <ToastContainer />
      <AppRoutes />
    </Router>
  );
};

export default App;
