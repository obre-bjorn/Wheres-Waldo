/* eslint-disable react/prop-types */


const CharDropdown = ({characters}) => {



    return (
        <ul className="space-y-1">
            {characters.map(char => (
                <li key={char} className="cursor-pointer hover:bg-gray-100 px-4 py-2 rounded">
                    {char}
                </li>
            ))}
        </ul>
    )



}

export default CharDropdown