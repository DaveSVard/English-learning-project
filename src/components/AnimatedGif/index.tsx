import React from "react";

interface PropTypes {
    src:string;
    alt:string;
}

export const AnimatedGif:React.FC<PropTypes> = ({src, alt}) => {
    return <img src={src} alt={alt} />
}