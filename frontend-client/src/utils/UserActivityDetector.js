import createActivityDetector from "activity-detector";
import moment from "moment"; 
import { webConstants } from "./WebConstants"; 
import { getLocalData, getSocket } from "./WebHelperFunctions";

let socket = getSocket();

export function detectUserActivity(){
    const activityDetector = createActivityDetector({
        timeToIdle: 60000,    
    });

    activityDetector.on("idle", ()=>{
        socket.emit(webConstants.LAST_SEEN, getUserData("Offline"));
    }); 

    activityDetector.on("active", ()=>{
        socket.emit(webConstants.LAST_SEEN, getUserData("Online"));
    })

    return activityDetector;
}

export function sendPageLoadStatus(){
    socket.emit(webConstants.LAST_SEEN, getUserData("Online"));
}

export function getUserData(status){
    const data = {
        userId: getLocalData(webConstants.USER_ID), 
        userName: getLocalData(webConstants.USER_NAME), 
        status: status,
        lastSeen: moment().format(),
    };
    console.log(JSON.stringify(data)); 
    return data
}