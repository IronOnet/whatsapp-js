import React, { useEffect, useState } from "react"; 
import ChatRoomView from "./WebChatRoomView"; 

import WebChatRoomHeaderView from "./WebChatRoomHeaderView"; 
import { webConstants } from "../../utils/WebConstants"; 
import { getSocket, getLocalData } from "../../utils/WebHelperFunctions"; 
import { getChatListModel } from "../../utils/WebHelperFunctions"; 

let socket = getSocket(); 

const WebChatRoomScreen = ({ route }) =>{
    console.log("ChatRoomScreen => ", JSON.stringify(route)); 
    const [ refresh, setRefresh ] = useState(false);

    useEffect(()=>{
        setRefresh(!refresh); 
        getUserIdAndChatItem(); 
    }, [route]);

    async function getUserIdAndChatItem(){
        // clear user chat unread count accross all 
        // platforms 
        let chatItem = getChatListModel(route, false, 0); 
        let userId = getLocalData(webConstants.USER_ID); 
        chatItem.chatUnreadCount = {
            userId: userId, 
            type: "reset", 
            count: 0
        };
        socket.emit(webConstants.CHAT_LIST, chatItem); 
        console.log("ChatRoomScreen NEW => ", chatItem);
    }

    return (
        <div style={styles.parentView}>
            <WebChatRoomHeaderView item={route} isNewChat={false}/>
            <ChatRoomView chatItem={route} isNewChat={false}/>
        </div>
    );
};

export default WebChatRoomScreen; 

const styles = {
    parentView: {
        width: "100%", 
        height: "100%", 
        display: "flex", 
        flexDirection: "column", 
        backgroundColor: "#E4DDD6"
    }
}; 


