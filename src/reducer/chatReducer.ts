const initialState = {
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
}

export const chatReducer = ((state = initialState, action: any) => {
    switch(action.type) {
        case "CHANGE_CHATS":
                const currentUser = action.payload.currentUser;

                // check if current user is blocked

                if (action.payload.user.blocked.includes(currentUser.id)){
                    return {
                        ...state, 
                        chatId: action.payload.chatId, 
                        user: null, 
                        isCurrentUserBlocked: true, 
                        isReceiverBlocked: false
                    }
                    //check if receiver is blocked
                } else if (currentUser.blocked.includes(action.payload.user.id)){
                    return {
                        ...state, 
                        chatId: action.payload.chatId, 
                        user: action.payload.user, 
                        isCurrentUserBlocked: false, 
                        isReceiverBlocked: true
                    }
                } else {
                    return {
                        ...state, 
                        chatId: action.payload.chatId, 
                        user: action.payload.user, 
                        isCurrentUserBlocked: false, 
                        isReceiverBlocked: false
                    }
                }

        case "CHANGE_BLOCK": 
            return {...state, isReceiverBlocked: !state.isReceiverBlocked};
        default: 
            return state;
    }
})