/* eslint-disable react/prop-types */
const Input = ({setName,name}) => {

    


    const handleNameChange = (e) => {


        setName(e.target.value)
    }

    return (

        <label htmlFor="player"> Enter Your Name: 
            <input id="player" type="text" name="playerName" value={name} onChange={handleNameChange}/>
        </label>

    )
}

export default Input