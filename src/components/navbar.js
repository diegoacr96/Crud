import React from 'react';

const firebase = require('firebase');
require('firebase/firestore');

const Navbar = ({setBar, bar, db, firebase}) => {
    const[name, setName] = React.useState("");
    const close = () => {
        firebase.auth().signOut()
        .then(() => {
            window.location.replace("/");
        }).catch(function(error) {
        // An error happened.
        });
    }

    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            db.collection("usuarios").where("Email", "==", user.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    setName(doc.data().Nombre + " " + doc.data().Apellido)
                });
            })
        }
    })
    return(
        <div className={bar?"navbar navbar-open": "navbar navbar-collapse"}>
            <div className="navbar-title">
                <i className="fas fa-bars" onClick={()=>setBar(!bar)}></i>
                <div className="title">Prueba Front-end</div>
            </div>
            <div className="user">
                {name}
                <i className="fas fa-sign-out-alt" onClick={() => close()}></i>
            </div>
        </div>
    )
}

export default Navbar;