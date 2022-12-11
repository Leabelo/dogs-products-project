import "./Menu.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import { Unsubscribe } from "redux";
import AddIcon from '@mui/icons-material/AddCircleOutline';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PermIdentityTwoToneIcon from '@mui/icons-material/PermIdentityTwoTone';
import HailTwoToneIcon from '@mui/icons-material/HailTwoTone';
import { Button, Box, Modal, ListItemText } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: `80%`,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
};

function Menu(): JSX.Element {

  const [isAdmin, setIsAdminLoggedIn] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  let unsubscribeMe: Unsubscribe;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setIsAdminLoggedIn(authService?.isAdmin());
    (async () => {
      try {
        unsubscribeMe = authStore.subscribe(() => {
          setIsAdminLoggedIn(authService?.isAdmin());
        });
      } catch (err) {
        console.error(err);
      }
    })();
    return () => unsubscribeMe();
  }, []);

  return (
    <div className="Menu">
 <NavLink to='/aboutApp'>        <Button variant="contained" color="primary" size="medium" disableElevation><PermIdentityTwoToneIcon />About </Button>
</NavLink>
      <Button variant="contained" color="primary" size="medium" disableElevation onClick={handleOpen}><HailTwoToneIcon />Login Info</Button>
      <br />
      {isAdmin && <NavLink to="/admin-panel"><Button variant="contained" color="primary" size="medium" disableElevation><PermIdentityTwoToneIcon />Admin Panel</Button></NavLink>}
      {isAdmin && <Button variant="contained" color="primary" disableElevation>
        <AddIcon />
        <NavLink to='/products/new'>Add Product</NavLink>
      </Button>}
      {isAdmin && <Button variant="contained" color="primary" disableElevation>
        <EqualizerIcon />
        <NavLink to='/reports'>Reports</NavLink>
      </Button>}
      {isAdmin && <NavLink to="/home"><Button variant="contained" color="primary" size="medium" disableElevation><HomeTwoToneIcon /> Home</Button></NavLink>}

      {/* Modal Area */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <h3>A FullStack Project Implementing:</h3>
          <h4><b>Node.js + Express.js + React.js + MySQL + RealTime updates with Socket.io + VictoryChart reports</b></h4>

          <ListItemText
            primary="Demo login Credecials:"
          />
          <br />
          for admin: <br />
          username: admin<br />
          password: admin <br />
          <br />
          <br />
          for user: <br />
          username: user <br />
          password: user <br />
          <br />
          register: as user (only)
          <br />
          <br />
          <br />
          <br />
          <br />
          <Button onClick={handleClose} autoFocus> Close </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Menu;
