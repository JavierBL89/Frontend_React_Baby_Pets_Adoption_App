import React from "react";


/***
 * Component to represent a pargraph HTML elemnt
 */
const TextComponent = ({ onClick, text, id, className, tagName: Tag = 'p' }) => {

    return (
        <Tag id={id} onClick={onClick} className={className}> {text} </Tag>
    )

};


export default TextComponent;