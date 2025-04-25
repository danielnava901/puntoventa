const PageLayout = ({children, showHeader = true, onBack = () => {}}) => {
    return <div className="
            w-full
            h-full
            bg-gray-200
            relative
            ">
        {
            showHeader ? <div className="absolute
            top-0
            left-0
            right-0
            h-[40px] bg-red-400 text-white flex items-center">
            <span className="underline p-4 cursor-pointer"
                  onClick={() => {
                      onBack()
                  }}>Volver</span>
            </div> : null
        }
        <div className={`
            ${showHeader ? "pt-[56px]" : "p-8"}
            flex
            flex-col
            w-full
            h-full
            items-center
            flex-col
        `}>
            {children}
        </div>
    </div>
}

export default PageLayout;