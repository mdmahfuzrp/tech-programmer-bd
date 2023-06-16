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
import ManageClasses from "../Pages/ManageClasses/ManageClasses";
import Feedback from "../Pages/Feedback/Feedback";
import Instructor from "../Pages/Instructor/Instructor";
import AllClasses from "../Pages/AllClasses/AllClasses";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Payment from "../Pages/Payment/Payment";
import MyClasses from "../Pages/MyClasses/MyClasses";
import Classes from "../Pages/Classes/Classes";
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
            },
            {
                path: 'instructors',
                element: <Instructor></Instructor>
            },
            {
                path: 'classes',
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
            },
            {
                path: 'manageClasses',
                element: <ManageClasses></ManageClasses>
            },
            {
                path: 'myClasses',
                element: <MyClasses></MyClasses>
            },
            {
                path: 'feedback/:id',
                element: <Feedback></Feedback>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            }
        ]
    },
    {
        path: '/*',
        element: <Error></Error>
    }
])
export default router;