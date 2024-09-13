import { BrowserRouter, Route, Routes } from "react-router-dom"
import { EstudiantesProvider } from "../Context"
import { Login } from "../components/Login"
import { Layout } from "../components/Layout"


const index =  ()=>{
    const user= JSON.parse(localStorage.getItem('user'))

    return(
        <>
        <BrowserRouter> 
        
            <EstudiantesProvider>
                <Routes>
                    
                    <Route path="/" element={<Login/>} />
                    
                    
                    <Route path="/*" element={<Layout/>} />
                </Routes>  

            </EstudiantesProvider>

        </BrowserRouter>
        </>
    )
}


export default index