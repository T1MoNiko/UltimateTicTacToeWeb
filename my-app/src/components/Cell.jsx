import React, { useState } from "react";
import Cross from "./Cross";
import Circle from "./Circle";

const Cell = React.memo((props) => {
    const [state, setState] = useState(3);
    const {player, funcSet} = props;

    const changeSymbol = (player, setPlayer) => {
        if (Number(state) !== 1 && Number(state) !== 0) {
            setState(player)
            setPlayer(!player)
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