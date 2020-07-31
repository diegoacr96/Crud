const firebase = require('firebase');
require('firebase/firestore');

export const fetchingUsers = (db, item= null, startAt = false, endBefore = false) => dispatch => {
    dispatch(userLoading());
    let query  = db.collection("usuarios");
    if(item){ //cheking for items to filter
        query = item['lastname'].value? query.where("Apellido", "==", item['lastname'].value): query;
        query = item['nombre'].value? query.where("Nombre", "==", item['nombre'].value): query;
        query = item['state'].value? query.where("State", "==", item['state'].value): query;
        query = item['email'].value? query.where("Email", "==", item['email'].value): query;
        query = item['rol'].value? query.where("Rol", "==", item['rol'].value): query;
        query = item['tel'].value? query.where("Tel", "==", item['tel'].value): query;
        query = item['id'].value? query.where("Id", "==", item['id'].value): query;
    }
    query = startAt?query.startAfter(startAt): query; //cheking for page to start
    query = endBefore?query.endBefore(endBefore): query; //cheking for page to start
    query.limit(8).get()
    .then(querySnapshot => {
        let temp = [];
        querySnapshot.forEach((user) => {
            temp.push(user)
        })
        console.log("length:", querySnapshot)
        dispatch(addUsers(temp));
    })
    .catch(err => dispatch(userErr(err)));
}


export const creatingUsers = (db, item) => dispatch => {

    const firebaseConfig = {
        apiKey: "AIzaSyBk7D9UnQIg4hPH0JUsrVypoUeqf57kjXs",
        authDomain: "prueba-front-2a3bd.firebaseapp.com",
        databaseURL: "https://prueba-front-2a3bd.firebaseio.com",
        projectId: "prueba-front-2a3bd",
        storageBucket: "prueba-front-2a3bd.appspot.com",
        messagingSenderId: "657100764252",
        appId: "1:657100764252:web:88d5402b426464cd102299",
        measurementId: "G-6BDNQ7SF76"
      };
      
    const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

    secondaryApp.auth().createUserWithEmailAndPassword(item['mail'].value, item['pass'].value)
    .then(() => {
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
        .then(() => {
            dispatch(fetchingUsers(db));
            secondaryApp.auth().signOut();
        })
        .catch((error) => dispatch(userErr(error)));
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(userErr(error));
    });
}

export const deleteUsers = (db, user) => dispatch => {
    db.collection("usuarios").where("Email", "==", user.Email).get().then(resp => {
        resp.forEach(doc => {
            doc.ref.delete().then(() => {
                console.log("Document successfully deleted!");
                dispatch(fetchingUsers(db))
                // fetchUsers();
            }).catch(function(error) {
                console.error("Error removing document: ", error);
                dispatch(userErr(error));
                
            });
        })
    });
}

const userLoading = () => ({
    type: 'loading',
})

const userErr = (err) => ({
    type: 'err',
    err: err
})

const addUsers = (user) => ({
    type: 'addingUsers',
    payload: user
})