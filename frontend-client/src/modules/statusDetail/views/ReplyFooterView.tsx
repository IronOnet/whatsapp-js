import React, { useEffect, useState } from "react"; 
import './css/footer.css'; 
import { ReplyFooterProps } from '../utils/interfaceHelper'; 
import { WHITE } from '../utils/Colors';

export const ReplyFooterView = ({ progressIndex, onReplyButtonClick, 
                onReplyTextChange, onInputFocus, messageList }: ReplyFooterProps) =>{
        
        const [showReply, setShowReply] = useState(true);
        
        useEffect(() =>{
            if(showReply){
                // do nothint
            }
        }, [showReply, progressIndex ])

        return (
            <div style={Object.assign(styles.parentStyle)}>
                {
                    messageList && messageList.length > 0 && (
                        <div style={Object.assign(styles.messageStyle)}>
                            <p>
                                {messageList[progressIndex] === '' ? '': messageList[progressIndex]}
                            </p>
                        </div>
                    )
                }

                <div className="innerDiv">
                    <img 
                        className="imgStyle" 
                        src={process.env.PUBLIC_URL + '/images/smiley.svg'} 
                        onClick={() => onReplyButtonClick && onReplyButtonClick('smiley', progressIndex)}
                        onFocus={() => onInputFocus && onInputFocus(true)} 
                        onBlur={() => onInputFocus && onInputFocus(false)}
                        alt=""
                    />
                    <img 
                        className="imgStyle" 
                        src={process.env.PUBLIC_URL + '/images/send.svg'} 
                        onClick={() => onReplyButtonClick && onReplyButtonClick('send', progressIndex)} 
                        alt=""
                    />
                </div>
            </div>
        )
}

const styles = {
    messageStyle:{
        fontSize: 16, 
        color: WHITE, 
        fontWeight: '500', 
        marginBottom: '2%', 
        alignSelf: 'center', 
        maxWidth: '50%', 
    }, 
    parentStyle:{
        display: 'flex', 
        justifyContent: 'center', 
        textAlign: 'center', 
        width: '100%', 
        flexDirection: 'column', 
        position: 'relative'
    }
}