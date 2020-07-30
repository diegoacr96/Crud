import React from 'react';

const firebase= require('firebase');
require('firebase/firestore');

const login = (event) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword("diegoacr96@gmail.com", "password").catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        if(errorCode) console.log(errorCode);
        var errorMessage = error.message;
        if(errorMessage) console.log(errorMessage);
        // ...
    })
}

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
                        <form onSubmit={() => login()}>
                            <div className="input-login">
                                    <input type="text" placeholder="Usuario" />
                                    <input type="password" placeholder="Contraseña" />
                            </div>
                            <button type="submit"> Iniciar Sesión </button>                        
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