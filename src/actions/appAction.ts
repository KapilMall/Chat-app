export const setLoader = (isLoading: boolean) => ({
    type: 'SET_LOADER',
    payload: isLoading,
});

export const setAddUser = (addUser: boolean) => ({
    type: 'ADD_USER',
    payload: addUser
}) 