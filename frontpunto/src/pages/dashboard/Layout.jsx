import {Outlet, useNavigate} from "react-router";
import useUserStore from "../../store/useUserStore.jsx";

const Layout = () => {
    const {logout} = useUserStore();
    const navigate = useNavigate();

    return <div className="w-full h-full flex">
        <div className="min-w-[200px] bg-gray-800 text-white flex flex-col">
            <div className="h-[40px] bg-red-400">ICON</div>
            <div className="flex flex-col gap-2">
                <span className="cursor-pointer hover:opacity-45"
                onClick={() => {
                    navigate("/punto");
                }}
                >Venta</span>
                <span className="cursor-pointer hover:opacity-45"
                  onClick={() => {
                      navigate("/punto/reportes");
                  }}
                >Resumen</span>
            </div>
            <div className="mt-auto py-4">
                <span className="cursor-pointer hover:opacity-45"
                      onClick={() => {
                          logout();
                          navigate("/login");
                      }}
                >Cerrar sesión</span>
            </div>
        </div>
        <div className="m-0 p-0 w-full h-full">
            <Outlet />
        </div>
    </div>
}

export default Layout;