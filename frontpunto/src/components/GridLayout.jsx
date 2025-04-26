export const GridLayout = ({children}) => {
    return (
        <div className="flex-1 overflow-auto
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {children}
        </div>
    )
}