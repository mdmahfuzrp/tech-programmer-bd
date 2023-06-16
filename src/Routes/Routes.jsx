import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home/Home";
import Error from "../Pages/error/error";
import Dashboard from "../Layout/Dashboard/Dashboard/Dashboard";
import MyDashboard from "../Pages/MyDashboard/MyDashboard";
import MySelectedClass from "../Pages/MySelectedClass/MySelectedClass";
import MyEnrolledClass from "../Pages/MyEnrolledClass/MyEnrolledClass";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import AllUsers from "../Pages/AllUsers/AllUsers";
import AddClass from "../Pages/AddClass/AddClass";
const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'mydashboard',
                element: <MyDashboard></MyDashboard>
            },
            {
                path: 'myselectedclass',
                element: <MySelectedClass></MySelectedClass>
            },
            {
                path: 'myenrolledclass',
                element: <MyEnrolledClass></MyEnrolledClass>
            },
            {
                path: 'allusers',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'addClass',
                element: <AddClass></AddClass>
            }
        ]
    },
    {
        path: '/*',
        element: <Error></Error>
    }
])
export default router;