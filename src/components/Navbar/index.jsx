import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { EstudiantesContext } from "../../Context"

const Navbar = () => {

    const navigate = useNavigate()
    const { serErrorLogin } = useContext(EstudiantesContext)

    const cerrarSesion=()=>{
        localStorage.removeItem('user')
        navigate('/')
        serErrorLogin(false)
    }

    return (
        <nav className= "navbar navbar-expand-lg navbar-light bg-light" >
        
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink className='nav-link' to='/estudiantes'>
                        Estudiantes
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className='nav-link' to='/materias'>
                        Materias
                    </NavLink>
                    </li>
                    
                </ul>

               <ul className="navbar-nav mb-2">

                    <li className="nav-item">
                    
                    <button className="nav-link text-right" onClick={()=> cerrarSesion()}><i className="bi bi-person-circle"></i> cerrar sesion</button>
                    </li>
               </ul>

                    
                
            </div>
        </div>
    </nav >

    )

}

export {Navbar}