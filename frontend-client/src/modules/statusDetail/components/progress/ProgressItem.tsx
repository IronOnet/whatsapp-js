import React, { useEffect, useState, useReducer} from "react"; 
import '../../css/progressView.css';
import { BAR_INACTIVE_COLOR, BAR_ACTIVE_COLOR } from "../../utils/Colors";
import { ProgressItemProps } from "../../utils/interfaceHelper"; 
import { progressReducer, initialState, PROGRESS } from "./ProgressReducer";

let isValid = true, isBlock = false,
    listener: any; 

const OFFSET = 100, 
    BAR_WIDTH = 60, 
    BAR_HEIGHT= 7; 

function ProgressItem(props: ProgressItemProps){

    let [state, dispatch] = useReducer(progressReducer, initialState);
    let { progress }  = state;

    const barActiveColor = props.barStyle && props.barStyle.barActiveColor ? props.barStyle.barActiveColor: BAR_ACTIVE_COLOR; 
    const barInactiveColor = props.barStyle && props.barStyle.barInactiveColor ? props.barStyle.barInactiveColor: BAR_INACTIVE_COLOR; 
    const barWidth = props.barStyle && props.barStyle.barWidth ? props.barStyle.barWidth : BAR_WIDTH; 
    const barHeight = props.barStyle && props.barStyle.barHeight ? props.barStyle.barHeight: BAR_HEIGHT; 

    useEffect(() =>{
        if(props.enableProgress){
            if(progress >= 0 && progress < OFFSET){
                if(progress >= 0 && progress < OFFSET){
                    if(progress === OFFSET - 1){
                        isValid = true;
                    }
                    if(!isBlock){
                        startProgress();
                    }else{
                        isBlock = false;    
                        dispatch({ type: PROGRESS, payload: progress + 1 });
                    }
                } else{
                    if(isValid){
                        clearTimeout(listener);
                        isValid = false; 
                        props.onChangePosition();
                    }
                }
            }
        }
    }, [progress, props.enableProgress]);

    useEffect(() =>{
        if(props.enableProgress){
            if(props.currentIndex === props.progressIndex){ 
                if(props.progressIndex !== 0){
                     clearTimeout(listener); 
                     isValid = false; 
                     isBlock = true; 
                     dispatch({ type: PROGRESS, payload: 0});
                     console.log("Progress Change => === ", props.progressIndex)
                } else{
                    isValid = true; 
                    dispatch({ type: PROGRESS, payload: 0});
                }
            }
        }
    }, [props.progressIndex]); 

    function startProgress(){
        listener = setTimeout(() =>{
            dispatch({ type: PROGRESS, payload: progress + 1})
        }, props.duration); 
    }

    return (
        <div className='parentItemStyle'
            style={Object.assign({}, 
                    styles.mainParent, {minWidth: `${barWidth/ props.size - 1}%`, backgroundColor: barInactiveColor})}>
                        { props.currentIndex === props.progressIndex && (
                            <div 
                                style={Object.assign({}, styles.childActive, { width: `${progress}%`, height: barHeight, backgroundColor: barActiveColor})}
                            />
                        )}

                        {(props.currentIndex !== props.progressIndex) && (
                            <div 
                                style={Object.assign({}, 
                                    {
                                        backgroundColor: props.currentIndex >= props.progressIndex ? barInactiveColor: barActiveColor, 
                                        minWidth: `${barWidth/ props.size - 1}`, 
                                        height: barHeight, 

                                    }, styles.childInactive)}
                            />
                        )}
                    </div>
    );
}

export default ProgressItem; 

const styles = {
    mainParent:{
        marginLeft: '0.5%', 
        marginRight: '0.5%', 
        borderRadius: 20, 
        alignSelf: 'center', 
        justifyContent: 'center', 
        display: 'inline-block'
    }, 
    childActive:{
        borderRadius: 20,
    }, 
    childInactive: {
        borderRadius: 20,
    }
}