import { authStore } from './../Redux/Store';
import axios from "axios";

class InterceptorsService {

    public createInterceptors(): void {

        axios.interceptors.request.use((request)=>{

           
            if(authStore.getState().token) {

                request.headers = {
                    authorization: "Bearer " + authStore.getState().token
                };
            }

            return request;
        });
    }
}

const interceptorsService = new InterceptorsService();
export default interceptorsService;

