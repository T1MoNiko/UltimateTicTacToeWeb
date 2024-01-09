import React, { useState } from "react";
import Cross from "./Cross";
import Circle from "./Circle";

const Cell = React.memo(() => {
    const [state, setState] = useState(0);

    return (
        <div className="cell" onClick={() => setState(2)}>
            {state === 1 ? <Cross/> : null}
            {state === 2 ? <Circle/> : null}
        </div>
    );
}
)

export default Cell;