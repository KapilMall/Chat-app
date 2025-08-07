const initialState = {
    isLoading: true,
    addUser: false,
};

export const appReducer = ((state = initialState, action: any) => {
    switch(action.type) {
        case 'SET_LOADER': 
            return {...state, isLoading: action.payload};
        case 'ADD_USER':
            return {...state, addUser: action.payload}    
        default: 
            return state;
    }
})