import { useEffect, useState } from "react"


import CharDropdown from "./CharDropdown"
import Marker from "./Marker"
import Timer from "./Timer"

//images
import bleachCharacters from "../assets/bleach.jpg"
import narutoCharacters from "../assets/naruto-shipu.jpg"


const charactersToBeFound = [ 
                                {name: "Sasori", pos:{x : 23, y: 49}, found: false}, 
                                {name: "Jiraiya",pos: {x: 57, y: 13},found: false},
                                {name: "Zabuza",pos:{x: 68, y: 52},found: false}
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

        
        
        // Get the container's position and dimensions
    
        const container = e.currentTarget.getBoundingClientRect()


        const scrollY = window.scrollY || document.documentElement.scrollTop;

        console.log('Container: ', container)


        
        // Calculate position relative to the image
        const selectedX = pageX - container.left
        const selectedY = pageY - container.top - scrollY;
        
        let xPercentage = (selectedX/container.width) * 100
        let yPercentage = (selectedY/container.height) * 100


        setSelectedPos({x:xPercentage,y:yPercentage})

        console.log("X percentage: ", xPercentage)
        console.log("Y Percentage: ", yPercentage)


        console.log("X: ",selectedX)
        console.log("Y: ",selectedY)


        let x
        let y
        if((selectedY < 100 && selectedX < 30) || selectedY < 100){

            y = selectedY + 200
            x = selectedX + 50
        }else{

            x = selectedX
            y = selectedY

        }


        
        setDropdownPosition({ x, y })
        setDropdownVisible(true)
        setMarkers((prev) => [...prev,{x: selectedX, y: selectedY}])
    }

    function handleCharacterFound(characterName) {
        setCharacters(prevChars => 
            prevChars.map(char => 
                char.name === characterName ? { ...char, found: true } : char
            )
        );
        // setMarkers(prev => [...prev, selectedPos]);
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
        <div className="game-container relative mx-auto w-full" >

            <Timer gameOver={gameOver}/>


            <div className="relative w-full ">
                <img 
                    className="w-full h-full " 
                    src="https://www.dropbox.com/scl/fi/3q9r8tvytwzrnb3niqzki/naruto-shipu.jpg?rlkey=h48m9wakmjh1kmqq5u3yctg4n&st=m1d3kuid&raw=1"
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
                    <CharDropdown characters={characters} xPercentage={selectedPos.x} yPercentage={selectedPos.y} onCharacterFound ={handleCharacterFound} showDropdown = {setDropdownVisible}/>
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