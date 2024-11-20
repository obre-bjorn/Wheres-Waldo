/* eslint-disable react/prop-types */
import { fetchFromApi } from "../utils/api";

const CharDropdown = (
    {   sessionId, 
        imageId,
        characters, 
        xPercentage, 
        yPercentage, 
        onCharacterFound,
        showDropdown,
        foundCharacters
    }) => {

        const handleCharacterClick = async (charName) => {

            const data = await fetchFromApi('/validate-click', {
                method: 'POST',
                body: {
                    xPercentage : xPercentage,
                    yPercentage: yPercentage,
                    sessionID: sessionId,
                    imageId: imageId,
                    charName: charName
                }
            })

            showDropdown(false)

            console.log(data)

            if(data.gameover){

                onCharacterFound(charName, data.gameover)

                return 

            }

            if (data.success && (data.msg.includes('found'))) {

                onCharacterFound(charName); // Update foundCharacters in parent


            }


            

            

    }                   



    return (
        <ul className="space-y-1">

            {characters.map((char,index) => (

                <li key={index} className="cursor-pointer hover:bg-gray-400 px-4 py-2 rounded">
                    
                    <button className={`w-full ${foundCharacters.includes(char.name) ? 'bg-green-300' : ''}`} 
                            onClick= { () => {handleCharacterClick(char.name)}} 
                            disabled = {foundCharacters.includes(char.name)}
                    >

                        {char.name}

                    </button>

                </li>

            ))}

        </ul>
    )



}

export default CharDropdown