import React from "react"
import "./footer.scss"

export const Footer:React.FC = React.memo(():JSX.Element => {

    return(
        <footer className="footer">
            &copy; copyright @ 2024 by DaveSVard | all rights reserved
        </footer>
    )
})