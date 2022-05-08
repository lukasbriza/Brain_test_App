import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap, Sine, Power1 } from 'gsap'

import { Waves } from '../Components/SVG/Waves'
import { Brain } from '../Components/SVG/Brain'
import { Button } from '../Components/Button'
import { Input } from '../Components/Input'

import { AppContext } from '../App/Context'
////////////////////////////////////////////////////////////
const Home = () => {
    //STATE//
    const [noc, setNoc] = useState<{ value: any, canSubmit: boolean }>({ value: undefined, canSubmit: false })
    const [messageClass, setMessageClass] = useState<"show" | "hide">("hide")

    const appContext = useContext(AppContext)
    const wavesRef = useRef<SVGSVGElement>(null)
    const brainRef = useRef<SVGSVGElement>(null)
    const textRef = useRef<HTMLParagraphElement>(null)
    const inputWrapper = useRef<HTMLDivElement>(null)

    //VARIBLES//
    let navigate = useNavigate()
    const buttonProps = {
        value: "Start",
        to: "calculations",
        onClick: (e: React.SyntheticEvent) => { handleClick(e) },
    }
    const inputProps = {
        type: "text",
        pattern: new RegExp(/^([2-5][0-9]|5[0-9]|60)$/),
        errorMessage: "Only numbers from 20 up to 60 are allowed.",
        valueCallback: setNoc,
        modificationClasses: "centerBox"
    }
    //HANDLER//
    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (noc.value === undefined || noc.value === "") setMessageClass("show")
        if (noc.canSubmit) {
            appContext!.fn.setNoc(noc.value)
            navigate(buttonProps.to, { replace: false })
        }
    }
    //EFFECTS//
    useEffect(() => {
        if (noc.value !== undefined && noc.value !== "") setMessageClass("hide")
    }, [noc.value])
    useEffect(() => {
        //brain animation
        const path1 = brainRef.current!.children[0]
        const path2 = brainRef.current!.children[1]
        const path3 = brainRef.current!.children[2]
        const path4 = brainRef.current!.children[3].children[0]
        const path5 = brainRef.current!.children[3].children[1]
        const strokeColor = "white"
        if (appContext?.brainAnPlayed != true) {
            let tl = gsap.timeline()
            tl.addLabel("start")
                .to(brainRef.current!.parentNode, {
                    display: "grid",
                })
                .fromTo(path3, {
                    strokeDasharray: "280%",
                    strokeDashoffset: "280%",
                    stroke: strokeColor
                }, {
                    strokeDashoffset: 0,
                    ease: Sine.easeInOut,
                    duration: 3
                }, "start")
                .fromTo(path5, {
                    strokeDasharray: "280%",
                    strokeDashoffset: "280%",
                    stroke: strokeColor
                }, {
                    strokeDashoffset: 0,
                    ease: Sine.easeInOut,
                    delay: 1,
                    duration: 3
                }, "start")
                .fromTo(path4, {
                    strokeDasharray: "240%",
                    strokeDashoffset: "240%",
                    stroke: strokeColor
                }, {
                    strokeDashoffset: 0,
                    ease: Sine.easeInOut,
                    delay: 1,
                    duration: 2
                }, "start")
                .addLabel("2nd", 2.5)
                .fromTo(path2, {
                    strokeDasharray: "240%",
                    strokeDashoffset: "240%",
                    stroke: strokeColor
                }, {
                    strokeDashoffset: 0,
                    ease: Sine.easeInOut,
                    duration: 2
                }, "2nd")
                .fromTo(path1, {
                    strokeDasharray: "240%",
                    strokeDashoffset: "240%",
                    stroke: strokeColor
                }, {
                    strokeDashoffset: 0,
                    ease: Sine.easeInOut,
                    duration: 2
                }, "2nd")
                .addLabel("fill")
                .to(path1, {
                    fill: "#EA596E"
                }, "fill")
                .to(path2, {
                    fill: "#DD2E44"
                }, "fill")
                .to(path3, {
                    fill: "#F4ABBA"
                }, "fill")
                .to(path4, {
                    fill: "#EA596E"
                }, "fill")
                .to(path5, {
                    fill: "#EA596E"
                }, "fill")
                .to([path1, path2, path3, path4, path5], {
                    stroke: "transparent"
                }, "fill")
                .addLabel("showText")
                .to(textRef.current, {
                    opacity: 1,
                    duration: 1,
                    ease: Power1.easeOut
                }, "showText")
                .addLabel("hideAll")
                .to(brainRef.current!.parentNode, {
                    opacity: 0,
                    duration: 0.5,
                    delay: 1,
                    ease: Power1.easeOut
                }, "hideAll")
                .to(brainRef.current!.parentNode, {
                    display: "none",
                    duration: 0.02,
                    ease: "none"
                })
                .addLabel("showLayout")
                .to(wavesRef.current!.children, {
                    display: "initial",
                    duration: 0,
                    ease: "none"
                }, "showLayout")
                .to(wavesRef.current!.children, {
                    opacity: 1,
                    duration: 1,
                    ease: Power1.easeOut,
                    onStart: () => {
                        appContext?.fn.setShowMenu(true)
                        appContext?.fn.setShowIcon(true)

                        let tl2 = gsap.timeline()
                        tl2.to(inputWrapper.current, {
                            display: "grid",
                            ease: "none"
                        })
                            .to(inputWrapper.current, {
                                opacity: 1,
                                duration: 0.5,
                                ease: Power1.easeOut,
                            })
                    },
                    onComplete: () => { appContext?.fn.setBrainAnPlayed(true) }
                })
        } else {
            gsap.set(wavesRef.current!.children, { display: "initial" })
            gsap.set(wavesRef.current!.children, { opacity: 1 })
            gsap.set(inputWrapper.current, { display: "grid" })
            gsap.set(inputWrapper.current, { opacity: 1 })
        }

    }, [appContext?.brainAnPlayed])
    //SETUP//
    return (
        <React.Fragment>

            <section id="home" className="leftTop stretchW stretchH">
                <Waves className="backgroundWaves" ref={wavesRef} />
                <div className="animationWrapper">
                    <p ref={textRef}>Test your brain!</p>
                    <Brain className="animationBrain" ref={brainRef} />
                </div>
                <div className="inputWrapper" ref={inputWrapper}>
                    <h1 id="NoC_header">Number of calculations</h1>
                    <Input {...inputProps} />
                    <Button {...buttonProps} />
                    <p className={`${messageClass}`}>You have to fill number of components first!</p>
                </div>
            </section>
        </React.Fragment>
    )
}
////////////////////////////////////////////////////////////
export { Home }