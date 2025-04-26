import {NavLink} from "react-router";

const PLink = ({path, children, extraCls = ""}) => {

    return <NavLink
            end
            className={({isActive}) => {
                let base = `cursor-pointer hover:opacity-45 p-4 ${extraCls} `;
                if(isActive) base += " bg-gray-400 text-black";
                return base;
            }}
            to={path}
         >{children}</NavLink>
}

export default PLink;