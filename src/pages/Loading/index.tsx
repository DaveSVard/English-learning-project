import { useContext, useEffect, useState } from "react";
import "./loading.scss"
import { MyContext } from "../../MyContext";
import { useNavigate } from "react-router";

export const Loading = () => {

  const { animation, setAnimation } = useContext(MyContext);
  const navigate = useNavigate();

  console.log(animation);
  
  useEffect(() => {
    if (animation) {
      setTimeout(async () => {
        await setAnimation(false);
        sessionStorage.animation = JSON.stringify(false);
        navigate("/seeWords");
      }, 2000);
    }
  }, [animation, navigate, setAnimation]);

  return (
    <div className="animation-box">
      <div className="wrapper">
        <div className="line first-line"></div>
        <div className="line second-line"></div>   
        <div className="line third-line"></div>
        <div className="line fourth-line"></div> 
        <div className="line fifth-line"></div>    
      </div>
      <div className="wrapper">
        <div className="line first-line"></div>
        <div className="line second-line"></div>   
        <div className="line third-line"></div>
        <div className="line fourth-line"></div> 
        <div className="line fifth-line"></div>       
      </div>
    </div>
  );
};
