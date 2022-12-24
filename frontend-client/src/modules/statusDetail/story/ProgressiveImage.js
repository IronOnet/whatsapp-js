import React, { Component, useEffect, useState } from "react"; 

const omit = (obj, omitKey) =>{
    Object.keys(obj).reduce((result, key) =>{
        if(key !== omitKey){
            result[key] = obj[key];
        }
        return result;
    }, {});

}

const overlayStyles = {
    position: "absolute", 
    filter: "blur(1px)", 
    transition: "opacity ease-in 100ms", 
    clipPath: "inset(0)",
}; 

export default class ProgressViewImage extends Component{
    constructor(props){
        super(props);
        this.state = { highResImageLoaded: false};
    }

    render(){
        const { overlaySrc } = this.props;
        const { highResImageLoaded } = this.state;
        let filteredProps = omit(this.props, "overlaySrc");
        
        return(
            <span>
                <img
                    {...filteredProps} 
                    onLoad={
                        () =>{
                            this.setState({ highResImageLoaded: true});
                        }
                    }
                    ref={(img) =>{
                        this.highResImage = img;
                    }}
                    src={this.props.src}
                    alt=""
                />
                <img 
                    {...filteredProps}
                    className={`${this.props.className} ${overlayStyles}`}
                    {...(highResImageLoaded && { style: { opacity: "0"}})} 
                    src={overlaySrc} 
                    alt=""
                />
            </span>
        );
    }
}