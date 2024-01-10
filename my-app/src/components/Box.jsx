import React from "react";
import Cell from "./Cell";
import "../styles/box.scss"

const Box = (props) => {
    const {player, funcSet} = props;

    return (
        <div className="box-wrapper">
            {[...new Array(9)].map((_, id) => {
                return <Cell key={id} funcSet={funcSet} player={player}/>
            })}
        </div>
    )
}

export default Box;