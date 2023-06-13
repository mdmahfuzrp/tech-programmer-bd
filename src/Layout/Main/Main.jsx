import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import NavBar from "../../Shared/NavBar/NavBar";

const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default Main;