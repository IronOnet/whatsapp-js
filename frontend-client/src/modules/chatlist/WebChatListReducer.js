import { webConstants } from "../../utils/WebConstants";

export const initialChatListState = {
    chatList: [], 
    chatItem: '', 
    refresh: true,
    userId: '', 
}; 

export const REFRESH = 'REFRESH', 
    CHAT_LIST = 'CHAT_LIST', 
    CHAT_ITEM = 'CHAT_ITEM'; 

export const chatListReducer = (state, action) =>{
    console.log(action.type, action.payload);

    switch(action.type){
        case CHAT_LIST: 
            return {...state, chatList: action.payload};
        case CHAT_ITEM:
            return {...state, chatItem: action.payload};
        case REFRESH:
            return {...state, refresh: action.payload};
        case webConstants.USER_ID:
            return {...state, userId: action.payload};
    
        default:
            console.log("Do nothing");
            break;
    }
}