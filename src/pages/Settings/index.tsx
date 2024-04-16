import React, { useEffect, useState } from "react";
import TextToSpeech from "../../components/TextToSpeech";
import "./settings.scss";
import { AnimatedGif } from "../../components/AnimatedGif";

export const Settings: React.FC = ():JSX.Element => {
    const [direction, setDirection] = useState<boolean>(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDirection(prevDirection => !prevDirection);
        }, 3700); 
        return () => clearInterval(intervalId);
    }, []);

    
    

    return (
        <div className="settings">
            <div className="settings__title">
                <h1>Settings</h1>
            </div>

            <div className="settings__voiceChange">
                <TextToSpeech />
            </div>

            <div className="settings__bottom">
                {direction ? (
                    <div className="gif-toLeft">
                        <AnimatedGif src="/gif/flyToLeft.gif" alt="Animated Gif" />
                    </div>
                ) : (
                    <div className="gif-toRight">
                        <AnimatedGif src="/gif/flyToRight.gif" alt="Animated Gif" />
                    </div>
                )}
            </div>
        </div>
    );
};

