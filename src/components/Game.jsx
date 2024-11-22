/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"


import { useSession } from "../../contexts/sessionContext"
import CharDropdown from "./CharDropdown"
// import Marker from "./Marker"
// import Timer from "./Timer"


const Game = ({image, handleGameOver}) => {

    const {session} = useSession()
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 })
    // const [markers, setMarkers] = useState([])
    const [selectedPos,setSelectedPos] = useState({x:null, y: null})
    const [foundCharacters, setFoundCharacters] = useState([])
    const characters = image.characters


    useEffect(() => {

    const storedCharacters = JSON.parse(sessionStorage.getItem('foundCharacters'));

        if (storedCharacters) {

            setFoundCharacters(storedCharacters);

        }

}, []);


    async function handleImageClick(e) {
        
        // Get the click coordinates relative to the viewport
        const { pageX, pageY } = e

        // Get the container's position and dimensions
    
        const container = e.currentTarget.getBoundingClientRect()
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Calculate position relative to the image
        const selectedX = pageX - container.left
        const selectedY = pageY - container.top - scrollY;
        
        let xPercentage = (selectedX/container.width) * 100
        let yPercentage = (selectedY/container.height) * 100

        setSelectedPos({x:xPercentage,y:yPercentage})

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
    }

    function handleCharacterFound(characterName, gameOver) {

        if(gameOver){

            handleGameOver()

            return

        }


        setFoundCharacters(prev => {

            const updated = [...prev, characterName];
            sessionStorage.setItem('foundCharacters', JSON.stringify(updated));

        return updated;

    });



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

            {/* <Timer gameOver={gameOver}/> */}


            <div className="relative w-full ">
                <img 
                    className="w-full h-full rounded-md" 
                    src={image.url}
                    alt="bleach characters" 
                    onClick={handleImageClick}
                />

                
                
                {dropdownVisible && (
                    <div className="fixed bg-white text-black border border-gray-300 rounded shadow-lg z-50 p-2"
                        style={{ 
                            left: `${dropdownPosition.x}px`,
                            top: `${dropdownPosition.y}px`,
                            transform: 'translate(-50%, -100%)'
                        }}
                    >

                        <CharDropdown 
                            imageId ={image.id} 
                            sessionId = {session} 
                            characters={characters} 
                            xPercentage={selectedPos.x} 
                            yPercentage={selectedPos.y} 
                            onCharacterFound ={handleCharacterFound} 
                            showDropdown = {setDropdownVisible}
                            foundCharacters = {foundCharacters}
                        />

                    </div>
                )}

                {/* {
                    markers.map((marker,index)=> <Marker key={index} position={marker}/>)
                } */}
            </div>
        </div>
    )
}

export default Game