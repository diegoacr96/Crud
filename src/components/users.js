import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchingUsers, creatingUsers, deleteUsers} from '../redux/actionCreator';

const DeleteItem = ({delUser, setDel, del, db, dispatch}) => {
    document.onkeyup = (e) => e.key==="Escape"?setDel(false):null;
    const deleteDocument = (delUser) => {
        dispatch(deleteUsers(db, delUser));
    }
    if(del){
        return(
            <div className="delete-alert">
                <div className="delete-header">Estás seguro que desear borrar a {delUser.Nombre + " " + delUser.Apellido}</div>
                <div className="button-group">
                    <button type="button" className="delete" onClick={() => deleteDocument(delUser)}>Borrar</button>
                    <button type="button" className="cancel" onClick={() => setDel(false)}>Cancelar</button>
                </div>
            </div>
        )
    }else{
        return ""
    }
}



const Rols = ({users, table_header, setDel, setDelUser, setEdit, setEditUser}) => {
    if(users.loading){
        return "Loading";
    }else if (users.err){
        return "Err";
    }else if (users.users.length > 0){
        const listaDeUsuarios = users.users.map((usuario, idx) => (
                <tr key={idx}>
                    <td>{usuario.Nombre}</td>
                    <td>{usuario.Apellido}</td>
                    <td style={{textAlign: "center"}}>{usuario.Id}</td>
                    <td>{usuario.Rol}</td>
                    <td>{usuario.State}</td>
                    <td>{usuario.Tel}</td>
                    <td>{usuario.Email}</td>
                    <td>
                        <i className="fas fa-pen" onClick={() => {
                            setEdit(true); 
                            setEditUser(usuario);
                        }}></i>
                        <i className="fas fa-trash-alt" onClick={() =>{
                            setDel(true); 
                            setDelUser(usuario);
                            }} >
                        </i>
                    </td>
                </tr>
            )
        );
        return(
            <table>
                <thead>
                    <tr className="table-row">
                        {table_header.map((item, idx) => (
                            <th key={idx}>
                                {item} 
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {listaDeUsuarios}
                </tbody>
            </table>
        )
    }
    return (
        <div> 
            La lista está vacia, añade algun usuario
        </div>
    )
}

const EditUser = ({db, editableValue, editUser, setEdit, setEditableValue}) => {
    if(editUser){
        db.collection("usuarios").where("email", "==", editUser.Email).limit(1).get()
        .then(users => {
            users.forEach(user => {
                setEditableValue({
                    loading: false,
                    err: null,
                    user:{
                        Nombre: user.Nombre,
                        Apellido: user.Apellido,
                        Id: user.Id,
                        Rol: user.Rol,
                        State: user.State,
                        Tel: user.Tel,
                        Email: user.Email
                    }
                })
            })
        })

    }
    if(editableValue.loading){
        return(null)
    }else if(editableValue.err){
        return("err")
    }else{
        return(
            <div className = "create-user">
                <div className="create-header">
                    Editar usuario
                    <i className="fas fa-times" onClick={() => setEdit(false)}></i>
                </div>
                <form /* onSubmit={(values) => createUser(values)} */>
                    <div className="row">
                        <div className="col">
                            <label htmlFor="name">Nombres</label>
                            <input type="text" name="name" required />
                            <label htmlFor="id">Identificación</label>
                            <input type="number" name='id' required />
                            <label htmlFor="state">Estado</label>
                            <select name='state'>
                                <option>Activo</option>
                                <option>Inactivo</option>
                            </select>
                            <label htmlFor="tel">Telefono</label>
                            <input type="tel" name='tel' required />
                        </div>
                        <div className="col">
                            <label htmlFor="last-name">Apellidos</label>
                            <input type="text" name="last-name" required />
                            
                            <label htmlFor="rol">Rol Asociado</label>
                            <select name="rol">
                                <option>Administrador</option>
                                <option>Conductor</option>
                                <option>Recolector</option>
                            </select>
                            <label htmlFor="pass">Contraseña</label>
                            <input type="password" name='pass' required />
                            
                            <label htmlFor="mail">Correo Electrónico</label>
                            <input type="Email" name="mail" required />
                        </div>
                    </div>
                    <div className="button-group">
                        <button type="submit" className="crear">Crear</button>
                        <button type="button" className="cancel" onClick={() => setEdit(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        )
    }
}


const Users = ({bar, db, firebase}) => {
    const table_header = ["Nombre", "Apellidos", "Identificación(C.C)", "Rol asociado", "Estado", "Telefono", "Correo electrónico", "Acción"]
    const [create, setCreate] = React.useState(false);
    const [del, setDel] = React.useState(false);
    const [delUser, setDelUser] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const [editUser, setEditUser] = React.useState(null);
    const [editableValue, setEditableValue] = React.useState(
        {
            loading: true,
            err: false,
            user: {}
        }
    );

    const users = useSelector(state => state.Users);


    const dispatch = useDispatch();

    React.useEffect(React.useCallback(() => {
        dispatch(fetchingUsers(db, false));
    }, [db, dispatch]), [db,dispatch]);

    document.onkeyup = (e) => e.key==="Escape"?setCreate(false):null;
    document.onkeyup = (e) => {
        if(e.key==="Escape"){
            setEdit(false);
            setCreate(false);
        }
    }
    return(
        <div className={bar?"users-container users-open": "users-container users-collapse"} >
            <div className="users-header" >
                <div className="users-title">
                    <i className="fas fa-users"></i>
                    Usuarios existentes
                </div>
                <button className="create" onClick={() => setCreate(true)}>
                    Crear
                </button>
            </div>
            <Rols users={users} table_header={table_header} 
                setDel={setDel} 
                setDelUser={setDelUser}
                setEdit={setEdit}
                setEditUser={setEditUser} 
            />
            <div className="pagination">
                
            </div>
            {create?
                <div className = "create-user">
                    <div className="create-header">
                        Crear usuario
                        <i className="fas fa-times" onClick={() => setCreate(false)}></i>
                    </div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        const item = event.target;
                        dispatch(creatingUsers(db, firebase, item));        
                    }}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Nombres</label>
                                <input type="text" name="name" required />
                                <label htmlFor="id">Identificación</label>
                                <input type="number" name='id' required />
                                <label htmlFor="state">Estado</label>
                                <select name='state'>
                                    <option>Activo</option>
                                    <option>Inactivo</option>
                                </select>
                                <label htmlFor="tel">Telefono</label>
                                <input type="tel" name='tel' required />
                            </div>
                            <div className="col">
                                <label htmlFor="last-name">Apellidos</label>
                                <input type="text" name="last-name" required />
                                
                                <label htmlFor="rol">Rol Asociado</label>
                                <select name="rol">
                                    <option>Administrador</option>
                                    <option>Conductor</option>
                                    <option>Recolector</option>
                                </select>
                                <label htmlFor="pass">Contraseña</label>
                                <input type="password" name='pass' required />
                                
                                <label htmlFor="mail">Correo Electrónico</label>
                                <input type="Email" name="mail" required />
                            </div>
                        </div>
                        <div className="button-group">
                            <button type="submit" className="crear">Crear</button>
                            <button type="button" className="cancel" onClick={() => setCreate(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
                :""
            }
            <DeleteItem delUser={delUser} setDel={setDel} del={del} db={db} dispatch={dispatch} />
            <EditUser db={db} editableValue={editableValue} editUser={editUser} setEdit={setEdit} setEditableValue={setEditableValue} />
        </div>
    )
}

export default Users;