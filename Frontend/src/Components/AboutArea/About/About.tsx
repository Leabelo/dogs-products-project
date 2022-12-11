import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import ContactUs from "../ContactUs/ContactUs";
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import "./About.css";

function About(): JSX.Element {
    return (
        <div className="About">

            <ContactUs />
            <br />
            <br />
            <NavLink to="/home"><Button variant="contained" color="primary" size="medium" disableElevation><HomeTwoToneIcon /> Home</Button></NavLink>

        </div>
    );
}



export default About;
