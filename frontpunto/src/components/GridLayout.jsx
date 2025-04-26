

export const GridLayout = ({children}) => {
    return (
        <div className={`
            flex-1
            overflow-auto
            grid
            grid-cols-3
            sm:grid-cols-3
            md:grid-cols-2
            lg:grid-cols-3
            gap-4
        `}>
            {children}
        </div>
    )
}