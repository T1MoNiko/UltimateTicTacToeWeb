import React from "react";
import Cell from "./Cell";
import "../styles/box.scss"

const Box = () => {
    return (
        <div className="box-wrapper">
            {[...new Array(9)].map((_, id) => {
                return <Cell key={id}/>
            })}
        </div>
    )
}

export default Box;