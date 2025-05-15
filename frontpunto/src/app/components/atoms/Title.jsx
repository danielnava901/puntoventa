const Title = ({children, isSubtitle = false, onClick = () => {}}) => {
    return <span className={`
            font-bold
            ${isSubtitle ? "md:text-lg text-xs" : "md:text-2xl text-lg"}
        `}
        onClick={onClick}>{children}
    </span>
}

export default Title;