import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, footer, isOpen, onClose }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            />

            <div className="relative
                bg-white
                rounded-lg
                shadow-lg
                z-10
                w-full max-w-md sm:max-w-sm
                flex flex-col
                max-h-[90vh]">
                <div className="p-6 w-full flex-1 overflow-auto">{children}</div>

                {footer && (
                    <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
