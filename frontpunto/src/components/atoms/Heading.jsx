const Heading = ({children, level = 2, className}) => {
    const Tag = `h${level}`;

    return <Tag>{children}</Tag>
}

export default Heading