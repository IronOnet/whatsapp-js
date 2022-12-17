import React from "react"; 
import { GRAY, WHITE } from "../utils/WebColors"; 
import CANCEL from "../assets/svg/cancel.svg"; 
import { makeStyles } from "@material-ui/core/styles"; 
import { getDateTimeStatusFormat } from "../utils/webHelperFunctions"; 
import WebTimeElapsed from "./WebTimeElapsed"; 
import { SELECTED_STATUS } from "../modules/status/WebStatusReducer"; 

const WebZoneStatusComponent = ({ statusData, onCancelClick, dispatch }) =>{
    const classes = useStyles(); 
    console.log(statusData.image); 
    return (
        <div className={classes.parent}>
            <img 
                onClick={onCancelClick}
                alt={"Cancel"} 
                className={classes.cancelIcon}
                src={CANCEL}
            />
            <p 
                style={{
                    fontSize: 24, 
                    color: WHITE, 
                    fontWeight: "500", 
                    marginBottom: "5%", 
                    marginLeft: "2%",
                    alignSelf: 'center',
                    textAlign: 'center',
                }}
            >
                {"View You Updates"}
            </p>
            <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: 'center'}}>
                {statusData.status.map((value, index) =>{
                    return (
                        <div 
                            style={{
                                marginLeft: "4%",
                                justifyContent: "center",
                                alignSelf: "center",
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: 150,
                                cursor: 'pointer'
                            }}
                            onClick={()=>{
                                dispatch({ type:SELECTED_STATUS, payload: statusData });
                            }}
                        >
                            <img 
                                className={classes.alertIcon} 
                                src={statusData.status[index].image}
                                alt="wbz_img"
                            />
                            <WebTimeElapsed
                                style={{
                                    fontSize: 14, 
                                    color: GRAY,
                                    marginTop: 5, 
                                    textAlign: "center", 
                                }}
                                time={getDateTimeStatusFormat(statusData.status[index].time)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WebZoneStatusComponent; 

const useStyles = makeStyles({
    parent:{
        width: "100%", 
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        display: "flex",
        fontFamily: "Roboto"
    },
    alertIcon:{
        height: 80,
        width: 80, 
        borderRadius: 80, 
        alignSelf: "center", 
        marginBottom: "1%",
    }, 
    cancelIcon :{
        alignSelf: "center", 
        color: GRAY, 
        position: "absolute",
        top: 20,
        cursor: "pointer"
    },
});