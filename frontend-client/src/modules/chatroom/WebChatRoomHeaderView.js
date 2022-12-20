import React, { useState, useEffect } from "react"; 
import { GRAY, TEXT_TITLE, HEADER_COLOR, MENU_GRAY} from "../../utils/WebColors";
import {
    getUserType, 
    getDateTimeInFormat, 
    getSocket, 
    getLocalData
} from "../../utils/WebHelperFunctions";
import { webConstants } from "../../webConstants";
import { Avatar, Typography } from "@material-ui/core";
import { Search, AttachFile, MoreVert } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import chatImage from "../../assets/svg/chatImage.svg";
import { sendPageLoadStatus } from "../../utils/UserActivityDetector";
import { getLastSeenUser } from "../../api/apiController"; 

let socket = getSocket();

const WebChatRoomHeaderView = ({ item, isNewChat }) =>{

    const [ userType, setUserType ] = useState("");
    const [ displayScreen, setDisplayScreen ] = useState("");
    const [ apiLastSeen, setApiLastSeen ] = useState("");

    let styles = useStyles();

    let data = item.chat[0];

    useEffect(() =>{
        populateUserType();
        listenUserLastSeen();
        getUserLastSeen();
    }, [item]);

    useEffect(() =>{
        if(apiLastSeen !== ""){
            calcLastSeen(apiLastSeen);
        }
    }, [apiLastSeen]);

    const populateUserType = () =>{
        let userType = getUserType(item); 
        setUserType(userType);
    }; 

    async function getUserLastSeen(){
        let userId = getLocalData(webConstants.USER_ID); 
        let id = data.userId === userId ? data.chatId : data.userId;
        let request = { id: id };
        let res = getLastSeenUser(request);
        res.
            then((lastSeen) =>{
                if(lastSeen){
                    setApiLastSeen(lastSeen.data.lastSeen[0]);
                }
            })
            .catch((err) =>{
                console.log("USER LAST SEEN ERROR ==> ", err);
            });
    }

    function listenUserLastSeen(){
        socket.on(webConstants.LAST_SEEN, (status) =>{
            let newStatus = {
                userId: status.userId, 
                userName: status.userName,
                status: status.status, 
                lastSeen: status.lastSeen,
            }; 

            let id = getLocalData(webConstants.USER_ID); 
            if(status.userId !== id){
                calcLastSeen(newStatus);
            }
        });
        sendPageLoadStatus();
    }

    async function calcLastSeen(lastSeen){
        if(lastSeen){
            if(lastSeen.userId === data.userId || lastSeen.userId === data.chatId){
                let time = lastSeen.status === "Offline" ? `Last seen at ${getDateTimeInFormat(lastSeen.lastSeen)}`
                : lastSeen.status; 
                setDisplayLastSeen(time);
            } else if(apiLastSeen !== ""){
                let time = `Last seen at ${getDateTimeInFOrmat(apiLastSeen.lastSeen)}`; 
                setDisplayLastSeen(time);
            }
        } else{
            setApiLastSeen("");
            setDisplayLastSeen("");
        }
    }

    return (
        <div className={styles.parentView} elevation={webConstants.PAPER_ELEVATION}>
            <div
                style={{
                    width: "5%",
                    marginLeft: "1%", 
                    alignSelf: "center",
                    marginTop: "0.2%",
                }}
            >
                <Avatar src={chatImage} className={styles.profileIcon}/>
            </div>
            <div
                style={{
                    display: "flex", 
                    width: "76%", 
                    flexDirection: "column",
                    marginLeft: "1%",
                    alignSelf: "center",
                }}
            >
                <Typography className={styles.userName}>
                    {userType === webConstants.FRIEND ? data.userName: data.chatName }
                </Typography>
                <Typography className={styles.userMessage}>
                    {displayLastSeen}
                </Typography>
            </div>
            <div 
                style={{
                    width: "19%", 
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
            >
                <Search className={styles.menuIcons}/>
                <AttachFile className={styles.menuIcons}/>
                <MoreVert className={styles.menuIcons}/>
            </div>
        </div>
    );
};

export default  WebChatRoomHeaderView;

const useStyles = makeStyles((theme) =>({
    parentView: {
        backgroundColor: HEADER_COLOR, 
        width: "100%", 
        height: "8%", 
        flexDirection: "row", 
        display: "flex", 
        justifyContent: "flex-start", 
        paddingLeft: "1%", 
        borderRadius: 0, 
        marginLeft: 0.05, 
    }, 
    backIcon :{
        justifyContent: "center", 
        height: "100%", 
        alignSelf: "center", 
        color: TEXT_TITLE, 

    }, 

    profileIcon:{
        alignSelf: "center", 
        justifyContent: "center",
    }, 
    userName: {
        fontSize: 16, 
        color: TEXT_TITLE,
    },
    menuIcons:{
        fontSize: 24, 
        color: MENU_GRAY, 
        marginLeft: 0, 
        alignSelf: "center",
        cursor: "pointer",
    },
}));