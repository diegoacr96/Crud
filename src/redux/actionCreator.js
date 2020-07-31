export const fetchingUsers = (db, item= null) => dispatch => {
    dispatch(userLoading());
    let query  = db.collection("usuarios");
    if(item){
        query = item['lastname'].value? query.where("Apellido", "==", item['lastname'].value): query;
        query = item['nombre'].value? query.where("Nombre", "==", item['nombre'].value): query;
        query = item['state'].value? query.where("State", "==", item['state'].value): query;
        query = item['email'].value? query.where("Email", "==", item['email'].value): query;
        query = item['rol'].value? query.where("Rol", "==", item['rol'].value): query;
        query = item['tel'].value? query.where("Tel", "==", item['tel'].value): query;
        query = item['id'].value? query.where("Id", "==", item['id'].value): query;
    }
    query.get()
    .then(querySnapshot => {
        let temp = [];
        querySnapshot.forEach((user) => {
            temp.push(user.data())
        })
        dispatch(addUsers(temp));
    })
    .catch(err => dispatch(userErr(err)));
}


export const creatingUsers = (db, firebase, item) => dispatch => {
    firebase.auth().createUserWithEmailAndPassword(item['mail'].value, item['pass'].value)
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