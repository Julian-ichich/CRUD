import { useContext, useEffect, useState } from 'react'
import './style.css'
import { EstudiantesContext } from '../../Context'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const { login, errorLogin } = useContext(EstudiantesContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const signIn =(event)=>{
        login(event, email, password)
        setEmail('')
        setPassword('')
    }

    useEffect(()=>{
       
        if(user){
            navigate('/estudiantes')
        }
    }, [])



    return (
        <>

        {user && <p></p>}

        {!user && <div className='divForm'>
                <form className="form w-50">
                    <div className="title">Welcome</div>
                    {errorLogin && (
                        <div class="alert alert-danger" role="alert">
                        Usuario o Contrasenia incorrecta
                       </div>
                    )}
                    
                    <input className="input" value={email}  onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="Email" type="email" />
                    <input className="input" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" placeholder="Password" type="password" />
                    <div className="login-with">
                        <div className="button-log"><b>t</b></div>
                        <div className="button-log">
                            h
                        </div>
                        <div className="button-log">
                            d
                        </div>
                    </div>
                    <div className='flex text-center w-100'>

                        <button onClick={(event) => signIn(event) } className="button-confirm">Let`s go →</button>

                    </div>
                </form>

            </div> }
            
        </>
    )
}

export { Login }