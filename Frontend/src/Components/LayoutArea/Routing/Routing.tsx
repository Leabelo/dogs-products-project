import { Routes, Route, Navigate } from "react-router-dom";
import About from "../../AboutArea/About/About";
import Page404 from "../Page404/Page404";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import authService from "../../../Services/AuthService";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/Store";
import AdminPanel from "../../AdminArea/AdminPanel/AdminPanel";
import Home from "../../HomeArea/Home/Home";
import Reports from "../../AdminArea/Reports/Reports";
import UpdateProduct from "../../AdminArea/UpdateProduct/UpdateProduct";
import AddProduct from "../../AdminArea/AddProduct/AddProduct";
import AboutApp from "../AboutApp/AboutApp";



function Routing(): JSX.Element {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdminLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {

        const unsubscribeMe = authStore.subscribe(() => {
          setIsLoggedIn(authService.isLoggedIn());
          setIsAdminLoggedIn(authService.isAdmin());
        });
        return () => unsubscribeMe();
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Routes>
    
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/home" element={<Home /> } />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="/reports" element={<Reports /> } />
      <Route path="/aboutApp" element={<AboutApp /> } />
      <Route path="/products/update/:id" element={<UpdateProduct />} />
      <Route path="/products/new" element={<AddProduct />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Navigate to="/home" />} />
      {/* Page not found route - must be last route: */}
      <Route path="*" element={<Page404 />} />

    </Routes>
  );
}

export default Routing;
