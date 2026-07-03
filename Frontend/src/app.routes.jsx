import {createBrowserRouter} from "react-router";
import Register from "./Features/auth/pages/Register";
import Login from "./Features/auth/pages/Login";
import Home from "./Features/interview/pages/home";
import Report from "./Features/interview/pages/Report";
// import Protecedhomepage from "./Features/auth/Components/Protecedhomepage";
import Protected from "./Features/auth/Components/Protected";


 export const router = createBrowserRouter([
    {
        path: "/",
         element: <Protected><Home/></Protected>
        // < Protecedhomepage><Home/></Protecedhomepage>

    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
    path: "/report",
    element: <Report />,
  },
    
]);
