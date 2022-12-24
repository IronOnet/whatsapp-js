import React, { useEffect, useState } from "react"; 
import { StoryViewProps } from "../utils/interfaceHelper"; 
import '../css/storyView.css';
import ProgressiveImage from "./ProgressiveImage"; 
import ProgressiveImageView from './ProgressiveImageView';

function StoryView(props: StoryViewProps){
    const [refresh, setRefresh ] = useState(true); 

    const image = props.images[props.progressIndex];

    useEffect(() =>{

    }, [props.progressIndex]);

    return (
        <div className="divStory" style={{ justifyContent: "center"}}>
            <ProgressiveImage 
                className="imgStory" 
                alt={"image"}
                style={props.imageStyle} 
                overlaySrc={image} 
                src={image}
            />
        </div>
    );
}

export default StoryView;