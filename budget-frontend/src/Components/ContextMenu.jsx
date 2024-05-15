import React from 'react'

const ContextMenu = ({ x, y }) => {
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
    <div style={dynamicStyle} onContextMenu={(e) => handleContextMenu(e)}>
      ContextMenu
    </div>
  )
}

export default ContextMenu
