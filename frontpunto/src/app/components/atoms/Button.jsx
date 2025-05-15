export const Button = ({onClick, children, extraCls=""}) => {
    return (
        <button type="submit"
                className={`
                bg-red-400
                p-2 
                rounded
                hover:cursor-pointer
                hover:opacity-75
                text-white
                ${extraCls}
        `}
        onClick={onClick}
        >{children}</button>
    )
}