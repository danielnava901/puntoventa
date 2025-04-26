const PageLayout = ({children,
    showHeader = true,
    onBack = () => {},
    extraCls = ""
}) => {
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
            <div className="p-4 cursor-pointer flex items-center gap-1"
                  onClick={() => {
                      onBack()
                  }}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     className="size-6">
                  <path fillRule="evenodd"
                        d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                        clipRule="evenodd"/>
                </svg>
                <span>Volver</span>
            </div>
            </div> : null
        }
        <div className={`
            ${showHeader ? "pt-[56px]" : "p-8"}
            flex
            flex-col
            w-full
            ${extraCls}
        `}>
            {children}
        </div>
    </div>
}

export default PageLayout;