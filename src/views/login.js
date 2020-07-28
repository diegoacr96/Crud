import React from 'react';


const Login = () => {
    const date = new Date();
    return(
        <div className="login-background">
            <div className="login">
                <div className="container">
                    <div className="application">
                        <div className="app">
                            Aplication <br /> 
                            OLSoftware
                        </div>
                        Prueba práctica Front-End senior
                    </div>
                    <div className="login-field">
                        Inicio de sesión    
                    <form>
                        <div className="input-login">
                                <input type="text" placeholder="Usuario" />
                                <input type="password" placeholder="Contraseña" />
                        </div>
                        <button type="button"> Iniciar Sesión </button>                        
                        </form> 
                    </div>
                </div>
            </div>
            <footer>
                OLSoftware - {date.getFullYear()}
            </footer>
        </div>
    )
}

export default Login;