import React from 'react';

const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="header">
                <i className="fas fa-circle logo"></i>
                <span className="brand">OLSoftware</span>
            </div>
            <div className="links-field">
                <ul>
                    <li>
                        <i className="far fa-map"></i> Programación
                    </li>
                    <li>
                        <i className="fas fa-list-ul"></i> Gestión de operaciones
                    </li>
                    <li>
                        <i className="fas fa-sliders-h"></i> Perfiles
                    </li>
                    <li>
                        <span className="letter-icon">R</span> Roles
                    </li>
                    <li>
                        <span className="letter-icon">U</span> Usuario
                    </li>
                    <li>
                        <i className="fas fa-file"></i> Reportes
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;