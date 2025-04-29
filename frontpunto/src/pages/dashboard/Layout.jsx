import {Outlet} from "react-router";
import PLink from "../../components/PLink.jsx";
import {useLayoutEffect, useState} from "react";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import Logo from "../../components/Logo.jsx";

const Layout = () => {
    const [showMenu, setShowMenu] = useState(false);
    const {width: windowWidth} = useWindowWidth();
    let letShowMenu = false;
    if(showMenu && windowWidth < 768) {
        letShowMenu = true;
    }

    return <div className="w-full h-full flex relative">
        <div className="h-[40px]
            bg-red-400
            flex
            items-center
            flex
            md:hidden
            absolute
            z-1
            w-full
            gap-2
        ">
            <span className="
                flex-0
                h-full
                flex
                justify-center
                items-center
                text-white
                hover:opacity-75
            "
            onClick={() => {
                setShowMenu(prev => !prev);
            }}>
            <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     className="w-8">
                      <path fillRule="evenodd"
                            d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z"
                            clipRule="evenodd"/>
                </svg>

            </span>
            <Logo />
        </div>
        <div className={`
            min-w-[200px]
            bg-gray-800
            text-white
            flex-col
            md:flex
            ${!letShowMenu ? "hidden" : ""}
            ${letShowMenu ? "absolute top-10 left-0 z-1 h-full w-10/12" : ""}
        `}>
            {
                !letShowMenu ? <div className="h-[40px] flex justify-center items-center">
                    <Logo />
                </div> : null
            }

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