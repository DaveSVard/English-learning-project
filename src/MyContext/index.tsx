import React from "react";

export interface Data {
  text:string;
  voice:any;
  pitch:number;
  rate:number;
  volume:number;
  animation:boolean;
  setAnimation:Function;
  setText:Function;
  setVoice:Function;
  setPitch:Function;
  setRate:Function;
  setVolume:Function;
}

export const MyContext = React.createContext<Data>({} as Data);
