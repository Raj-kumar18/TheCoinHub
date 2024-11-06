import React from 'react'

const SelectButton = ({ children, selected, onClick }) => {
    return (
        <span
            onClick={onClick}
            className={`px-4 py-2 m-1 rounded-lg cursor-pointer transition-all duration-200
                ${selected ? "bg-orange-400 text-white" : "bg-orange-500 text-white"}
                hover:bg-orange-400 hover:text-white
                text-sm sm:text-base md:text-lg lg: text`}
        >
            {children}
        </span>
    )
}

export default SelectButton
