/* eslint-disable react/prop-types */
import { fetchFromApi } from "../utils/api";

const CharDropdown = ({sessionId, imageId,characters, xPercentage, yPercentage,   showDropdown}) => {

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

        console.log(data)

    }                   



    return (
        <ul className="space-y-1">
            {characters.map((char,index) => (
                <li key={index} className="cursor-pointer hover:bg-gray-400 px-4 py-2 rounded">
                    <button   className={`w-full ${char.found ? 'bg-green-300': ''}`} onClick= { () => {handleCharacterClick(char.name)}} disabled = {char.found}>
                        {char.name}
                    </button>

                </li>
            ))}
        </ul>
    )



}

export default CharDropdown