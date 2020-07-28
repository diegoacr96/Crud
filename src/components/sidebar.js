import React from 'react';

const Sidebar = ({setBar, bar}) => {
    return(
        <div className={bar? "sidebar sidebar-open": "sidebar sidebar-collapse"}>
            <div className="header">
                <i className="fas fa-circle logo"></i>
                <span className="brand">OLSoftware</span>
                <i className="fas fa-bars toggle" onClick={()=>setBar(!bar)}></i>
            </div>
            <div className="links-field">
                <ul className="navigation-links"> 
                    <li className="sidebar-link">
                        <i className="far fa-map icon"></i> <div className="title">Programación</div> 
                    </li>
                    <li className="sidebar-link">
                        <i className="fas fa-list-ul icon"></i> <div className="title">Gestión de operaciones</div> 
                    </li>
                    <li className="sidebar-link">
                        <i className="fas fa-sliders-h icon"></i><div className="title">Perfiles</div> 
                    </li>
                    <li className="sidebar-link">
                        <span className="letter-icon icon">R</span> <div className="title">Roles</div>
                    </li>
                    <li className="sidebar-link">
                        <span className="letter-icon icon">U</span> <div className="title">Usuario</div>
                    </li>
                    <li className="sidebar-link">
                        <i className="fas fa-file icon"></i> <div className="title">Reportes</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;