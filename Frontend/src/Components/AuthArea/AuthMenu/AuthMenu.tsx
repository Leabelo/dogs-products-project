import { Button } from "@mui/material";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/Store";
import "./AuthMenu.css";


interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {

    private unsubscribeMe: Unsubscribe;

    public componentDidMount() {

        this.setState({ user: authStore.getState().user });
        this.unsubscribeMe = authStore.subscribe(() => {
            const user = authStore.getState().user;
            this.setState({ user });
        });
    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">

                {!this.state?.user &&
                    <>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <NavLink to="/login">
                            <Button variant="contained" size="medium" disableElevation>Login</Button>
                        </NavLink>
                        <span> | </span>
                        <NavLink to="/register">
                            <Button variant="contained" size="medium" disableElevation>Register</Button>
                        </NavLink>
                    </>
                }

                {this.state?.user &&
                    <>
                        <span>Hello {this.state.user.firstName + " " + this.state.user.lastName}</span>
                        <span> | </span>
                        <NavLink to="/logout">
                            <Button variant="contained" size="medium" disableElevation>Logout</Button>
                        </NavLink>
                    </>
                }

            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default AuthMenu;
