
import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const EstudiantesContext = createContext()
import { useNavigate } from "react-router-dom";

const EstudiantesProvider = ({ children }) => {
    const [form, setForm] = useState({ name: '', email: '', password: '', avatar: '' })
    const [estudiantes, setEstudiantes] = useState([])
    const [value, setValue] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState(null)
    const navigate = useNavigate()
    const [errorLogin, serErrorLogin] = useState(false)
    const [successCreateUser, setSuccesCreateUser] = useState(false)
    const [updateUser, setUpdateUser] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [errores, setErrores] = useState([])
    const [modalElimina, setModalElimina] = useState(false)
    const [users, setUsers] = useState([])
    const  [itemsByPage, setItemsByPage] = useState(10)    //const user = axios.get('https://api.escuelajs.co/api/v1/users')


    const loadingStudents = async () => {
        try {
            const response = await axios.get('https://api.escuelajs.co/api/v1/users')
            setUsers(response.data)
            setEstudiantes(response.data.slice(0, itemsByPage))
        } catch (error) {

        }


    }


    const next =()=>{
        
        setEstudiantes(users.slice(itemsByPage, itemsByPage+10));
        setItemsByPage(itemsByPage+10)
        
    }


    const back =()=>{
        if(itemsByPage > 10){
            setEstudiantes(users.slice(itemsByPage-20, itemsByPage-10));
            setItemsByPage(itemsByPage-10)
            
        }
    }




    const handleForm = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const saveUser = async () => {

        try {
            if (isEdit) {

                try {
                    await axios.put(`https://api.escuelajs.co/api/v1/users/${id}`, form)

                    setIsOpenModal(false)
                    serErrorLogin(false)
                    setErrores([])
                    setUpdateUser(true)
                    setSuccesCreateUser(false)
                } catch (error) {
                    if (error.status != 400) {
                        setErrores(['ocurrio un error en el servidor, intenta de nuevo'])
                        serErrorLogin(true)
                    } else {

                        setIsOpenModal(true)
                        serErrorLogin(true)
                        setErrores(error.response.data.message)
                    }
                }

            }else{
                await axios.post('https://api.escuelajs.co/api/v1/users/', form)
            setSuccesCreateUser(true)
            setIsOpenModal(false)
            serErrorLogin(false)
            setErrores([])
            setUpdateUser(false)
            }
            

        } catch (error) {
            setSuccesCreateUser(false)
            setIsOpenModal(true)
            serErrorLogin(true)
            setErrores(error.response.data.message)
        }

    }

    const handleEdit = async (id) => {
        setIsOpenModal(true)
        serErrorLogin(false)
        setErrores([])
        const response = await axios.get(`https://api.escuelajs.co/api/v1/users/${id}`)
        setForm(response.data)
        setIsEdit(true)
        setId(id)
    }

    // const handleDelete=(id)=>{
    //     let copia =[...estudiantes]
    //     let deleteEstudiante =  copia.filter((estudiante) => estudiante.id !== id)
    //     setEstudiantes(deleteEstudiante)

    //     // setForm(...editEstudiante)
    //     // setIsEdit(true)
    //     // setId(id)
    // }

    const updateStudent = async (id, data) => {


        // let students = [...estudiantes]
        // let editStudents = students.find((estudiante) => estudiante.id === id)
        // editStudents.nombre = data.nombre
        // editStudents.edad = data.edad
        // editStudents.colegio = data.colegio
        // editStudents.grado = data.grado




    }

    const handleDelete = (id) => {
        setModalElimina(true)
        setId(id)
    }

    const deleteUsuarios = async () => {
        
        const response = await axios.delete(`https://api.escuelajs.co/api/v1/users/${id}`)
        setId(null)
        setModalElimina(false)
    }




    const resetForm = () => {
        setIsOpenModal(true)
        setIsEdit(false)
        setForm({ name: '', email: '', password: '', avatar: '' })
        serErrorLogin(false)
        setErrores([])

    }

    const closeForm = () => {
        setIsOpenModal(false)

    }


    const login = async (event, email, password) => {
        event.preventDefault()
        try {

            const user = await axios.post('https://api.escuelajs.co/api/v1/auth/login',
                { email, password }
            )

            if (user.status == 201) {
                navigate('/estudiantes')
                localStorage.setItem('user', JSON.stringify(user.data))


            }


        } catch (error) {
            serErrorLogin(true)
        }


    }



    return (
        <EstudiantesContext.Provider value={{
            form,
            setForm,
            handleForm,
            estudiantes,
            setEstudiantes,
            handleEdit,
            resetForm,
            updateStudent,
            isEdit,
            id,
            value,
            setValue,
            login,
            errorLogin,
            loadingStudents,
            saveUser,
            successCreateUser,
            isOpenModal,
            errores,
            closeForm,
            updateUser,
            setUpdateUser,
            modalElimina,
            setModalElimina,
            deleteUsuarios,
            handleDelete,
            setIsOpenModal, 
            setErrores, 
            serErrorLogin, 
            next,
            back, 
            users
        }}>

            {children}

        </EstudiantesContext.Provider>
    )


}

export { EstudiantesProvider }