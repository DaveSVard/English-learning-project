import { useState } from "react";
import "./App.css";
import { MyContext } from "./MyContext";
import { MyRouter } from "./MyRouter/router";
import "./styles/base.scss";

function App() {
  const [text, setText] = useState<string>("");
  const [voice, setVoice] = useState<any>(localStorage.voice ? JSON.parse(localStorage.voice) : null);
  const [pitch, setPitch] = useState<number>(localStorage.pitch ? JSON.parse(localStorage.pitch) : 1);
  const [rate, setRate] = useState<number>(localStorage.rate ? JSON.parse(localStorage.rate) : 1);
  const [volume, setVolume] = useState<number>(localStorage.volume ? JSON.parse(localStorage.volume) : 1);
  const [animation, setAnimation] = useState<boolean>(sessionStorage.animation ? JSON.parse(sessionStorage.animation) : true);

  return (
    <MyContext.Provider value={{text, voice, pitch, rate, volume, setText, setVoice, setPitch, setRate, setVolume, animation, setAnimation}}>
      <MyRouter />
    </MyContext.Provider>
  );
}

export default App;
