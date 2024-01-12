import React, { useEffect, useState, useRef, useCallback } from "react"

import Box from "./Box"
import "../styles/playground.scss"

const Playground = () => {
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), [])
    const [botIndex, setBotIndex] = useState(null)
    const botIndex2 = useRef(null);
    const [mode, setMode] = useState(false);
    const playground = useRef(null);
    const [player, setPlayer] = useState(true);
    const [indexOfBigCross, setIndexOfBigCross] = useState([]);
    const [indexOfBigCircle, setIndexOfBigCircle] = useState([]),
          update = useRef(true),
          countOfBigCross = useRef(0),
          countOfBigCircle = useRef(0),
          winningCombination = [[0, 4, 8], [2, 4, 6],
                                [0, 1, 2], [3, 4, 5],
                                [6, 7, 8], [0, 3, 6],
                                [1, 4, 7], [2, 5, 8]];
    const [indexes, setIndexes] = useState([...indexOfBigCircle, ...indexOfBigCross]);
    const [lastMoveIndex, setLastMoveIndex] = useState(null);
    const flag = useRef({
        win: false,
        whoWin: null
        }) 
    
    useEffect(() => {
        (async () => {
            await setIndexes([...indexOfBigCircle, ...indexOfBigCross])
        })()
    }, [indexOfBigCircle, indexOfBigCross])

    useEffect(() => {
        if (update.current) {
            update.current = false;
        } else {
            for (let i of winningCombination) {
                for (let j of i) {
                    if (indexOfBigCross.includes(j)) {
                       countOfBigCross.current++;
                       if (countOfBigCross.current === 3) {
                            flag.current = {win: true, whoWin: 'cross'};
                            break;
                       }
                    } else if (indexOfBigCircle.includes(j)) {
                        countOfBigCircle.current++;
                        if (countOfBigCircle.current === 3) {
                            flag.current = {win: true, whoWin: 'circle'};
                            break;
                       }
                    }
                }
                countOfBigCross.current = 0;
                countOfBigCircle.current = 0;
            }

            if (flag.current.win) {
                forceUpdate();
            }
        }
        //eslint-disable-next-line
    }, [indexOfBigCircle, indexOfBigCross, player])

    const restart = () => {
        flag.current.win = false;
        forceUpdate();
        setIndexOfBigCross(prev => prev.filter(item => item === -1));
        setIndexOfBigCircle(prev => prev.filter(item => item === -1));
        setPlayer(true);
    }

    
    const StartOfGame = () => {
        return (
            <div className="container-for-start">
                <h1 className="mode-title">Выбор режима</h1>
                <button className="mode" onClick={() => setMode('pvp')}>PvP</button>
                <button className="mode" onClick={() => setMode('pvb')}>PvB</button>
            </div>
        )
    }

    const EndOfGame = () => {
        return (
            <div className="container-for-end">
                <h1 className="winner-text">Победа за {flag.current.whoWin === 'cross' ? 'крестиками' : 'ноликами' }</h1>
                <button className="restart" onClick={() => restart()}>Начать заново</button>
            </div>
        )
    }
    
    return (
        !mode ? <StartOfGame/> : 
        flag.current.win ?  <EndOfGame/> :
        <div className="playground-wrapper" ref={playground}>
            {[...new Array(9)].map((_, id) => {
                return <Box key={id} 
                            funcSet={setPlayer} 
                            player={player} 
                            index={id}
                            funcSetBigCross={setIndexOfBigCross} 
                            funcSetBigCircle={setIndexOfBigCircle}
                            prevBigCircle={indexOfBigCircle}
                            prevBigCross={indexOfBigCross}
                            setLastMoveIndex={setLastMoveIndex}
                            lastMoveIndex={lastMoveIndex}
                            botIndex={botIndex}
                            setBotIndex={setBotIndex}
                            botIndex2={botIndex2}
                            playground={playground.current}
                            forceUpdate={forceUpdate}
                            mode={mode}
                            indexes={indexes}
                             />
            })}
        </div>
    )
}


export default Playground;