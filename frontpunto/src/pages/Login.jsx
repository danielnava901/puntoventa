import Input from "../components/Input.jsx";
import {useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import {Button} from "../components/Button";
import Title from "../components/Title.jsx";
import Logo from "../components/Logo.jsx";

const Login = () => {
    const {setToken, setUser, setIsAuthenticated} = useUserStore((state) => state);
    const [email, setEmail] = useState({
        value: "",
        error: false,
        type: "email",
        placeholder: "Email"
    });
    const navigate = useNavigate();
    const isEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    }

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(email.error || !isEmail(email.value)) {
            alert("Formato de email incorrecto");
            return;
        }

        try {
            let response = await sender({
                url: "http://localhost:8000/api/login/",
                data: {email: email.value}
            });

            if(response !== null) {
                setToken(response.token);
                setUser(response.user);
                setIsAuthenticated(true);
                navigate("/punto");
            }else {
                setToken(null);
                setUser(null);
                setIsAuthenticated(false);
            }
        }catch (e) {
            console.log("error", {e});
        }

    }

    return <div className="
                flex
                items-center
                w-full
                h-full
                flex-col
                md:flex-row
            ">
                <div className="w-full md:w-1/2 bg-gray-800 h-[65px] md:h-full
                    flex flex-col items-center justify-center gap-4">
                    <img src="/images/login_il.svg" alt="Logo" className="w-8/12 hidden md:flex" />
                    <Logo />
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center flex-1">
                    <form className="
                        flex
                        gap-4
                        flex-col
                        p-4
                        w-10/12
                        md:w-8/12
                    ">
                        <div className="">Email</div>
                        <Input
                            input={email}
                            sty="login"
                            onChange={(newEmail) => {
                               setEmail(newEmail)
                            }} />
                        <Button extraCls="w-full" onClick={onSubmit}>Entrar</Button>
                    </form>
                </div>
            </div>
}

export default Login;