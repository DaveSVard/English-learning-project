import React, { useEffect, useState } from "react"
import "./answersHistory.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { clearAnswersById, clearAnswersHisory, selectAnswers } from "../../features/answers/answersSlice"
import { AnimatedGif } from "../../components/AnimatedGif"

export const AnswersHistory:React.FC = ():JSX.Element => {
    const dispatch = useAppDispatch()
    const {answers} = useAppSelector(selectAnswers)
    const [sad, setSad] = useState<boolean>(false)
    const [happy, setHappy] = useState<boolean>(false)

    const [expandedHistoryId, setExpandedHistoryId] = useState<number | null>(null);
    const toggleHistoryDetails = (id:number, score:number, answersCount:number) => {
        setExpandedHistoryId(id == expandedHistoryId ? null : id);
        if(score >= Math.ceil(answersCount / 2)) {
            setHappy(true)
            setSad(false)
        } else if (score <= Math.ceil(answersCount / 2)) {
            setSad(true)
            setHappy(false)
        }
    };

    useEffect(() => {
        if(expandedHistoryId == null) {
            setSad(false)
            setHappy(false)
        }
    }, [expandedHistoryId])

    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [show, setShow] = useState<boolean>(false)

    // const getRandomPosition = () => {
    //     const randomX = Math.floor(Math.random() * window.innerWidth)
    //     const randomY = Math.floor(Math.random() * window.innerHeight)
    //     setPosition({ x: randomX, y: randomY })
    // }

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         setShow(true)
    //         getRandomPosition()
    //         setTimeout(() => {
    //             setShow(false)
    //         }, 5000)
    //     }, 7000)

    //     return () => clearInterval(intervalId)
    // }, [])
    

    return(
        <div className="history">
            <div className="history__wrapper">
                <div className="history__title">
                    <h1>Answers History!</h1>
                </div>

                <div className="history__inner-wrapper">
                    <div className="history__content">
                        {answers.length ? ( 
                            <div className="history__clear" onClick={() => dispatch(clearAnswersHisory())}>
                                Clear history...
                            </div> 
                        ) : ( 
                            <></>
                        )}
                        {answers.map((elm, i) => {
                            return(
                                <div className="history__content-item__wrapper">
                                    {elm.score ? <div key={i} className="history__content-item__top" onClick={() => toggleHistoryDetails(i, elm.score, elm.answers.length)}>
                                        <div className="history__info">
                                            <p>{`${++i})`}</p>
                                            <p>Score: {elm.score}</p>
                                            <i className="fa-solid fa-trash word-delete-btn" onClick={() => dispatch(clearAnswersById(elm.id))}></i>
                                        </div>
                                        <i className={`fa-solid fa-angle-${expandedHistoryId == i ? "up" : "down"}`}/>
                                    </div> : <></>}
                                    {expandedHistoryId ==  i ? <div className="history__content-item__bottom">
                                        {elm.answers.map((answer, i) => {
                                            return(
                                                <div key={i} className="answers__history-item" style={answer.result ? {border: "2px solid green"} : {border: "2px solid #dc4545"}}>
                                                    <p><span>Your answer:</span> {answer.answer}</p>
                                                    <p><span>Right answer:</span> {answer.rightAnswer}</p>
                                                </div>
                                            )
                                        })}
                                    </div> : <></>}
                                </div>
                            )
                        })}
                    </div>
                    <div className="animatedGif__box">
                        <div className="animatedGif__box-img">
                            {sad ? <AnimatedGif src="/gif/sadFix.gif" alt="Animated Gif"/> : happy ? <AnimatedGif src="/gif/happyFix.gif" alt="Animated Gif"/> : <AnimatedGif src="/gif/thinkFix.gif" alt="Animated Gif"/>}
                        </div>
                        <div className="animated__box-content">
                            <p>Here you can see your tests history</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* {show && <div className="random" style={{ position: 'absolute', left: position.x, top: position.y }}>
                <AnimatedGif src="/gif/booFix.gif" alt="Animated Gif"/>
            </div>} */} {/*booo*/}
        </div>
    )
}