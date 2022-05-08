import React, { useState, useEffect, useContext } from 'react'
import { gsap, Power2 } from 'gsap'
import { Link } from 'react-router-dom'
import { AppContext } from '../App/Context'

import { CalculationUnit } from '../Components/CalculationUnit'
import { CompletedCounter } from '../Components/CompletedCounter'
import { Button } from '../Components/Button'

import { Timer } from '../Components/Timer'

////////////////////////////////////////////////////////////
const Calculations = () => {
    //STATE//
    const [calcUnits, setCalcUnits] = useState<JSX.Element[]>([])
    const [stopTimer, setStopTimer] = useState<boolean>(false)
    const [elapsedTime, setElapsedTime] = useState<number>(0)

    const appContext = useContext(AppContext)
    //FUNCTIONS//
    const getCalculationUnits = (num: number) => {
        let arr = []
        for (let i = 0; i < num; i++) {
            let component = <CalculationUnit timePassed={stopTimer} key={i} />
            arr.push(component)
        }
        return arr
    }

    const resetState = () => {
        setTimeout(() => {
            appContext?.fn.setNoc(0)
            appContext?.fn.setNocCompleted(0)
            setStopTimer(false)
        }, 1500)
    }
    //VARIABLES//
    const timerProps = {
        stopTimer: stopTimer,
        callback: setElapsedTime
    }

    //EFFECTS//
    //stop stopwatch on completition
    useEffect(() => {
        if (Number(appContext!.noc) === Number(appContext!.nocCompleted)) {
            setStopTimer(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appContext!.nocCompleted])
    //generate component array
    useEffect(() => {
        if (appContext!.noc !== 0 && appContext!.noc !== undefined) {
            let unitArray = getCalculationUnits(appContext!.noc)
            setCalcUnits(unitArray)
            setTimeout(() => {
                gsap.to(".unit", {
                    opacity: 1,
                    stagger: 0.1,
                    ease: Power2.easeOut
                })
            }, 200)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appContext!.noc])

    //SETUP//
    return (
        <div id="calculations" className="relative stretchW stretchH">
            {appContext?.noc === 0 ?
                (
                    <div className="unsetNoc">Nejdříve je potřeba zadat počet
                        <Link
                            to="/"
                            onMouseEnter={() => { appContext.fn.setTransitionClass("down") }}
                            onTouchStart={() => { appContext.fn.setTransitionClass("down") }}
                        >příkladů</Link>.
                    </div>
                ) : (
                    <React.Fragment>
                        <section className="noc_wrapper">
                            {calcUnits}
                        </section>

                        <section className="summary_wrapper">
                            {appContext!.nocCompleted == appContext!.noc ?
                                <Button
                                    to="/"
                                    modificationClasses="calculations_button"
                                    value="back"
                                    onClick={() => { resetState() }}
                                />
                                : null
                            }
                            <CompletedCounter />
                            <Timer {...timerProps} />
                        </section>
                    </React.Fragment>
                )

            }
        </div>
    )
}
////////////////////////////////////////////////////////////
export { Calculations }