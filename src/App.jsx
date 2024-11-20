import { Link, Outlet } from "react-router-dom"

function App() {


  return (
    <div className=" min-h-screen bg-blue-950">
      
      <nav className="container">
        
        <Link to={'/'} />  

        {/* <button onClick={()}>
          Highscores
        </button> */}
        
      </nav>

     <Outlet/>
    </div>
  )
}

export default App
