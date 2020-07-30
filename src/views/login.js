import React from 'react';

const Login = ({firebase}) => {
    const date = new Date(); 
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            window.location.replace("/admin");
        }
    })

/*     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        return window.location.replace("/admin");
    }) */
    const login = (event) => {
        event.preventDefault();
        const email = event.target['email'].value;
        const pass = event.target['pass'].value;
        firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(() => {
            console.log("logged in");
        });
        /* firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, pass);
        })
        .then(() => {
            firebase.auth().currentUser.getIdToken(false).then(() => {
            })
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        }); */
    }
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
                        <form onSubmit={login}>
                            <div className="input-login">
                                <input type="text" name="email" placeholder="Usuario" />
                                <input type="password" name="pass" placeholder="Contraseña" />
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