import { useState, useContext, useEffect } from 'react'
import { EstudiantesContext } from '../../Context'
import { MyModal } from '../Mymodal'
import axios from 'axios'

function Estudiantes() {

  const { form, handleForm, estudiantes, setEstudiantes, handleEdit, resetForm, handleDelete, value, setValue, loadingStudents, successCreateUser, isOpenModal, updateStudent, updateUser,
    setUpdateUser, modalElimina, setModalElimina, deleteUsuarios, setIsOpenModal, saveUser, setErrores, serErrorLogin, next, back, users} = useContext(EstudiantesContext)

    let cont = 0




  useEffect(() => {
    loadingStudents()
    setErrores([])
    serErrorLogin(false)

  }, [isOpenModal, modalElimina])




  const estudiantesFIlter = estudiantes.filter(student => student.name.toLowerCase().includes(value.trim().toLowerCase()))



  return (
    <>
      {isOpenModal && <MyModal title={'crear usuario'} cerrarModal={setIsOpenModal} aceptarCambios={saveUser} >
        <>
          <form action="">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Nombre</label>
              <input name='name' value={form.name} onChange={(event) => handleForm(event)} type="text" className="form-control shadow p-3 mb-2 bg-body rounded" id="exampleFormControlInput1" placeholder="ingrese su nombre" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Email</label>
              <input name='email' value={form.email} onChange={(event) => handleForm(event)} type="text" className="form-control shadow p-3 mb-2 bg-body rounded" id="exampleFormControlInput1" placeholder="ingrese su edad" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Password</label>
              <input name='password' value={form.password} onChange={(event) => handleForm(event)} type="text" className="form-control shadow p-3 mb-2 bg-body rounded" id="exampleFormControlInput1" placeholder="ingrese su grado" />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Avatar</label>
              <input name='avatar' value={form.avatar} onChange={(event) => handleForm(event)} type="text" className="form-control shadow p-3 mb-2 bg-body rounded" id="exampleFormControlInput1" placeholder="ingrese su colegio" />
            </div>
          </form>

        </>
      </MyModal>}

      {modalElimina && <MyModal title={'Eliminar usuario'} cerrarModal={setModalElimina} aceptarCambios={deleteUsuarios} textButtonSuccess='Eliminar'>
        <div className='text-center'>
          <h1>Are you sure?</h1>
          <div className='w-100 d-flex justify-content-center gap-3'>
            {/* <button onClick={()=>setModalElimina(false)} className='btn btn-warning w-25'>no</button>
        <button onClick={()=>deleteUsuarios()} className='btn btn-primary w-25'>yes</button> */}

          </div>

        </div>
      </MyModal>}

      <div className='container text-center'>
        <div className='d-flex justify-content-end pt-4'>
          <button onClick={() => resetForm()} type="button" className="btn btn-warning mb-2 position-fixed top-1 shadow-lg  rounded z-1">
            <i className="bi bi-chevron-double-left"></i> crear estudiante
          </button>
        </div>
        <div className={successCreateUser ? "alert alert-success" : 'hidden'} role="alert">
          {successCreateUser && 'se ha guardado correctamente'}
        </div>
        <div className={updateUser ? "alert alert-success" : 'hidden'} role="alert">
          {updateUser && 'se ha actualizado correctamente'}
        </div>
        <div className='flex'>
          <input className='w-50 rounded p-2 shadow-lg' placeholder='Buscar alumno' type="text" onChange={(e) => setValue(e.target.value)} /> <i className="bi bi-search fs-4"></i>
        </div>

        <table className="table table-striped mt-5 cursor">

          <thead>
            <tr className='text-center  border border-black-subtle'>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Role</th>
              <th>Avatar</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {
              estudiantesFIlter.map((item, index) => (
                <tr key={index + 1} className=' border border-black-subtle'>
                  <td>{index +1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.password}</td>
                  <td>{item.role}</td>
                  <td><img src={item.avatar} alt="" height='90' width='90' className='rounded-5' /></td>
                  <td>
                    <button className='btn btn-success me-1' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEdit(item.id)}><i className="bi bi-pencil-square"></i> editar</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}><i className="bi bi-trash-fill"></i> eliminar</button>
                  </td>
                </tr>
              ))
            }

          </tbody>

        </table>


        <div className='container-fluid d-flex justify-content-center'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item"><a className="page-link" onClick={()=>back()} href="#">Previous</a></li>
            {
              users.map((item, index) => {
                if(index % 10 === 0){
                  cont ++;
                  return <li key={cont} className="page-item"><a className="page-link" href="#">{cont}</a></li>
                }
              })
            }
            <li className="page-item"><a className="page-link" onClick={()=>next()} href="#">Next</a></li>
          </ul>
        </nav>

        </div>


      </div>

    </>
  )
}

export default Estudiantes
