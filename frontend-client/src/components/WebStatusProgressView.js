import React, { useReducer, useEffect} from "react"; 
import StoryContainer from "../modules/statusDetails/components/container/StoryContainer"; 
import {
    BAR_INACTIVE_COLOR, 
    BAR_ACTIVE_COLOR
} from "../modules/statusDetails/utils/colors"; 

import {
    statusReducer, 
    statusState
} from "../modules/status/WebStatusReducer"; 
import { getDateTimeInFormat } from "../utils/WebHelperFunctions"; 
import chatImage from "../assets/svg/chatImage.svg"; 
import {
    setUserStatusViewed, 
    getStatus
} from "../modules/status/WebStatusViewAction"; 

export const WebStatusProgressView = ({ statusData, isUser, dispatchParam, toggleStatusView }) =>{
    let [state, dispatch ] = useReducer(statusReducer, statusState); 
    let { imageList, messageList } = state; 

    useEffect(() =>{
        getStatus(statusData, dispatch); 
        if(!isUser){
            setUserStatusViewed(statusData, 0);
        }
    }, []); 

    return (
        <StoryContainer 
            images={imageList} 
            visible={true} 
            duration={20} 
            enableProgress={true} 
            // User information in header 
            userProfile={{
                userName: statusData.userName, 
                userMessage: getDateTimeInFormat(statusData.lastStatusTime), 
                imageArrow: process.env.PUBLIC_URL + "images/back.svg", 
                userImage: chatImage, 
                onImageClick: (buttonType) =>{
                    switch(buttonType){
                        case "back": 
                            console.log(`Back button tapped`); 
                            break; 
                        case "cancel": 
                            console.log(`Cancel button tapped`); 
                            break;
                    }
                    toggleStatusView();
                },
            }}

            onChange={position =>{
                if(!isUser){
                    setUserStatusViewed(statusData, posiiton);
                }
            }}

            // Reply option 
            replyView={{
                messageList: messageList, 
                isShowReply: true, 
                onReplyTextChange: (textReply, progressIndex) =>{
                    console.log(`Text : ${textReply}, position: ${progressIndex}`);
                }, 
                onReplyButtonClick: (buttonType, progressIndex) =>{
                    switch(buttonType){
                        case "send": 
                            console.log(`Send button tapped for position: ${progressIndex}`); 
                            break; 
                        case "smiley": 
                            console.log(
                                `Smiley button tapped for position : ${progressIndex}`
                            ); 
                            break;
                    }
                },
            }}

            barStyle={{
                barActiveColor: BAR_ACTIVE_COLOR, 
                barInactiveColor: BAR_INACTIVE_COLOR, 
                barWidth: 60, 
                barHeight: 4, 
            }}
            style={{
                height: "100%", 
                width: "100%", 
                fontFamily: "Roboto"
            }}
            imageStyle={{
                height: window.innerHeight,
            }}
        />
    );
};