import { CSSProperties, FunctionComponent, FunctionComponentElement } from "react"; 

export interface CommonProps{
    images?: Array<string>, 
    duration?: number | undefined, 
    style?: CSSProperties, 
    imageStyle?: CSSProperties, 
    enableProgress?: boolean | undefined, 
}

export interface BarStyleProps{
    barActiveColor?: string, 
    barInactiveColor?: string, 
    barHeight?: number, 
    barWidth?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100
}

export interface StoryContainerProps extends CommonProps{
    images: Array<string>, 
    visitble?: boolean | undefined, 
    duration?: number | undefined, 
    barStyle?: BarStyleProps | undefined, 
    onChange: Function, 
    headerComponent?: FunctionComponentElement<CommonProps> | undefined , 
    useProfile?: UserProps | undefined, 

    replyViews?: ReplyProps | undefined, 
    footerComponent?: FunctionComponentElement<CommonProps> | undefined 

    onReplyTextChange?: Function | undefined, 
    onReplyButtonClick?: Function | undefined, 
}

export interface ProgressViewProps extends CommonProps{
    images: Array<string>, 
    onChange: Function, 
    progressIndex: number, 
    barStyle?: BarStyleProps | undefined, 
}

export interface ProgressItemProps extends CommonProps{
    size: number, 
    barStyle?: BarStyleProps | undefined, 
    progressIndex: number, 
    currentIndex: number, 
    onChangePosition: Function,
}

export interface StoryViewProps extends CommonProps{
    images: Array<string>, 
    progressIndex: number, 
    onImageLoad?: Function, 

}

export interface ArrowViewProps extends CommonProps{
    onArrowClick: Function, 
}

export interface ReplyFooterProps{
    messageList?: [String] | undefined, 
    progressIndex: number, 
    onReplyTextChange?: Function | undefined, 
    onReplyButtonClick?: Function | undefined, 
    onInputFocus?: Function | undefined, 
}

export interface UserProps{
    userImage?: string | undefined, 
    userName?: string | undefined, 
    userMessage?: string | undefined, 
    imageArrow?: string | undefined, 
    onImageClick?: Function | undefined
}

export interface ReplyProps{
    messageList?: [String] | undefined, 
    isShowReply: boolean | undefined, 
    onReplyTextChange: Function | undefined, 
    onReplyButtonClick: Function | undefined, 
}