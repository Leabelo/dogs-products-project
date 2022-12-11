import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigator = useNavigate();

    async function submit(user: UserModel) {
        try {
            await authService.register(user);
            notifyService.success("You are registered");
            navigator("/home");
        }
        catch(err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="Register Box">
			
            <h2>Register</h2>

            <form onSubmit={handleSubmit(submit)}>

                <label>First name: </label>
                <input type="text" autoFocus {...register("firstName")} />

                <label>Last name: </label>
                <input type="text" {...register("lastName")} />

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Register</button>

            </form>

        </div>
    );
}

export default Register;
