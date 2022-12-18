import React, { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core"; 
import { themeConfig } from "../../utils/ThemeUtils"; 
import {
    getSocket, 
    storeLocalData, 
    getLocalData
} from "../../utils/WebHelperFunctions";

import { webConstants } from "../../Utils/webConstants"; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
import { HashRouter } from "react-router-dom"; 
import WebHomeScreen from "../home/WebHomeScreen";
import ScanCodeView from "./ScanCodeView"; 
import { APP_BG_COLOR } from "../../utils/WebColors";
import WebContactsView from "../contacts/WebContactsView";

const WebAppNavigator = ({params}) =>{
    useEffect(() =>{
        let userId = getLocalData(webConstants.USER_ID);
        if(userId && userId !== null && userId !== ""){
            window.location = "/home";
        }
    }, []);

    return(
        <ThemeProvider theme={themeConfig}>
            <HashRouter>
                <Switch>
                    <Route path="/chat" exact component={WebHomeScreen}/>
                    <Route path="/" component={ScanCodeView}/>
                </Switch>
            </HashRouter>
        </ThemeProvider>
    );
};

export default WebAppNavigator;