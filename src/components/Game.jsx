import { useEffect, useState } from "react"


import CharDropdown from "./CharDropdown"
import bleachCharacters from "../assets/bleach.jpg"

const charactersToBeFound = ["Renji", "Toshiro", "Gin","Ichigo"]

const Game = () => {
    const [characters, setCharacters] = useState([])
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })

    useEffect(() => {
        setCharacters(charactersToBeFound)
    }, [])

    function handleImageClick(e) {
        // Get the click coordinates relative to the viewport
        const { pageX, pageY } = e
        let x
        let y
        
        // Get the container's position and dimensions
        const container = e.currentTarget.getBoundingClientRect()
        
        // Calculate position relative to the image
        const selectedX = pageX - window.scrollX
        const selectedY = pageY - window.scrollY

        console.log("X: ",selectedX)
        console.log("Y: ",selectedY)

        if((selectedY < 100 && selectedX < 30) || selectedY < 100){

            y = selectedY + 200
            x = selectedX + 50
        }else{

            x = selectedX
            y = selectedY

        }


        

        setDropdownPosition({ x, y })
        setDropdownVisible(true)
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.game-container')) {
                setDropdownVisible(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [])

    return (
        <div className="game-container relative w-full min-h-screen">
            <div className="relative">
                <img 
                    className="w-full h-auto border border-blue-500" 
                    src={bleachCharacters}
                    alt="bleach characters" 
                    onClick={handleImageClick}
                />
                
                {dropdownVisible && (
                    <div 
                        className="fixed bg-white text-black border border-gray-300 rounded shadow-lg z-50 p-2"
                        style={{ 
                            left: `${dropdownPosition.x}px`,
                            top: `${dropdownPosition.y}px`,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >
                       <CharDropdown characters={characters} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Game