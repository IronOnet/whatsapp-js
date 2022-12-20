import React, { useEffect, useReducer } from "react"; 

import WebChatListItem from "./WebChatListItem"; 
import { webConstants } from "../../utils/WebConstants"; 
import { WebEmptyComponent as EmptyComponent } from "../../components/webEmptyComponent"; 
import { getChatList } from "../../api/apiController"; 
import { getLocalData, getSocket } from "../../utils/WebHelperFunctions"; 
import { WHITE } from "../../utils/webColors"; 
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import {
    initialChatListState, 
    chatListReducer, 
    CHAT_LIST, 
    CHAT_ITEM, 
    REFRESH
} from "./WebChatListReducer"; 

let socket = getSocket();
const cache = new CellMeasurerCache({
    fixedWidth: true, 
    defaultHeight: 60, 
}); 

const WebChatListView = ({ onItemClick, userChatList }) =>{
    let [state, dispatch] = useReducer(chatListReducer, initialChatListState); 

    let { chatList, chatItem, refresh, userId } = state; 

    useEffect(() =>{
        listenSocket();
    }, []); 

    useEffect(() =>{
        if(refresh){
            getLatestChats();
        }
    }, [refresh]);

    useEffect(()=>{
        if(chatItem !== ""){
            renderChats();
        }
    }, [chatItem]); 

    function getUserId(){
        const userId = getLocalData(webConstants.USER_ID); 
        dispatch({ type: webConstants.USER_ID, payload: userId }); 
        return userId; 
    }

    const getLatestChats = () =>{
        getUserId(); 
        getChatList() 
        .then((res) => {
            if(res.status === 200){
                userChatList(res.data.data); 
                dispatch({ type: CHAT_LIST, payload: res.data.data }); 
            }
            dispatch({ type: REFRESH, payload: false }); 
        }) 
        .catch((error) =>{
            console.log("ERROR ", error);
        });
    }; 

    async function renderChats(){
        let chatArray = chatList; 
        console.log("Message CHAT Received => ", JSON.stringify(chatItem)); 

        let isMatch = false; 
        if(chatArray.length > 0){
            for(let i = 0; i < chatArray.length; i++){
                const element = chatArray[i]; 
                if(chatItem && element.roomId === chatItem.roomId){
                    chatItem = await calcUnreadCount(chatItem, element.chatUnreadCount); 

                    // The chat item received is an object, convert it to array 
                    // and they're reinitialized if (chatItem.chat.length <= 0)
                    chatItem.chat = [chatItem.chat]; 
                    console.log("Selected chat Received => ", JSON.stringify(chatItem)); 
                    chatArray[i] = chatItem; 
                    isMatch = true; 
                    break;
                }
            }

            if(!isMatch && chatItem.chatUnreadCount.type !== 'reset'){
                chatItem = await calcUnreadCount(chatItem, 0); 
    
                // convert the chat item to an array 
                chatItem.chat = [chatItem.chat]; 
                console.log("Selected Chat received =>", JSON.stringify(chatItem)); 
                chatArray.push(chatItem); 
            }
    
            console.log("Message CHAT AFTER Received => ", JSON.stringify(chatItem)); 
    
            dispatch({ type: CHAT_LIST, payload: chatArray }); 
            console.log(
                `FINAL CHAT ARRAY ${refresh} =>`, "JSON.stringify(chatArray)"
            );
        } else{
            // for new chat 
            if(chatItem.chatUnreadCount === "add"){
                dispatch({ type: REFRESH, payload: true });
            }
        }

        
    }

    function listenSocket(){
        socket.on(webConstants.CHAT_LIST, (chatItem) =>{
            dispatch({ type: CHAT_ITEM, payload: chatItem }); 
        }); 
    }

    function calcUnreadCount(chatItem, originalCount){
        if(chatItem.chatUnreadCount.userId !== userId){
            if(chatItem.chatUnreadCount.type === "reset"){
                chatItem.chatUnreadCount = 0; 
            } else if(chatItem.chatUnreadCount.type === "add"){
                chatItem.chatUnreadCount = originalCount ? originalCount + 1: 1; 
            } else{
                chatItem.chatUnreadCount = 0;
            }
        }else if(chatItem.chatUnreadCount.type === "reset"){
            chatItem.chatUnreadCount = 0;
        } else{
            chatItem.chatUnreadCount = originalCount; 
        }
        return chatItem; 
    }

    return (
        <div 
            style={{
                flex: 1, 
                width: "100%", 
                borderRadius: 0, 
                backgroundColor: WHITE, 
            
            }}>

            {chatList.length === 0 && (
                <EmptyComponent message={"No chats, contacts or messages found"}/>
            )}

            <List 
                style={{
                    height: "100%", 
                    width: "100%", 
                    outline: "none", 
                }}
                rowCount={chatList.length} 
                height={window.innerHeight} 
                width={window.innerWidth - window.innerWidth / 3.2} 
                rowHeight={cache.rowHeight} 
                rowRender={({ index, parent, key, style }) => (
                    <CellMeasurer 
                        key={key} 
                        cache={cache} 
                        parent={parent} 
                        columnIndex={0} 
                        rowIndex={index} 
                    >
                        <WebChatListItem 
                            item={chatList[index]} 
                            position={index}
                            onItemClick={onItemClick}
                        />
                    </CellMeasurer>
                )}
                overscanRowCount={0} 
                data={refresh}
            />
        </div>
    );
};

export default WebChatListView; 