import React, { useEffect, useState } from "react"
import { IResult, Words } from "../../type/type"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { searchSingleWord, selectWords } from "../../features/words/wordsSlice"
import { Formik } from "formik"
import confetti from "canvas-confetti"
import { Timer } from "../../components/Timer"
import "./checkYourself.scss"
import { addAnswer, addNewAnswersHistory, selectAnswers } from "../../features/answers/answersSlice"
import { AnimatedGifBlock } from "../../components/AnimatedGifBlock"

export const CheckYourself:React.FC = () => {
    const [choice, setChoice] = useState<Words>()
    const [start, setStart] = useState<boolean>(false)
    const [result, setResult] = useState<IResult>(IResult.NEUTRAL)
    const [other, setOther] = useState<boolean>(false)
    const [point, setPoint] = useState<number>(0)
    const [time, setTime] = useState<number>(15)
    const dispatch = useAppDispatch()
    const {word} = useAppSelector(selectWords)
    const {answers} = useAppSelector(selectAnswers)
    const winAudio = new Audio("./sounds/win.wav")
    const failAudio = new Audio("./sounds/fail.wav")

    useEffect(() => {
        if(point == 10) {
            setPoint(0)
            winAudio.play()
        }
    }, [point])

    const getSingleWord = () => {
        const newAnswersHistoryId = answers.length 
        console.log("newAnswersHistoryId ===>1", newAnswersHistoryId);
        
        dispatch(searchSingleWord())
        dispatch(addNewAnswersHistory({id: newAnswersHistoryId, score: 0, answers: []}))
        setStart(true)
    }
    
    const trueAnswer = () => {
        const trueAudio = new Audio("./sounds/true.wav")
        setPoint(point + 1)
        confetti()
        dispatch(searchSingleWord())
        trueAudio.play()
    }

    const pickOther = () => {
        setPoint(point - 1)
        dispatch(searchSingleWord())
    }

    const answerEffect = () => {
        setTimeout(() => {
            if(result == IResult.TRUE) {
                setResult(IResult.FALSE)
            } else if (result == IResult.FALSE) {
                setResult(IResult.TRUE)
            } 
            setResult(IResult.NEUTRAL)
        }, 2000)
    }
    
    return(
        <div className="check">
            <div className="check__wrapper">
                <div className="check__title">
                    <h1>Check Yourself!</h1>
                </div>

                
                <div className="check__inner-wrapper">
                    <div className="check__test-wrapper">
                        <div className="check__choices">
                            {!start ? <div className="check__choices-inps">
                                <input type="radio" name="choice" id="english" onChange={() => setChoice(Words.ENGLISH)}/>
                                <label htmlFor="english" className="englishLabel">English</label>
                                <input type="radio" name="choice" id="armenian" onChange={() => setChoice(Words.ARMENIAN)}/>
                                <label htmlFor="armenian" className="armenianLabel">Armenian</label>
                            </div> : <></>}
                            <div className="check__choices-btns">
                                <button onClick={() => getSingleWord()} className="accept-btn">Start</button>
                                {start && <button onClick={() => { 
                                    setStart(false)
                                    setPoint(0)
                                }} className="red-btn">Stop</button>}
                            </div>
                        </div>
                        {start && <div className="result-bar">
                            <p>{point}/10</p>
                            <Timer 
                                result={result} 
                                setResult={setResult} 
                                answerEffect={answerEffect} 
                                other={other} 
                                setOther={setOther} 
                                point={point} 
                                setPoint={setPoint}
                                time={time}
                                setTime={setTime}
                            />
                        </div>}
                        {start && <div className="check__question" style={result == IResult.TRUE ? {filter: "drop-shadow(0 0 3px yellowGreen)"} : result == IResult.FALSE ? {filter: "drop-shadow(0 0 3px red)"} : {}}>
                            <div className="check__question-top">
                                <p>{start && choice == Words.ENGLISH ? word.english : start && choice == Words.ARMENIAN ? word.translate : ""}</p>
                                <i className="fa-solid fa-angle-down"></i>
                            </div>
                            <div className="check__question-center">
                                <Formik initialValues={{answer: ""}}
                                    onSubmit={(values, { setErrors, resetForm }) => {
                                        const newAnswersHistoryId = answers.length - 1
                                        console.log("newAnswersHistoryId ===>2", newAnswersHistoryId);
                                        const userAnswer = values.answer.toLowerCase(); 
                                        const correctAnswer = choice === Words.ENGLISH ? word.translate.toLowerCase() : word.english.toLowerCase();
                                        if (choice === Words.ENGLISH && (correctAnswer === userAnswer)) {
                                            dispatch(addAnswer({id: newAnswersHistoryId, answer: {id: Date.now(), answer: userAnswer, rightAnswer: word.translate, result: true}}))
                                            setResult(IResult.TRUE);
                                            trueAnswer();
                                            answerEffect();
                                            resetForm();
                                        } else if (choice === Words.ARMENIAN && (correctAnswer === userAnswer)) {
                                            dispatch(addAnswer({id: newAnswersHistoryId, answer: {id: Date.now(), answer: userAnswer, rightAnswer: word.english, result: true}}))
                                            setResult(IResult.TRUE);
                                            trueAnswer();
                                            answerEffect();
                                            resetForm();
                                        } else {
                                            if(choice === Words.ARMENIAN) {
                                                dispatch(addAnswer({id: newAnswersHistoryId, answer: {id: Date.now(), answer: userAnswer, rightAnswer: word.english, result: false}}))
                                            } else if (choice === Words.ENGLISH) {
                                                dispatch(addAnswer({id: newAnswersHistoryId, answer: {id: Date.now(), answer: userAnswer, rightAnswer: word.translate, result: false}}))
                                            }
                                            dispatch(searchSingleWord())
                                            setResult(IResult.FALSE);
                                            setErrors({ answer: "Wrong answer" });
                                            answerEffect();
                                            failAudio.play();
                                        }
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleSubmit,
                                    }) => (
                                        <form className="check__question-form" onSubmit={handleSubmit} >
                                            <div className="check__question-answer" >
                                                <input 
                                                    name="answer"  
                                                    value={values.answer || ""} 
                                                    onChange={handleChange}
                                                />
                                                <span className={values.answer ? "labelline span" : "labelline" }>
                                                    {errors.answer && touched.answer ? errors.answer : "Write answer"}
                                                </span>
                                            </div>
                                            <div className="check__question-bottom">
                                                <button className="accept-btn" type="submit">Check</button>
                                                <button className="red-btn" type="button" onClick={pickOther}>Other</button>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>}
                    </div>
                    <div className="animated-box">
                        <AnimatedGifBlock time={time} result={result}/>
                    </div>
                </div>
            </div>
        </div>
    )
}