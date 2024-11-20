import { useState } from "react"


const Input = () => {

    const [name,setName] = useState('')


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