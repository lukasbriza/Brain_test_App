/* eslint-disable react-hooks/exhaustive-deps */
import { SetStateAction, useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
////////////////////////////////////////////////////////////
interface timerProps {
    stopTimer: boolean;
    callback: React.Dispatch<SetStateAction<number>>;
}
const Timer = ({ stopTimer, callback }: timerProps) => {
    //STATE//
    const [time, setTime] = useState<number>(0)
    //VARIBLES//
    const circleRef = useRef<SVGCircleElement>(null)
    //EFFECTS//
    useEffect(() => {
        let interval: NodeJS.Timeout

        interval = setInterval(() => {
            setTime((time) => time + 1)
        }, 1000)

        if (stopTimer === true) {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }
    }, [stopTimer])

    useEffect(() => {
        gsap.fromTo(circleRef.current, {
            strokeDasharray: "280%",
            strokeDashoffset: "280%",
        }, {
            strokeDashoffset: 0,
            ease: "linear",
            duration: 1,

        })
    }, [time])
    //SETUP//
    return (
        <div className="timer_wrapper">
            <p className="timer_count">
                {
                    time < 60 ?
                        time : time % 60 == 0 ?
                            `${time / 60}:00` : `${Math.floor(time / 60)}:${time - (Math.floor(time / 60) * 60)}`
                }</p>
            <svg
                className="timer_picture"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"

                fill="transparent"
            >
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="black"
                    strokeWidth={6}
                    ref={circleRef}
                />
            </svg>
        </div>
    )
}
export { Timer }