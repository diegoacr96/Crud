export const Users = (state = {
    loading: true,
    err: null,
    users: []
}, action) => {
    switch (action.type){
        case 'loading':
            return {...state, loading: true, err: null, users: []};
            
        case 'err':
            return {...state, loading: false, err: action.err, users: []};

        case 'addingUsers':
            return {...state, loading: false, err: null, users: action.payload};
        
        default:
            return state;
    }
}