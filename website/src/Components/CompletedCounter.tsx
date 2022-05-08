import { useContext } from "react"

import { AppContext } from "../App/Context"

const CompletedCounter = () => {
    //STATE//
    const appContext = useContext(AppContext)

    return (
        <div className="completedCounter_wrapper">
            <p className="cimpletedCounter_text">Finished:&nbsp;</p>
            <p className="cimpletedCounter_score">{appContext!.nocCompleted}/{appContext!.noc}</p>
        </div>
    )
}

export { CompletedCounter }