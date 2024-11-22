/* eslint-disable react/prop-types */
import { toast,Bounce } from "react-toastify";
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

            if(data.gameover){

                toast.success(`${charName} Found!`,{
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })

                onCharacterFound(charName, data.gameover)

                return 

            }

            if (data.success && (data.msg.includes('found'))) {

                toast.success(`${charName} Found!`,{
                    position: "bottom-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                })

                onCharacterFound(charName); // Update foundCharacters in parent

                return 
            }


            toast.error(`${charName} Not Found!`,{
                position: "bottom-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })

            return 
            

    }                   



    return (
        <ul className="">

            {characters.map((char,index) => (

                <li key={index} className="cursor-pointer hover:bg-gray-400  rounded w-full mb-2">
                    
                    <button className={`w-full px-4 py-2 ${foundCharacters.includes(char.name) ? 'bg-green-300' : ''}`} 
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