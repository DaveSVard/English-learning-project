import React, { useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import "./sidebar.scss"

interface PropTypes {
    onSidebarRef: (ref:HTMLDivElement | null) => void;
    toggleSidebarForPhone:Function;
    toggleSidebar:Function;
    isSidebar:boolean;
}

export const Sidebar:React.FC<PropTypes> = React.memo(({onSidebarRef, toggleSidebar, isSidebar, toggleSidebarForPhone}):JSX.Element => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        onSidebarRef(sidebarRef.current);
    }, [onSidebarRef]);
    
    return(
        <div ref={sidebarRef} className="sidebar">

            <div className="close-sidebar" onClick={() => toggleSidebar()}>
                <i className="fa-solid fa-times"></i>
            </div>

            <div className="sidebar__logo">
                <i className="fa-solid fa-graduation-cap logo"></i>
                <p>Learn English</p>
            </div>
            
            <nav className="navbar">
                <NavLink to={"/seeWords"} onClick={() => toggleSidebarForPhone()}><i className="fa-solid fa-home"></i><span>See words</span></NavLink>
                <NavLink to={"./addWord"} onClick={() => toggleSidebarForPhone()}><i className="fa-solid fa-plus"></i><span>Add word</span></NavLink>
                <NavLink to={"./checkYourself"} onClick={() => toggleSidebarForPhone()}><i className="fa-solid fa-flag-checkered"></i><span>Check yourself</span></NavLink>
                <NavLink to={"./answersHistory"} onClick={() => toggleSidebarForPhone()}><i className="fa-solid fa-file-lines"></i><span>Answers history</span></NavLink>
                <NavLink to={"./settings"} onClick={() => toggleSidebarForPhone()}><i className="fa-solid fa-gear"></i><span>Settings</span></NavLink>
            </nav>
        </div>
    )
})