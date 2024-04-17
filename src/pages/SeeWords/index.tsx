import React, { useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteWord, selectWords } from "../../features/words/wordsSlice";
import "./seeWords.scss"
import { MyContext } from "../../MyContext";
import { AnimatedGif } from "../../components/AnimatedGif";

export const SeeWords:React.FC = ():JSX.Element => {
    const {text, voice, pitch, rate, volume, setVoice, setText} = useContext(MyContext)
    const {words} = useAppSelector(selectWords)
    const dispatch = useAppDispatch()

    const [expandedWordId, setExpandedWordId] = useState<number | null>(null);
    const toggleWordDetails = (id: number) => {
        setExpandedWordId(id == expandedWordId ? null : id);
    };

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isPaused, setIsPaused] = useState<boolean>(false);


    const [isPlayingSentence, setIsPlayingSentence] = useState<boolean>(false)
    const [isPausedSentence, setIsPausedSentence] = useState<boolean>(false);
    const [utterance, setUtterance] = useState<any>(null);

    console.log("isPlayingSentence =>", isPlayingSentence);
    console.log("isPausedSentence =>", isPausedSentence);
    

    useEffect(() => {
        const synth = window.speechSynthesis;
        const u = new SpeechSynthesisUtterance();
        setUtterance(u);

        synth.addEventListener("voiceschanged", () => {
            const voices = window.speechSynthesis.getVoices();
            setVoice(voices.find((v) => v.name === voice))
        });
    
        return () => {
            console.log(5);
            
            synth.cancel();
            synth.removeEventListener("voiceschanged", () => {
                setVoice(null);
            });
        };
    }, []);

    useEffect(() => {
        if (utterance && text) {
            utterance.text = text;
        }
    }, [text, utterance]);

    const handlePlay = async (texts:string[], bool:boolean) => {
        const synth = window.speechSynthesis;
        if(isPaused || isPausedSentence) {
            synth.resume()
        } else {
            if(bool) {
                setIsPlayingSentence(true)
            } 

            for (let i = 0; i < texts.length; i++) {
                await new Promise<void>((resolve) => {
                    const utterance = new SpeechSynthesisUtterance(texts[i]);
                    utterance.voice = voice;
                    utterance.pitch = pitch;
                    utterance.rate = rate;
                    utterance.volume = volume;
                    synth.speak(utterance);
                    utterance.onend = () => resolve();
                });
            }
        }

        
        if(bool) {
            setIsPausedSentence(false)
        } 
    };

    const handlePause = (bool:boolean) => {
        const synth = window.speechSynthesis;
        if(bool) {
            setIsPausedSentence(true)
        } 
        synth.pause();
    };
    
    const handleStop = (bool:boolean) => {
        const synth = window.speechSynthesis;
        if(bool) {
            setIsPausedSentence(false)
            setIsPlayingSentence(false)
        } 
        synth.cancel();
    };
    
    return(
        <div className="seeWords">
            <div className="seeWords__title">
                <h1>Words!</h1>
            </div>
            <div className="seeWords__content-wrapper">
                <div className="seeWords__content">
                    {words.map(elm => {
                        return(
                            <div key={elm.id} className="seeWords__item">
                                <div>
                                    <div className="seeWords__item-top" >
                                        <p>{elm.english}</p>     
                                        <div className="seeWords__item-icons">
                                            <button
                                                className="voice-btn"
                                                onClick={() => {
                                                    handlePlay([elm.english, elm.translate], false)
                                                    setExpandedWordId(elm.id)
                                                }}
                                            >
                                                <i className="fa-solid fa-volume-high"></i>
                                            </button>
                                            <i className={`fa-solid fa-angle-${expandedWordId == elm.id ? "up" : "down"}`} onClick={() => toggleWordDetails(elm.id)}/>
                                        </div>
                                    </div>
                                </div>
                                {expandedWordId == elm.id ? (
                                    <div className="seeWord__item-bottom">
                                        <p>{elm.translate}</p>  
                                        <div className="seeWord__sentences">
                                            <div className="seeWord__sentences-items">
                                                <p className="center">Sentences</p>
                                                {elm.sentences?.map((sentence, i) => {
                                                    return(
                                                        <p key={i}>{`${++i}) ${sentence}`}</p>
                                                    )
                                                })}
                                            </div>
                                            <div className="seeWords__item-icons2">
                                                {!isPlayingSentence ? (
                                                    <button
                                                        className="voice-btn"
                                                        onClick={() => {
                                                            handlePlay([...elm.sentences], true)
                                                            setExpandedWordId(elm.id)
                                                        }}
                                                    >
                                                        <i className="fa-solid fa-volume-high"></i>
                                                    </button>
                                                ) : (
                                                    <>
                                                        {isPlayingSentence && expandedWordId == elm.id ? (
                                                            <button
                                                                className="voice-btn"
                                                                onClick={() => handleStop(true)}
                                                            >
                                                                <i className="fa-solid fa-volume-xmark"></i>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="voice-btn"
                                                                onClick={() =>
                                                                    handlePlay([...elm.sentences], true)
                                                                }
                                                            >
                                                                <i className="fa-solid fa-volume-high"></i>
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                                {isPlayingSentence && (
                                                    <>
                                                        {isPausedSentence ? (
                                                            <i className="fa-solid fa-circle-play voice-btn" onClick={() => handlePlay([...elm.sentences], true)}></i>
                                                        ) : (  
                                                            <i className="fa-solid fa-circle-pause voice-btn" onClick={() => handlePause(true)}></i>  
                                                        )}
                                                    </>
                                                )}
                                                <i className="fa-solid fa-trash word-delete-btn" onClick={() => dispatch(deleteWord(elm.id))}></i>
                                            </div>
                                        </div>
                                    </div>
                                ) : <></>}
                            </div>
                        )
                    })}
                </div>
                <div className="animatedGif__box">
                    <div className="animatedGif__box-img">
                        <AnimatedGif src="/gif/niceFix.gif" alt="Animated Gif"/>
                    </div>
                    <div className="animated__box-content">
                        <p>You added {words.length} words</p>
                        <p>Here you can add any words and test your knowledge</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 