import React, { useState, useEffect } from "react";
import {
    GRAY, 
    TEXT_TITLE,
    HEADER_COLOR, 
    MENU_GRAY
} from "../../utils/WebColors";
import USER from "../../assets/images/profile1.jpg"; 
import  { Avatar } from "@material-ui/core";
import { MoreVert, Chat } from "@material-ui/icons"; 
import { makeStyles } from "@material-ui/core/styles";
import STATUS from "../../assets/svg/statusHeader.svg";

const WebChatListHeader = ({ onChatClick, onStatusClick }) =>{
    const styles  = useStyles();

    return  (
        <div className={styles.parentView}>
            <div style={{ width: "20%", marginLeft: "4%", alignSelf: "center"}}>
                <Avatar src={USER} className={styles.profileIcon}/>
            </div>
            <div 
                style={{
                    width: "40%", 
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                }}
            />
            <div 
                style={{
                    width: "40%", 
                    display: "flex",
                    flexDirection:"row"
                }}
            >
                <img onClick={onStatusClick} className={styles.menuIcons} src={STATUS} alt="chatImg"/>
                <Chat onClick={onChatClick} className={styles.chatIcons}/>
                <MoreVert className={styles.menuIcons}/>
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    parentView:{
        backgroundColor: HEADER_COLOR, 
        width: "100%",
        height: "8%",
        flexDirection: "row",
        display: "flex",
        justifyContent: "flex-start",
        borderRadius: 0,
    }, 
    backIcon:{
        justifyContent: "center",
        height: "100%", 
        alignSelf: "center",
        color: TEXT_TITLE
    },
    profileIcon:{
        width: 40, 
        height: 40, 
        alignSelf: "center",
    },
    userName:{
        fontSize: 16,
        color: TEXT_TITLE
    }, 
    userMessage:{
        fontSize: 12,
        color: GRAY
    }, 
    menuIcons:{
        width: 45, 
        height: 24, 
        color: MENU_GRAY,
        marginLeft: "15%", 
        alignSelf: "center",
        cursor: "pointer"
    }
}));