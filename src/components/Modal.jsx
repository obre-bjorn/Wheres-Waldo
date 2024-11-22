/* eslint-disable react/prop-types */

const  Modal= ({children, isOpen, onClose}) => {



    if(!isOpen) return null

    


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 "
            onClick={onClose} // Close modal on overlay click
        >
                <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-10 relative"
                    onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                >
                    <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 hover:shadow-m hover:shadow-blue-900">
                        &times;
                    </button>
                    {children}
                </div>
            </div>
    )
}

export default Modal