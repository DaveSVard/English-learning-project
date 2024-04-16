import React, { useEffect, useState } from "react";
import { AnimatedGif } from "../AnimatedGif";
import { IResult } from "../../type/type";

interface PropTypes {
    time:number
    result:IResult;
}

export const AnimatedGifBlock:React.FC<PropTypes> = React.memo(({time, result}) => {
    const [think, setThink] = useState<boolean>(true)
    const [fail, setFail] = useState<boolean>(false)
    const [nice, setNice] = useState<boolean>(false)
    const [limit, setLimit] = useState<boolean>(false)
    
    useEffect(() => {
        const updateStates = async () => {
            if (time === 5) {
                await setThink(false);
                await setLimit(true);
                await new Promise((resolve) => setTimeout(resolve, 5000));
                await setLimit(false);
            } 
            if(time === 0) {
                await setThink(false);
                await setFail(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                await setFail(false);
                await setThink(true);
            }
        };
        updateStates();
    }, [time])

    useEffect(() => {
        const updateStates = async () => {
            if (result === IResult.TRUE) {
                await setThink(false);
                await setNice(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                await setNice(false);
                await setThink(true);
            } else if (result === IResult.FALSE) {
                await setThink(false);
                await setFail(true);
                await new Promise((resolve) => setTimeout(resolve, 3000));
                await setFail(false);
                await setThink(true);
            }
        };
        updateStates();
    }, [result]);

    return(
        <div className="animatedGif">
            <div className="animatedGif__img">
                {think ? (
                    <AnimatedGif src="/gif/thinkFix.gif" alt="Animated Gif"/> 
                ) : fail ? (
                    <AnimatedGif src="/gif/loseFix.gif" alt="Animated Gif"/> 
                ) : nice ? (
                    <AnimatedGif src="/gif/butFix.gif" alt="Animated Gif"/> 
                ) : limit ? (
                    <AnimatedGif src="/gif/timeFix.gif" alt="Animated Gif"/> 
                ) : ( 
                    <></>
                )}
            </div>
        </div>
    )
})