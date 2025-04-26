import Input from "../components/Input.jsx";
import {useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";
import {useNavigate} from "react-router";
import PageLayout from "./dashboard/PageLayout.jsx";
import {Button} from "../components/Button";


const Login = () => {
    const {setToken, setUser, setIsAuthenticated} = useUserStore((state) => state);
    const [email, setEmail] = useState({
        value: "",
        error: false,
        type: "email"
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
                url: "http://localhost:8000/api/login",
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

    return <PageLayout
            showHeader={false}
            extraCls="justify-center items-center h-full px-1">
            <form className="
                flex
                gap-4
                flex-col
                border
                p-4
                w-10/12
                md:w-8/12
                lg:w-4/12
            ">
                <div className="font-bold">Email</div>
                <Input input={email}
                       onChange={(newEmail) => {
                           setEmail(newEmail)
                       }
                       } />
                <Button extraCls="w-full" onClick={onSubmit}>Entrar</Button>
            </form>
        </PageLayout>
}

export default Login;