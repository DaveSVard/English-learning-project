import React, { useState, useEffect, useContext, useRef } from "react";
import { MyContext } from "../../MyContext";
import "./textToSpeech.scss"

const TextToSpeech = () => {
  const {text, voice, pitch, rate, volume, setVoice, setVolume, setPitch, setRate, setText} = useContext(MyContext)
  const [utterance, setUtterance] = useState<any>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    synth.addEventListener("voiceschanged", () => {
      const voices = synth.getVoices();
      setVoice(voices[0]);
    });

    return () => {
      synth.cancel();
      synth.removeEventListener("voiceschanged", () => {
        setVoice(null);
      });
    };
  }, [text]);

  const handleVoiceChange = (voiceName:string) => {
    const voices = window.speechSynthesis.getVoices();
    voices.find((v) => {
        if(v.name === voiceName) {
            localStorage.voice = JSON.stringify(v.name)
            setVoice(v)
        }
    })
  };

  const handlePitchChange = (event:any) => {
    setPitch(parseFloat(event.target.value));
    localStorage.pitch = JSON.stringify(event.target.value)
  };


  const handleRateChange = (event:any) => {
    setRate(parseFloat(event.target.value));
    localStorage.rate = JSON.stringify(event.target.value)
  };

  const handleVolumeChange = (event:any) => {
    setVolume(parseFloat(event.target.value));
    localStorage.volume = JSON.stringify(event.target.value)
  };

  const dropdownInput:any = useRef(null)
  const [dropdownOptions, setDropdownOptions] = useState<boolean>(false)

  const show = (name:string) => {
    dropdownInput.current.value = name;
    handleVoiceChange(name)
  }

  return (
    <div className="speech">
      <div className="range">
        <p>Pitch</p>
        <input type="range" min="0.5" max="2" value={pitch} step="0.1" onChange={handlePitchChange}/>
        <span>{pitch}</span>
      </div>
      <div className="range">
        <p>Rate</p>
        <input type="range" min="0.5" max="2" value={rate} step="0.1" onChange={handleRateChange}/>
        <span>{rate}</span>
      </div>
      <div className="range">
        <p>Volume</p>
        <input type="range" min="0.5" max="2" value={volume} step="0.1" onChange={handleVolumeChange}/>
        <span>{volume}</span>
      </div>
      <div className={dropdownOptions ? "dropdown dropdown-active" : "dropdown"} onClick={() => setDropdownOptions(!dropdownOptions)}>
        <input ref={dropdownInput} type="text" className="dropdown__input" placeholder="Select voice" readOnly/>
        <div className="dropdown__options">
          {window.speechSynthesis.getVoices().map((voice) => (
              <div key={voice.name} className="dropdown__options-item" onClick={() => show(voice.name)}>
              {voice.name}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;
