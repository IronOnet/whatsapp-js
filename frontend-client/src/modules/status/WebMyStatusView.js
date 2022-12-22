import React from "react"; 
import {
    STATUS_DESC, 
    STATUS_TITLE, 
    GREEN, 
    LIGHT_GREEN, 
    WHITE, 
} from "../../utils/webColors"; 
import { webConstants } from "../../utils/WebConstants"; 
import { Avatar, Typography } from "@material-ui/core"; 
import PROFILE1 from "../../assets/images/profile1.jpg"; 
import WebTimeElapsed from "../../components/WebTimeElapsed"; 
import { SELECTED_STATUS } from "./WebStatusReducer";

const WebMyStatusView = ({ style, statusData, isUser, isBorder, dispatch }) =>{
    const statusImage = 
        statusData && statusData.status && statusData.status.length > 0 
        ? statusData.status[statusData.status.length - 1].image + ""
        :""; 

    return (
        <div 
            style={Object.assign({}, style.parent, style)} 
            onClick={() =>{
                dispatch({type: SELECTED_STATUS, payload: statusData });
            }}
        >
            <div 
                style={Object.assign(
                    isBorder ? styles.circleView: isUser ? styles.circleNoView: styles.circleSeeView
                )}
            >
                <Avatar 
                    src={statusImage ? statusImage: PROFILE1}
                    style={isBorder ? styles.profileImage: isUser ? styles.profileNoImage : styles.profileImage }
                />
            </div>
            <div 
                style={{
                    flexDirection:"column", 
                    marginLeft: "3%", 
                }}
            >
                <Typography numberOfLines={1} style={style.userName}>
                    {isUser ? "My Status" : statusData.userName}
                </Typography>
                <WebTimeElapsed
                    style={styles.userMessage} 
                    time={
                        statusData.lastStatusTime 
                        ? statusData.lasStatusTime 
                        : "Tap to add status update"
                    }
                />
            </div>
        </div>
    );
};

export default WebMyStatusView; 

const styles = {
    parent: {
        display: "flex", 
        flexDirection: "row", 
        flex: 1, 
        alignItems: "center", 
        cursor: "pointer", 
    }, 
    profileImage:{
        width: webConstants.STATUS_IMAGE_SIZE, 
        height: webConstants.STATUS_IMAGE_SIZE, 
        borderRadius: webConstants.STATUS_IMAGE_SIZE/2, 
        alignSelf: "center", 
    }, 
    profileNoImage:{
        width: webConstants.STATUS_IMAGE_SIZE + 5, 
        height: webConstants.STATUS_IMAGE_SIZE + 5, 
        borderRadius: webConstants.STATUS_IMAGE_SIZE + 5/2, 
        alignSelf: "center", 
    }, 
    userName:{
        fontSize: 16, 
        fontWeight: 500, 
        color: STATUS_TITLE, 
    }, 
    userMessage:{
        fontSize: 13, 
        color: STATUS_DESC, 
        fontWeight: 600, 
        alignSelf: "flex-start",
    }, 
    userTime:{
        fontSize: 12, 
        color: WHITE, 
        alignSelf: "flex-end", 
    }, 
    msgIcon:{
        fontSize: 26, 
        color: GREEN,
        alignSelf: "flex-end", 
    }, 
    circleView: {
        borderRadius: 100, 
        border: "2px solid red", 
        width: webConstants.STATUS_IMAGE_SIZE, 
        height: webConstants.STATUS_IMAGE_SIZE, 
        padding: 2, 
        justifyContent: "center", 
        alignItems: "center", 
        borderColor: LIGHT_GREEN, 
    }, 
    circleNoView:{
        borderRadius: 100, 
        border: "2px solid transparent", 
        width: '55px', 
        height: '55px', 
        padding: 2, 
        justifyContent: "center", 
        alignItems: "center", 
        borderColor: "transparent", 
    }, 
    circleSeenView:{
        borderRadius: 100, 
        border: "2px solid red", 
        width: webConstants.STATUS_IMAGE_SIZE, 
        height: webConstants.STATUS_IMAGE_SIZE,
        padding: 2, 
        justifyContent: "center", 
        alignItems: "center", 
        borderColor: STATUS_DESC,
    },

};