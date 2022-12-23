import React, { FunctionComponent } from "react"; 
import '../components/css/arrowNavigator.css'; 
import { ArrowViewProps } from "../utils/interfaceHelper"; 

const ArrowNavigator: FunctionComponent<ArrowViewProps> = (props) =>{
    return (
        <div className="parentArrow">
            <div onClick={()=>{
                props.onArrowClick('left')
            }}
                className='circleDiv'>
                    <img className='imgLeftStyle' src={process.env.PUBLIC_URL + '/images/arrow-left.svg'}/>
            </div>
            <div onClick={() =>{
                props.onArrowClick('right')
            }}
                className='circleDiv'>
                    <img className='imgRightStyle' src={process.env.PUBLIC_URL + '/images/arrow-right.svg'}/>
                </div>
        </div>
    );
}

export default ArrowNavigator;