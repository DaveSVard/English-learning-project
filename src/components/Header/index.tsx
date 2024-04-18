import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "../Sidebar";
import { useAppDispatch } from "../../app/hooks";
import { searchWord } from "../../features/words/wordsSlice";
import { useLocation } from "react-router";
import "./header.scss"

export const Header:React.FC = React.memo(():JSX.Element => {
    
    const searchBtn:any = useRef(null)
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()
    const [toggleBtn, setToggleBtn] = useState<boolean>(false)
    const [isSidebar, setIsSidebar] = useState<boolean>(true)
    const [sidebarRef, setSidebarRef] = useState<HTMLDivElement | null>(null);
    const seeSearch = () => {
        searchBtn.current.classList.toggle("active")   
    }

    const toggleSidebar = () => {
        setIsSidebar(!isSidebar)
        if(sidebarRef) {
            sidebarRef?.classList.toggle("active")
            document.body.classList.toggle("active")
        }
    }

    const toggleSidebarForPhone = () => {
        if(window.innerWidth <= 1200) {
            setIsSidebar(!isSidebar)
            if(sidebarRef) {
                sidebarRef?.classList.toggle("active")
                document.body.classList.toggle("active")
            }
        }
    }


    const handleSidebarRef = (ref:HTMLDivElement | null) => {
        setSidebarRef(ref);
    };

    const darkMode = localStorage.getItem("dark-mode")

    const enableDarkMode = () => {
        setToggleBtn(true)
        document.body.classList.add("dark")
        localStorage.setItem("dark-mode", "enabled")
    }
    
    const disabledDarkMode = () => {
        setToggleBtn(false)
        document.body.classList.remove("dark")
        localStorage.setItem("dark-mode", "disabled")
    }

    useEffect(() => {
        if(darkMode == "enabled") {
            enableDarkMode()
        }
    }, [])
    
    return(
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    {pathname == "/seeWords" && <div ref={searchBtn} className="search__form">
                        <input type="text" placeholder="Search words..." onChange={(e) =>{ 
                            dispatch(searchWord(e.target.value))
                        }}/>
                        <button className="fas fa-search"></button>
                    </div>}
                    <div className="header__icons">
                        <div id="menu-btn" className="fa-solid fa-bars" onClick={() => toggleSidebar()}></div> 
                        <div id="search-btn" className="fa-solid fa-search" onClick={seeSearch}></div>
                        {!toggleBtn ? (
                            <div id="theme-btn" className="fa-solid fa-sun" onClick={() => enableDarkMode()}></div> 
                        ):( 
                            <div id="theme-btn" className="fa-solid fa-moon" onClick={() => disabledDarkMode()}></div>
                        )}
                    </div>
                </div>
            </div>
            <Sidebar onSidebarRef={handleSidebarRef} toggleSidebar={toggleSidebar} isSidebar = {isSidebar} toggleSidebarForPhone = {toggleSidebarForPhone}/>
        </header>
    )
})