import React, { useEffect, useState } from "react"; 
import { webContants } from "../../utils/WebConstants";
import ContactsHeaderView  from "./WebContactsHeaderView"; 
import ContactsItem from "./WebContactsItem"; 
import { getLoggedInUserList } from "../../api/apiController";
import { getLocalData } from "../../utils/WebHelperFunctions"; 
import EmptyComponent from "../../components/webEmptyComponent"; 
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized"; 
import { WHITE } from "../../utils/WebColors"; 

const cache = new CellMeasurerCache({
    fixedWidth: true, 
    defaultHeight: 80, 
}); 

const WebContactsView = ({ onChatCloseClick, onItemClick }) =>{

    const [contacts, setContacts ] = useState([]); 

    useEffect(() =>{
        getRegisteredUsers();
    }, []);

    const getRegisteredUsers = () =>{
        getLoggedInUserList() 
        .then(async (res) =>{
            console.log("USER LIST RESPONSE => ", res.data);
            if(res.data.success){
                let userList = res.data.data; 
                let ownerId = await getLocalData(webContants.USER_ID);

                for(let index = 0; index < userList.length; index++){
                    const user = userList[index];
                    if(user.userId === ownerId){
                        userList.splice(index, 1);
                    }
                }
                setContacts(userList);
            }
        })
        .catch((err) =>{
            console.log("USER LIST ERROR =>", err);
        });
    };

    return (
        <div style={styles.parent}>
            <ContactsHeaderView 
                item={contacts ? contacts.length : 0 }
                onChatCloseClick={onChatCloseClick}
            />
            <div style={styles.parent}>
                {contacts.length <= 0 && <EmptyComponent message={"No User Found"}/>}

                {contacts.length > 0 && (
                    <List 
                        style={{
                            outline: "none", 
                            height: window.innerHeight - 120,
                        }}
                        rowCount = {contacts.length} 
                        height={window.innerHeight} 
                        width={window.innerWidth} 
                        rowHeight={cache.rowHeight}
                        rowRenderer={({ index, parent, key, style }) =>(
                            <CellMeasurer
                                key={key}
                                cache={cache}
                                parent={parent}
                                columnIndex={0} 
                                rowIndex={index}
                            >
                                <ContactsItem
                                    item={contacts[index]}
                                    onItemClick={onItemClick}
                                />
                            </CellMeasurer>
                        )}
                        overscanRowCount={0} 
                    />
                )}
            </div>
        </div>
    );
}; 

export default WebContactsView; 

const styles = {
    parent: {
        backgroundColor: WHITE, 
        display: "flex", 
        width: "100%", 
        height: "100%", 
        flexDirection: "column",
    },
};