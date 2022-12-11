import { authStore } from './../Redux/Store';
import axios from "axios";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import CredentialsModel from '../Models/CredentialsModel';
import jwtDecode from 'jwt-decode';

class AuthService {

    public user: UserModel = null;

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.urls.register, user);
        const token = response.data;
        authStore.dispatch(registerAction(token));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(config.urls.login, credentials);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }
    public logout(): void {
        authStore.dispatch(logoutAction());
    }

    public isLoggedIn(): boolean {
        const token = localStorage.getItem("token");
        if(!token){return false;}
        const decodedData: any = jwtDecode(token);
        const user = decodedData.user.role;
        if (user === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    public isGuest(): boolean {
        const token = localStorage.getItem("token");
        if(!token){return false;}
        const decodedData: any = jwtDecode(token);
        const user = decodedData.user.role;
        if (user === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    public isAdmin(): boolean {
        const token = localStorage.getItem("token");
        if(!token){return false;}
        const decodedData: any = jwtDecode(token);
        const user = decodedData.user.role;
        if (user === 2) {
            return true;
        }
        else {
            return false;
        }
    }

    public isTokenAvailable(): string {
        const token = localStorage.getItem("token");
        return token;
    }

    public getUser(): UserModel {
        if (authStore.getState().token !== null) {
            return authStore.getState().user;
        }
        else {
            const user = new UserModel();
            user.role = -1;
            return user;
        }
    }

}

const authService = new AuthService();
export default authService;