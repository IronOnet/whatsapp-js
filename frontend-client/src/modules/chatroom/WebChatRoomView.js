import React, { useMemo, useState, useRef, useEffect } from "react";

import ChatRoomLeftItem from "./WebChatRoomLeftItem"; 
import ChatRoomRightItem from "./WebChatRoomRightItem"; 
import { webConstants } from "../../utils/WebConstants"; 
import ChatTextInput from "./WebChatTextInput"; 

import {
    getChatRoom, 
    createChatRoom, 
    updateChatRoom, 
} from "../../api/apiController"; 

import {
    getLocalData, 
    getUserTypeChatRoom, 
    getSocket, 
} from "../../utils/WebHelperFunctions"; 

import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized"; 
import WhatsapBG from "../../assets/images/WhatsappBG.png"; 
import { getChatRoomChatModel } from "../../utils/WebHelperModels"; 

let socket = getSocket(); 

const ChatRoomView = ({ chatItem, isNewChat }) =>{
    const [chatRoomList, setChatRoomList] = useState([]); 
    const [userId, setUserId] = useState(""); 
    const [refresh, setRefresh] = useState(false); 
    const [roomId, setRoomId] = useState(""); 
    const [height, setHeight] = useState(80);
    const [message, setMessage] = useState(""); 
    const flatList = useRef(); 
    const inputRef = useRef();

    const cache = new CellMeasurerCache({
        fixedWidth: true, 
        defaultHeight: 80, 
    }); 

    // This side effect is for refreshing socket data 
    useEffect(() =>{
        if(message !== ""){
            renderChats(); 
        }
    }, [message]);

    // This side effect refreshes various chat users
    useEffect(()=>{
        if(chatItem !== ""){
            fetchChatRoomMessages(); 

        }
    }, [chatItem]); 

    // This side effect is for getting userId first 
    useEffect(()=>{
        getUser(); 
        listenSocket([]);
    }, [refresh]); 

    // When user id is retrieved this side effect is 
    // invoked 
    useEffect(() =>{
        fetchChatRoomMessages();
    }, [userId]);

    function fetchChatRoomMessages(){
        let req = {
            roomId: chatItem.roomId, 
            userId: userId, 
        }; 
        getChatRoom(req)
            .then((res) =>{
                if(res.status === 200 & res.data && res.data.data.length > 0){
                    let chatArray = res.data.data[0].chat;
                    setChatRoomList(chatArray);
                } else{
                    setChatRoomList([]);
                }
            })
            .catch((error) =>{
                console.log("ERROR ", error); 
                setChatRoomList([]);
            });
    }

    function getUser(){
        const userId = getLocalData(webConstants.USER_ID); 
        setUserId(userId); 
    }

    function listenSocket(){
        socket.removeListener(webConstants.CHAT_ROOM); 
        socket.on(webConstants.CHAT_ROOM, (message) =>{
            console.log("Message ROOM Received => ", JSON.stringify(message)); 
            setMessage(message);
        });
    }

    function renderChats(){
        if(message.userId === userId || message.chatId === userId){
            setRefresh(true); 
            if(!chatRoomList){
                chatRoomList = []; 

            }
            setVirtualData(chatRoomList, message); 
            setTimeout(()=>{
                setRefresh(false); 

            }, 1000);
        }
    }

    function setVirtualData(chatArray, message){
        message != "" && chatArray.push(message.chat); 
        setChatRoomList(chatArray); 
        flatList.current.forceUpdate();

        setTimeout(()=>{
            flatList.current.measureAllRows(); 
            flatList.current.scrollToRow(chatArray.length);
        }, 1500);
    }

    const onSendMessage = (text) =>{
        if(text != ""){

            isNewChat = chatRoomList.length === 0 ? true: false; 
            let chatRequest = getChatRoomChatModel(chatItem, isNewChat, userId, text); 
            socket.emit(webConstants.CHAT_ROOM, chatRequest); 

            chatRequest.chatUnreadCount = {
                userId: userId, 
                type: "add", 
                count: 1, 
            }; 

            if(chatRequest.roomId === ""){
                chatRequest.roomId = roomId; 
            }

            const res = isNewChat ? createChatRoom(chatRequest)
            : updateChatRoom(chatRequest);

            res 
                .then((res) =>{
                    console.log("CHAT ROOM RESONSE => ", JSON.stringify(res)); 
                    chatRequest.roomId = res.data.id; 
                    setRoomId(chatRequest.roomId); 

                    socket.emit(webConstants.CHAT_LIST, chatRequest);
                })
                .catch((err) =>{
                    console.log("CHAT ROOM ERROR => ", JSON.stringify(err));
                });
        }
    };

    function modifyRowHeight(event){
        if(event.target.value != ""){
            setHeight(inputRef.current.clientHeight); 
            if(chatRoomList.length > 0){
                setTimeout(() =>{
                    flatList.current.measureAllRows();
                }, 1500);
                flatList.current.scrollToRow(chatRoomList.length);
            }
        } else{
            setTimeout(()=>{
                setHeight(inputRef.current.clientHeight); 
                flatList.current.measureAllRows(); 
                flatList.current.scrollToRow(chatRoomList.length);
            }, 2000);
        }
    }

    const rowRenderer = ({ index, parent, key, style, isScrolling }) =>{
        let item = chatRoomList[index]; 
        let userType = getUserTypeChatRoom(item, userId); 
        if(userType === webConstants.OWNER){

            return (
                <CellMeasurer 
                    key={key} 
                    cache={cache} 
                    parent={parent} 
                    columnIndex={0} 
                    rowIndex={index} 
                >
                    <ChatRoomLeftItem item={item} styleList={style}/>
                </CellMeasurer>
            ) ;
        }
    };

    return (
        <div 
            style={{
                display: "flex", 
                flexDirection: "column",  
                width: "100%", 
                background: "url(" + WhatsapBG + ")", 
                height: "92%",
            }}
        >
            <div 
                style={{
                    backgroundColor: "#E4DDD6", 
                    height: "100%", 
                    zIndex: "100", 
                    opacity: "0.95",
                }}
            />

            <div 
                style={{
                    position: "absolute", 
                    zIndex: "1000", 
                    height: "92%", 
                    width: "70%", 
                }}
            >
                <List 
                    ref={flatList} 
                    style={{
                        height: "100%", 
                        width: "100%", 
                        outline: "none", 
                        paddingBottom: height === "" ? 80: height, 
                        paddingTop: 10, 
                    }}
                    rowCount={chatRoomList.length} 
                    height={window.innerHeight - 120} 
                    width={window.innerWidth - window.innerWidth / 3.2}
                    rowHeight={cache.rowHeight} 
                    deferredMeasurementCache={cache} 
                    rowRenderer={rowRenderer} 
                    scrollToAlignment={"end"} 
                    data={refresh}
                />
            </div>

            <div 
                ref={inputRef} 
                style={{
                    position: "fixed",
                    zIndex: "2000", 
                    width: "70%", 
                    marginBottom: 0, 
                    resize: "vertical", 
                    bottom: 0, 
                    maxHeight: 160, 
                    minHeight: 60, 
                    overflow: "hidden",

                }}
            >
                <ChatTextInput 
                    onSendMessage={(text) => onSendMessage(text)} 
                    onTyping={(event) =>{
                        modifyRowHeight(event);
                    }}
                />
            </div>
        </div>
    );

    function renderRow(item){
        let userType = getUserTypeChatRoom(item, userId); 
        if(userType === webConstants.OWNER){
            return <ChatRoomRightItem item={item}/>; 
        } else{
            return <ChatRoomLeftItem item={item}/>;
        }
    }
}; 

export default ChatRoomView;