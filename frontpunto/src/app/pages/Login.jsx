import Input from "../components/atoms/Input.jsx";
import {useState} from "react";
import useUserStore from "../../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import {Button} from "../components/atoms/Button.jsx";
import Logo from "../components/molecules/Logo.jsx";
import UserLoginRepository from "../../domain/repositories/UserLoginRepository.js";
import UserLoginService from "../../domain/services/UserLoginService.js";


const clsContainer = "flex items-center w-full h-full flex-col md:flex-row";
const clsLeftSide = "w-full md:w-1/2 bg-gray-800 h-[65px] md:h-full flex flex-col items-center justify-center gap-4";
const clsRightSide = "w-full md:w-1/2 flex justify-center items-center flex-1";
const clsForm = "flex gap-4 flex-col p-4 w-10/12 md:w-8/12";

const Login = () => {
    const {setToken, setUser, setIsAuthenticated} = useUserStore((state) => state);
    const [email, setEmail] = useState({
        value: "",
        error: false,
        type: "email",
        placeholder: "Email"
    });
    const navigate = useNavigate();

    const userLoginRepository = new UserLoginRepository();
    const userLoginService = new UserLoginService(userLoginRepository);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        try {

            let loginResponse = await userLoginService.execute(email.value);

            if(loginResponse !== null) {
                setToken(loginResponse.token);
                setUser(loginResponse.user);
                setIsAuthenticated(true);
                navigate("/punto");
            }else {
                setToken(null);
                setUser(null);
                setIsAuthenticated(false);
            }
        }catch (e) {
            console.log("error", {e});
            alert(e.message);
        }

    }

    return <div className={clsContainer}>
                <div className={clsLeftSide}>
                    <img src="/images/login_il.svg" alt="Logo"
                         className="w-8/12 hidden md:flex" />
                    <Logo />
                </div>
                <div className={clsRightSide}>
                    <form className={clsForm}>
                        <div className="">Email</div>
                        <Input
                            input={email}
                            sty="login"
                            onChange={(newEmail) => {
                               setEmail(newEmail)
                            }} />
                        <Button extraCls="w-full"
                                onClick={onSubmit}>
                            Entrar
                        </Button>
                    </form>
                </div>
            </div>
}

export default Login;