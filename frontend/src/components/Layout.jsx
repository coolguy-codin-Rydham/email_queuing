// Layout.js
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

const Layout = () => {
  return (
    <div>
      {/* This ensures Navbar is rendered for all routes */}
      <Navbar />
      {/* The page content will be rendered here based on route */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
