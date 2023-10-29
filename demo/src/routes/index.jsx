import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import About from "../pages/about";
import Events from "../pages/events";
import Teams from "../pages/team";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Logout from "../pages/logout";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";

const Routes = () => {
  const { token } = useAuth();
  function NavbarWrapper(){
    return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
    )
};
  const routesForPublic = [
    {
        path: "/", 
        element: <NavbarWrapper/>,
        children:[
            {
                path: "/about",
                element: <About />
              },
              {
                path: "/signup",
                element: <SignUp />,
              },
        ]
    }
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, 
      children: [
        {
          path: "/teams",
          element: <Teams />,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
        path: "/", 
        element: <NavbarWrapper/>,
        children:[
            {
                path: "/about",
                element: <About />
              },
              {
                path: "/signup",
                element: <SignUp />,
              },
              {
                path: "/login",
                element: <Login />
              }
        ]
    }
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
