import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { searchSingleWord } from "../../features/words/wordsSlice";
import { IResult } from "../../type/type";

interface PropTypes {
    result:IResult;
    other:boolean;
    point:number;
    time:number;
    setTime:Function;
    setOther:Function;
    setResult: Function;
    answerEffect:Function;
    setPoint:Function;
}

export const Timer: React.FC<PropTypes> = ({ time, setTime, result, other, setOther, setResult, answerEffect, point , setPoint }) => {
    const dispatch = useAppDispatch();
    const timerId: any = useRef();
    const failAudio = new Audio("./sounds/fail.wav")
    
    useEffect(() => {
        if(result == IResult.FALSE || result == IResult.TRUE || other) {
            setTime(15)
            setOther(false)
        }

        timerId.current = setInterval(() => {
            setTime((prev:number) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId.current);
    }, [time, result]);

    useEffect(() => {
        if (time <= 0) {
            failAudio.play()
            setResult(false);
            answerEffect()
            setPoint(point - 1)
            dispatch(searchSingleWord());
            setTime(15);
        }
    }, [time]);

    return <p>0:{time}</p>;
};
