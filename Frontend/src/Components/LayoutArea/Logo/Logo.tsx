import "./Logo.css";
import logoImage from "../../../Assets/Images/logo.jpg";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import { NavLink } from "react-router-dom";


function Logo(): JSX.Element {
    return (
        <div className="Logo">
            <NavLink to="/home">
                <img src={logoImage} className="imagelogo" alt = "logo"/>
            </NavLink>
            <br/>
         <AuthMenu />

        </div>
    );
}

export default Logo;
