import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Event from './components/Event/Event';
import Layout from './components/Layout'; // Import the layout component
import EventList from './components/EventList/EventList';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />, // The layout component is used for all routes
      children: [
        {
          path: '/',
          element: <Home />,  // Home component will be rendered inside Layout
        },
        {
          path: '/event',
          element: <Event />,  // Event component will be rendered inside Layout
        },
        {
          path:"/list",
          element: <EventList />,
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<Signup/>
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
