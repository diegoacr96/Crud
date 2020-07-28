import React from 'react';

const employees = [
    {
        name: "Andres Felipe",
        lastName: "Garcia Castro",
        id: 123123123,
        rol: "Administrador",
        state: "active",
        tel: 132123123,
        email: "asd@email.com",
    },{
        name: "Andres Felipe",
        lastName: "Garcia Castro",
        id: 123123123,
        rol: "Administrador",
        state: "active",
        tel: 132123123,
        email: "asd@email.com",
    },{
        name: "Andres Felipe",
        lastName: "Garcia Castro",
        id: 123123123,
        rol: "Administrador",
        state: "active",
        tel: 132123123,
        email: "asd@email.com",
    }
]

const Rols = () => {
    return employees.map((employed, idx) => (
        <tr key={idx}>
            <td>
                {employed.name}
            </td>
            <td>
                {employed.lastName}
            </td>
            <td>
                {employed.id}
            </td>
            <td>
                {employed.rol}
            </td>
            <td>
                {employed.state}
            </td>
            <td>
                {employed.tel}
            </td>
            <td>
                {employed.email}
            </td>
            <td>
                <i className="fas fa-pen"></i>
                <i className="fas fa-trash-alt"></i>
            </td>
        </tr>
    ))
}

const Users = () => {
    const table_hader = ["Nombre", "Apellidos", "Identificación(C.C)", "Rol asociado", "Estado", "Telefono", "Correo electrónico", "Acción"]
    return(
        <div className="users-container" >
            <div className="users-header" >
                <div className="users-title">
                    <i className="fas fa-users"></i>
                    Usuarios existentes
                </div>
                <button className="create">
                    Crear
                </button>
            </div>
            <table>
                <thead>
                    <tr className="table-row">
                        {table_hader.map((item, idx) => (
                            <th key={idx}>
                                {item} 
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <Rols />
                </tbody>
            </table>
        </div>
    )
}

export default Users;