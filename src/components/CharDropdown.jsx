/* eslint-disable react/prop-types */


const CharDropdown = ({characters, xPercentage, yPercentage , onCharacterFound, showDropdown}) => {

    const handleCharacterClick = (charName) => {

        const tolerance = 5;

        showDropdown(false)

        characters.forEach(character => {
            const { x, y } = character.pos;
            
            console.log(x, xPercentage)
            console.log(y, yPercentage)
            // Check if click falls within tolerance range
            if (
                xPercentage >= x - tolerance && xPercentage <= x + tolerance &&
                yPercentage >= y - tolerance && yPercentage <= y + tolerance   && charName == character.name
            ) {
                console.log(`${character.name} found!`);
                onCharacterFound(character.name);
            }
        });




        
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