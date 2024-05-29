import React from 'react'

const ContextMenu = ({ x, y, innerRef }) => {
    const dynamicStyle = {
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "red",
        color: "white",
        padding: "20px"
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };


  return (
    <div style={dynamicStyle} onContextMenu={(e) => handleContextMenu(e)} ref={innerRef}>
      Delete
    </div>
  )
}

export default ContextMenu
