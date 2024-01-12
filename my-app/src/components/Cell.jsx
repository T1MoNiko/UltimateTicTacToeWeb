import React, { useEffect, useRef, useState } from "react";
import Cross from "./Cross";
import Circle from "./Circle";

const Cell = React.memo((props) => {
    const [state, setState] = useState(3);
    const update = useRef(false);
    const {player, funcSet, index, funcSetCross, funcSetCircle, prevCircle, prevCross, setLastMoveIndex, boxIndex, lastMoveIndex, prevBigCircle, prevBigCross, botIndex, setBotIndex, botIndex2, playground, mode, indexes, forceUpdate} = props;

    useEffect(() => {
        const funcAsync = async () => {
         if (mode === 'pvb') {
            if (indexes.includes(lastMoveIndex)) {
                    const mass = [0, 1, 2, 3, 4, 5, 6, 7, 8];

                    const newMass = mass.filter(item => !indexes.includes(item))

                    console.log(newMass)

                    await setLastMoveIndex(Math.floor(Math.random() * newMass.length))
                    await setBotIndex(Math.floor(Math.random() * 9))
                    const func = async () => {
                        if ((Number(state) !== 1 && Number(state) !== 0 && lastMoveIndex === boxIndex && index === botIndex) ) {
                            setState(false);
                            player ? funcSetCross([...prevCross, index]) : funcSetCircle([...prevCircle, index]);
                            funcSet(!player);
                            setLastMoveIndex(index)
                            console.log(botIndex);
    
                        } else if ((index === botIndex && boxIndex === lastMoveIndex)) {
                            let prev = botIndex
                
                            console.log(botIndex)
                
                            await setBotIndex(Math.floor(Math.random() * 9))
                            if (prev === botIndex) {
                                await setBotIndex(Math.floor(Math.random() * 9))
                            }
                            update.current = true
                        }
                    }
                    await func()
                        
                    
            } else if ((index === botIndex && boxIndex === lastMoveIndex) && (Number(state) !== 1 && Number(state) !== 0) ) {
                setState(false);
                player ? funcSetCross([...prevCross, index]) : funcSetCircle([...prevCircle, index]);
                funcSet(!player);
                setLastMoveIndex(index);
                console.log(botIndex)
            } else if ((index === botIndex && boxIndex === lastMoveIndex)) {
                let prev = botIndex
    
                console.log(botIndex)
    
                await setBotIndex(Math.floor(Math.random() * 9))
                if (prev === botIndex) {
                    await setBotIndex(Math.floor(Math.random() * 9))
                }
            }
        }
    }

    funcAsync()
    //eslint-disable-next-line
    }, [botIndex, botIndex2.current, state])
    


    const changeSymbol = (player, setPlayer) => {
        if ((Number(state) !== 1 && Number(state) !== 0 && (boxIndex === lastMoveIndex || lastMoveIndex === null)) || (prevBigCircle.includes(lastMoveIndex) || prevBigCross.includes(lastMoveIndex))) {
            setState(player);
            player ? funcSetCross([...prevCross, index]) : funcSetCircle([...prevCircle, index]);
            setPlayer(!player);
            setLastMoveIndex(index);
        } else if (boxIndex !== lastMoveIndex) {
            playground.childNodes[boxIndex].animate(
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
            playground.childNodes[lastMoveIndex].animate(
                [{
                  background: "rgba(0, 128, 0, 0.3)", 
                  boxShadow: "0px 0px 5px 3px rgba(0, 128, 0, 0.3)",
                }, {
                  background: "rgba(0, 128, 0, 0)", 
                  boxShadow: "0px 0px 5px 15px rgba(0, 128, 0, 0)",
                }],
                {
                    duration: 1000,
                    iteration: 1
                }
            )
        }
        if (((boxIndex === lastMoveIndex) || lastMoveIndex === null) && mode === "pvb") {
            setBotIndex(() => Math.floor(Math.random() * 9))
            botIndex2.current = Math.floor(Math.random() * 9)
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