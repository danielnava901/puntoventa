const Text  = ({children, className = ""}) => {
    return <div className={`text-base ${className}`}>{children}</div>
}

export default Text;