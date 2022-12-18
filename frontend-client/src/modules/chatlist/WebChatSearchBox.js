import React, { useState } from "react"; 
import {
    WHITE,
    TEXT_TITLE
} from "../../utils/WebColors";
import {InputBase} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const WebChatSearchBox = ({onSendMessage }) =>{
    const [message, setMessage] = useState("");

    function handleKeyDownEvent(event){
        event.preventDefault();
        if(event.key === "Enter"){
            event.preventDefault();
            onSendMessage(message);
            setMessage("");
        }
    }

    return (
        <div style={styles.parentView}>
            <InputBase
                multiline 
                rowMax={5}
                style={styles.userMessage}
                placeholder="Search or start a new chat"
                value={message} 
                onKeyPress={e => handleKeyDownEvent(e)}
                onChange={event =>{
                    setMessage(event.target.value);
                }}
            >
                <Search width={30}/>
            </InputBase>
        </div>
    );
};


export default WebChatSearchBox; 

const styles = {
    parentView:{
        backgroundColor: "#F7F7F7",
        display: "flex",
        width: "100%",
        flexDirection: "row", 
        justifyContent: "center",
        maxHeight: 120,
    },
    userMessage:{
        fontSize: 14, 
        color: TEXT_TITLE,
        justifyContent: "center",
        alignSelf: "center",
        textAlignVertical: "center",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10, 
        marginTop: 8,
        marginBottom: 8,
        resize: "vertical",
        backgroundColor: WHITE, 
        borderRadius: 20,
        borderColor: "F7F7F7",
        outline: "none", 
        flex: 0.95, 
        maxHeight: 120
    }
}