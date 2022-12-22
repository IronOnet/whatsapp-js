import React from "react"; 
import { WHITE } from "../../webColors";
import { Icon, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

const WebContactsHeaderView = ({ item, onChatCloseClick }) =>{
    return(
        <div style={styles.parentView}>
            <div 
                onClick={() =>{
                    onChatCloseClick();
                }}
                style={{ alignSelf: "center", justifyContent: "center", cursor: "pointer"}}
            >
                <ArrowBack style={styles.backIcon}/>
            </div>
            <div 
                style={{
                    flexDirection: "column",
                    marginLeft: 7, 
                    justifyContent: "center",
                    fontSize: 24, 
                    alignSelf: "center"
                }}
            >
                <Typography numberOfLines={1} style={styles.userName}>
                    Select Contact
                </Typography>
                <Typography numberOfLines={2} styles={styles.userMessage}>
                    {item} Contacts
                </Typography>
            </div>
            <div style={{ flexDirection: "row", justifyContent: "space-evenly"}}>
                <Icon 
                    name="dots-vertical" 
                    type="MaterialCommunityIcons"
                    style={styles.menuIcons}
                />
            </div>
        </div>
    );
};

const styles = {

}