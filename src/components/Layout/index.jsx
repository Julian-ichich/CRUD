import Estudiantes from "../Estudiantes"
import { Navbar } from "../Navbar"
import { Routes, Route } from "react-router-dom"
import { Materias } from "../Materias"
import Auth from '../Auth'
import NotFound from '../NotFound'
const Layout =()=>{
    return (
        <>
        <Auth>
        <Navbar/>
        <div className="container">
            
            <Routes>
                <Route path="/estudiantes" element={<Estudiantes />} />
                <Route path="/materias" element={<Materias />} />
                <Route path="/*" element={<NotFound/>} />
                
            </Routes>  
       
        </div>
        </Auth>
        </>
    )
}

export {Layout}