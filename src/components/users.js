import React from 'react';

const DeleteItem = ({delUser, setDel, del, fetchUsers, db}) => {
    document.onkeyup = (e) => e.key==="Escape"?setDel(false):null;
    const deleteDocument = (delUser) => {
        db.collection("usuarios").where("Email", "==", delUser.Email).get().then(resp => {
            resp.forEach(doc => {
                doc.ref.delete().then(() => {
                    console.log("Document successfully deleted!");
                    setDel(false);
                    fetchUsers();
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                    setDel(false);
                });
            })
        });
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

const Edit = ({setEdit}) => {

    const handleEditUser = (event) => {
        event.preventDefault();
        console.log(event.targe["name"].value)
    }

    return(
        <div className = "create-user">
            <div className="create-header">
                Editar usuario
                <i className="fas fa-times" onClick={() => setEdit(false)}></i>
            </div>
            <form onSubmit={handleEditUser}>
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
                    <button type="submit" className="crear">Editar</button>
                    <button type="button" className="cancel" onClick={() => setEdit(false)}>Cancelar</button>
                </div>
            </form>
        </div>
    )
}
const Users = ({bar, db, firebase}) => {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          window.location.replace("/");
        }
      })
    const table_header = ["Nombre", "Apellidos", "Identificación(C.C)", "Rol asociado", "Estado", "Telefono", "Correo electrónico", "Acción"]
    const [create, setCreate] = React.useState(false);
    const [del, setDel] = React.useState(false);
    const [delUser, setDelUser] = React.useState(null);
    const [edit, setEdit] = React.useState(false);
    const [editUser, setEditUser] = React.useState(null);
    const [users, setUsers] = React.useState({
        loading: true,
        err: false,
        users: []
    });

    const fetchUsers = () => {
        let temp = [];
        db.collection("usuarios").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
            });
            setUsers({
                loading: false,
                err: false,
                users: temp
            })
        });
    }

    React.useEffect(() => {
        fetchUsers();
    }, [])

    const createUser = (event) => {
        event.preventDefault();
        const item = event.target;
        
        firebase.auth().createUserWithEmailAndPassword(item['mail'].value, item['pass'].value).then(() => {
            db.collection("usuarios").add({
                Nombre: item['name'].value,
                Apellido: item['last-name'].value,
                Email: item['mail'].value,
                Pass: item['pass'].value,
                Rol: item['rol'].value,
                Tel: item['tel'].value,
                Id: item['id'].value,
                State: item['state'].value 
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                setCreate(false);
                fetchUsers();
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                setCreate(false);
                fetchUsers();
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    }

    document.onkeyup = (e) => e.key==="Escape"?setCreate(false):null;
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
                    <form onSubmit={(values) => createUser(values)}>
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
                            <button type="submit" className="crear" onClick>Crear</button>
                            <button type="button" className="cancel" onClick={() => setCreate(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
                :""
            }
            <DeleteItem delUser = {delUser} setDel={setDel} del={del} fetchUsers={fetchUsers} db={db} />
            {edit? <Edit setEdit={setEdit} />: ""}
        </div>
    )
}

export default Users;