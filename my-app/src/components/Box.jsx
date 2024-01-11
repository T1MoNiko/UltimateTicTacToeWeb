import React, { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import "../styles/box.scss"
import BigCross from "./BigCross";
import BigCircle from "./BigCircle";

const Box = React.memo((props) => {
    const {player, funcSet, index, funcSetBigCross, funcSetBigCircle, prevBigCircle, prevBigCross, setLastMoveIndex, lastMoveIndex} = props;

    const flag = useRef({
                        win: false,
                        whoWin: null
                     });
    const countOfCross = useRef(0);
    const countOfCircle = useRef(0);
    const [indexOfCross, setIndexOfCross] = useState([]);
    const [indexOfCircle, setIndexOfCircle] = useState([]);
    const update = useRef(true);
    const winningCombination = [[0, 4, 8], [2, 4, 6],
                                [0, 1, 2], [3, 4, 5],
                                [6, 7, 8], [0, 3, 6],
                                [1, 4, 7], [2, 5, 8]]; 

    const ref = useRef(null);

    useEffect(() => {
        if (update.current) {
            update.current = false;
        } else {
            for (let i of winningCombination) {
                for (let j of i) {
                    if (indexOfCross.includes(j)) {
                       countOfCross.current++;
                       if (countOfCross.current === 3) {
                            flag.current = {win: true, whoWin: 'cross'};
                            break;
                       }
                    } else if (indexOfCircle.includes(j)) {
                        countOfCircle.current++;
                        if (countOfCircle.current === 3) {
                            flag.current = {win: true, whoWin: 'circle'};
                            break;
                       }
                    }
                }
                countOfCross.current = 0;
                countOfCircle.current = 0;
            }
        }

        if (flag.current.win) {
            flag.current.whoWin === 'cross' ? funcSetBigCross([...prevBigCross, index]) : funcSetBigCircle([...prevBigCircle, index]);
        }
        //eslint-disable-next-line
    }, [indexOfCross, indexOfCircle]);

    return (
        flag.current.win ? flag.current.whoWin === 'cross' ? <BigCross/> : <BigCircle/> :
            <div className="box-wrapper" ref={ref}>
                {[...new Array(9)].map((_, id) => {
                    return <Cell key={id} 
                                funcSet={funcSet} 
                                player={player} 
                                index={id}
                                funcSetCross={setIndexOfCross} 
                                funcSetCircle={setIndexOfCircle}
                                prevCircle={indexOfCircle}
                                prevCross={indexOfCross}
                                setLastMoveIndex={setLastMoveIndex}
                                boxIndex={index}
                                lastMoveIndex={lastMoveIndex}
                                element={ref.current}
                                prevBigCircle={prevBigCircle}
                                prevBigCross={prevBigCross}
                                />
                })}
            </div>
        )
    }
)

export default Box;