import Input from "../components/Input.jsx";
import {useState} from "react";
import {sender} from "../utils/sender.js";
import useUserStore from "../store/useUserStore.jsx";
import {useNavigate} from "react-router";


const Login = () => {
    const {setToken, setUser, setIsAuthenticated} = useUserStore((state) => state);
    const [email, setEmail] = useState({
        value: "",
        error: false,
        type: "email"
    });
    const navigate = useNavigate();


    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(email.error) {
            alert("Escriba su email");
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

    return <div className="
        w-full
        h-full
        flex
        justify-center
        items-center
        flex-col
        ">
        <form
            className="
            p-4
            flex
            flex-col
            border
            rounded
            border-gray-400
            w-4/12
            gap-4
        "
            onSubmit={onSubmit}
        >
            <div >
                <label htmlFor="email"
                       className="font-bold"
                >Email</label>
                <Input input={email}
                       onChange={(newEmail) => {
                            setEmail(newEmail)
                       }
                } />
            </div>
            <div>
                <button className="
                    p-2
                    border
                    w-full
                    bg-[#F04E4A]
                    border-none
                    hover:opacity-75
                    hover:cursor-pointer
                ">Entrar</button>
            </div>
        </form>
    </div>
}

export default Login;