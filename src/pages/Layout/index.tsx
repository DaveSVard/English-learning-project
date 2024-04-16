import React, { useContext } from "react";
import { Outlet } from "react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MyContext } from "../../MyContext";

export const Layout:React.FC = ():JSX.Element => {
    const {animation} = useContext(MyContext)

    if (animation) {
        document.body.classList.add("animation");
    } else {
        document.body.classList.remove("animation");
    }
        
    return(
        <div>
            {!animation ? <Header /> : <></>}
             <Outlet/>

             
            {/* <Footer/> */}
        </div>
    )
}