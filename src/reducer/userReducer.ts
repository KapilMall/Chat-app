const initialState = {
    currentUser: null
};

export const userReducer = ((state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_CURRENT_USER': 
            return {...state, currentUser: action.payload};
        default:
            return state;    
    }
});