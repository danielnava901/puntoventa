export const BigButton = ({onClick, children}) => {
    return (
        <span className="
            flex
            justify-center
            items-center
            p-2
            rounded
            shadow-lg
            w-[170px]
            h-[70px]
            bg-gray-800
            text-white
            hover:cursor-pointer
            hover:opacity-75
        "
              onClick={onClick}
        >{children}</span>
    )
}