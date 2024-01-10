import Box from "./Box"
import "../styles/playground.scss"

const Playground = () => {
    return (
        <div className="playground-wrapper">
            {[...new Array(9)].map((_, id) => {
                return <Box key={id}/>
            })}
        </div>
    )
}

export default Playground;