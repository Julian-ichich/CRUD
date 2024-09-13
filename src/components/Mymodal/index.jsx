import { Children, useContext } from "react"
import { EstudiantesContext } from "../../Context"

const MyModal = ({ title, children, cerrarModal, aceptarCambios, textButtonSuccess }) => {
  const { isEdit, id, form, updataUser, saveUser, successCreateUser, errorLogin, isOpenModal, errores, closeForm, updateStudent, modalElimina, deleteUsuarios } = useContext(EstudiantesContext)



  return (


    <div className="d-flex justify-content-center align-items-center"
      style={{ zIndex: 5, position: "fixed", left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(34,34,34,0.90)' }}
    >
      <div className="p-4 bg-info w-50 rounded "
        style={{ zIndex: 5, position: 'absolute' }}
      >


        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
              <button type="button" className="btn-close" onClick={() => cerrarModal(false)} ></button>
            </div>
            <div className="modal-body">
              <div className={errorLogin ? "alert alert-danger" : undefined} role="alert">
                {errorLogin && 'Ha ocurrido un error'}
                <ul>
                  {errores.map(error => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
              {children}
            </div>

          </div>
        </div>

        <div className="modal-footer gap-3">
          <button type="button" className="btn btn-secondary" onClick={() => cerrarModal(false)}>Cerrar</button>
          <button onClick={aceptarCambios}  type="button" className="btn btn-primary" >
          {textButtonSuccess}
          {textButtonSuccess ? '' : isEdit ? 'actualizar ' : 'Guardar'}
          </button>
        </div>

       

      </div>

    </div>


  )
}

export { MyModal }

// () => isEdit ? updateStudent(id, form) : saveUser()