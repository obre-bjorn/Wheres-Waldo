import { useEffect, useState } from "react"


import CharDropdown from "./CharDropdown"
import Marker from "./Marker"
import Timer from "./Timer"
import bleachCharacters from "../assets/bleach.jpg"

const charactersToBeFound = [ 
                                {name: "Toshiro", pos:{x : 59, y: 94}, found: false}, 
                                {name: "Kenpachi",pos: {x: 39, y: 65},found: false},
                                {name: "Ikkaku",pos:{x: 8, y: 81},found: false}
                            ]

const Game = () => {
    const [characters, setCharacters] = useState([])
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
    const [markers, setMarkers] = useState([])
    const [selectedPos,setSelectedPos] = useState({x:null, y: null})
    const [gameOver, setGameOver] = useState(false)


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

        console.log('ContainerX: ', container)


        
        // Calculate position relative to the image
        const selectedX = pageX - window.scrollX
        const selectedY = pageY - window.scrollY
        
        let xPercentage = (selectedX/container.width) * 100
        let yPercentage = (selectedY/container.height) * 100


        setSelectedPos({x:xPercentage,y:yPercentage})

        console.log("X percentage: ", xPercentage)
        console.log("Y Percentage: ", yPercentage)


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
        setMarkers((prev) => [...prev,{x: selectedX,y: selectedY}])
    }

    function handleCharacterFound(characterName) {
        setCharacters(prevChars => 
            prevChars.map(char => 
                char.name === characterName ? { ...char, found: true } : char
            )
        );
        setMarkers(prev => [...prev, selectedPos]);
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

            <Timer gameOver={gameOver}/>


            <div className="relative">
                <img 
                    className="w-full h-auto " 
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
                    <CharDropdown characters={characters} xPercentage={selectedPos.x} yPercentage={selectedPos.y} onCharacterFound ={handleCharacterFound}/>
                    </div>
                )}

                {
                    markers.map((marker,index)=> <Marker key={index} position={marker}/>)
                }
            </div>
        </div>
    )
}

export default Game