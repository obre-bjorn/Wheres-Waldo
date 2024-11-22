/* eslint-disable react/prop-types */
const Input = ({setName,name}) => {

    


    const handleNameChange = (e) => {


        setName(e.target.value)
    }

    return (

        <label htmlFor="player"> Enter Your Name: 
            <input id="player" className="w-full border-b-2 py-2 px-4" type="text" name="playerName" value={name} placeholder="Enter Name" onChange={handleNameChange}/>
        </label>

    )
}

export default Input