import React from 'react';

const Navbar = ({setBar, bar}) => {
    return(
        <div className={bar?"navbar navbar-open": "navbar navbar-collapse"}>
            <div className="navbar-title">
                <i className="fas fa-bars" onClick={()=>setBar(!bar)}></i>
                <div className="title">Prueba Front-end</div>
            </div>
            <div className="user">
                Andres Felipe Garcia Castro
                <i className="fas fa-sign-out-alt"></i>
            </div>
        </div>
    )
}

export default Navbar;