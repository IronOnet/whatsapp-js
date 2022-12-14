import { createMuiTheme } from "@material-ui/core/styles";
import { APP_BG_COLOR } from "./WebColors";

export const themeConfig = createMuiTheme({
    typography: {
        fontFamily:[
            '-apple-system', 
            'BlinkMacSytemFont',
            '"Segoe-UI"', 
            'Roboto', 
            '"Helvetica Neue"',
            'Arial', 
            'sans-serif', 
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"', 
            '"Segoe UI Symbol"',
        ].joint(''),
    }, 
    spacing: 5, 
    backgroundColor: APP_BG_COLOR,
});