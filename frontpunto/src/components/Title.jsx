const Title = ({children, onClick = () => {}}) => {
    return <span className="font-bold text-lg md:text-2xl" onClick={onClick}>{children}</span>
}

export default Title;