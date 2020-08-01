import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchingUsers, creatingUsers, deleteUsers, fetchEditUser} from '../redux/actionCreator';

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
                    <td>{usuario.data().Nombre}</td>
                    <td>{usuario.data().Apellido}</td>
                    <td style={{textAlign: "center"}}>{usuario.data().Id}</td>
                    <td>{usuario.data().Rol}</td>
                    <td>{usuario.data().State}</td>
                    <td>{usuario.data().Tel}</td>
                    <td>{usuario.data().Email}</td>
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

const EditUser = ({editUser, setEdit, db}) => {
    const dispatch=useDispatch();
    console.log("edit user:", editUser.id);
    return(
        <div className = "create-user">
            <div className="create-header">
                Editar usuario
                <i className="fas fa-times" onClick={() => setEdit(false)}></i>
            </div>
            <form onSubmit={(event) => {
                setEdit(false);
                event.preventDefault();
                let item=event.target;
                dispatch(fetchEditUser(db, editUser, item));
            }} >
                <div className="row">
                    <div className="col">
                        <label htmlFor="name">Nombres</label>
                        <input type="text" name="name" defaultValue={editUser.data().Nombre} required />
                        <label htmlFor="id">Identificación</label>
                        <input type="number" name='id' defaultValue={editUser.data().Id} required />
                        <label htmlFor="state">Estado</label>
                        <select name='state' defaultValue={editUser.data().State}>
                            <option>Activo</option>
                            <option>Inactivo</option>
                        </select>
                        <label htmlFor="tel">Telefono</label>
                        <input type="tel" name='tel' defaultValue={editUser.data().Tel} required />
                    </div>
                    <div className="col">
                        <label htmlFor="last-name">Apellidos</label>
                        <input type="text" name="last-name" defaultValue={editUser.data().Apellido} required />
                        <label htmlFor="rol">Rol Asociado</label>
                        <select name="rol" defaultValue={editUser.data().Rol}>
                            <option>Administrador</option>
                            <option>Conductor</option>
                            <option>Recolector</option>
                        </select>
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" name='pass' />
                        <label htmlFor="mail">Correo Electrónico</label>
                        <input type="Email" name="mail" defaultValue={editUser.data().Email} required />
                    </div>
                </div>
                <div className="button-group">
                    <button type="submit" className="crear" >Editar</button>
                    <button type="button" className="cancel" onClick={() => setEdit(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}


const Users = ({bar, db, filters}) => {
    const table_header = ["Nombre", "Apellidos", "Identificación(C.C)", "Rol asociado", "Estado", "Telefono", "Correo electrónico", "Acción"]
    const [create, setCreate] = React.useState(false);
    const [del, setDel] = React.useState(false);
    const [delUser, setDelUser] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const [editUser, setEditUser] = React.useState(null);
    const users = useSelector(state => state.Users);


    const dispatch = useDispatch();

    React.useEffect(React.useCallback(() => {
        dispatch(fetchingUsers(db, false));
    }, [db, dispatch]), [db,dispatch]);

    document.addEventListener('keyup', e => {
        if(e.key==="Escape"){
            setEdit(false);
            setCreate(false);
        }
    })

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
                        setCreate(false);
                        event.preventDefault();
                        const item = event.target;
                        dispatch(creatingUsers(db, item));        
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
            {edit?
                <EditUser db={db} editUser={editUser} setEdit={setEdit} />
                :
                null
            }
            <div className="pagination">
                <i className="fas fa-chevron-left" onClick={() => {dispatch(fetchingUsers(db, filters, null, users.users[0]))}}></i>
                <i className="fas fa-chevron-right" onClick={() => {dispatch(fetchingUsers(db, filters, users.users[users.users.length-1]))}}></i>
            </div>
        </div>
    )
}

export default Users;