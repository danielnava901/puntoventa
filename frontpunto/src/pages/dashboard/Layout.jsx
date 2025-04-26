import {Outlet} from "react-router";
import PLink from "../../components/PLink.jsx";

const Layout = () => {
    return <div className="w-full h-full flex">
        <div className="min-w-[200px] bg-gray-800 text-white flex flex-col">
            <div className="h-[40px] bg-red-400 flex justify-center items-center">ICON</div>
            <div className="flex flex-col gap-4 mt-4">
                <PLink path="/punto" extraCls="w-full h-[60px]">Venta</PLink>
                <PLink path="/punto/reportes" extraCls="w-full h-[60px]">Resumen</PLink>
            </div>
            <div className="mt-auto py-4">
                <PLink path="/logout" extraCls="w-full h-[60px]">Cerrar sesión</PLink>
            </div>
        </div>
        <div className="m-0 p-0 w-full h-full">
            <Outlet />
        </div>
    </div>
}

export default Layout;