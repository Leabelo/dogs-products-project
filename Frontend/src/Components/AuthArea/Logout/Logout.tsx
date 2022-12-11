import { useEffect } from "react";
import { useNavigate } from "react-router";
import authService from "../../../Services/AuthService";

function Logout(): JSX.Element {

    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
          try {
              await authService.logout();
              navigate("/home");
          } 
          catch (err) {
          }
        })();
        navigate("/home") }, []);
   
    return null;
}

export default Logout;
