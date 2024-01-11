import React, { useState } from "react";
import Cross from "./Cross";
import Circle from "./Circle";

const Cell = React.memo((props) => {
    const [state, setState] = useState(3);
    const {player, funcSet, index, funcSetCross, funcSetCircle, prevCircle, prevCross, setLastMoveIndex, boxIndex, lastMoveIndex, element, prevBigCircle, prevBigCross} = props;

    const changeSymbol = (player, setPlayer) => {
        if ((Number(state) !== 1 && Number(state) !== 0 && (boxIndex === lastMoveIndex || lastMoveIndex === null)) || (prevBigCircle.includes(lastMoveIndex) || prevBigCross.includes(lastMoveIndex))) {
            setState(player);
            player ? funcSetCross([...prevCross, index]) : funcSetCircle([...prevCircle, index]);
            setPlayer(!player);
            setLastMoveIndex(index);
        } else if (boxIndex !== lastMoveIndex) {
            element.animate(
                [{
                  background: "rgba(255, 0, 0, 0.3)", 
                  boxShadow: "0px 0px 5px 3px rgba(255, 0, 0, 0.3)",
                }, {
                  background: "rgba(255, 0, 0, 0)", 
                  boxShadow: "0px 0px 5px 15px rgba(255, 0, 0, 0)",
                }],
                {
                    duration: 1000,
                    iteration: 1
                }
            )
        }
    }

    return (
        <div className="cell" onClick={() => changeSymbol(player, funcSet)}>
            {Number(state) === 1 ? <Cross/> : !state ? <Circle/> : null}
        </div>
    );
}
)

export default Cell;