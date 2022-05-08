import { useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { gsap, Power2 } from 'gsap'

import { AppContext } from '../App/Context'
import { Brain } from '../Components/SVG/Brain'

import { routes } from '../Config/Routes'

const Menu = () => {
    //VARIABLES//
    let location = useLocation()
    const brainRef = useRef<SVGSVGElement>(null)
    const menuRef = useRef(null)
    const appContext = useContext(AppContext)

    //FUNCTIONS//
    const setTransiitonClass = (path: string) => {
        if (path === appContext?.actualPage) return
        switch (appContext?.actualPage) {
            case "/":
                appContext.fn.setTransitionClass("up")
                break;
            case "/calculations":
                appContext.fn.setTransitionClass("down")
                break;
        }
    }

    const resetState = (path: string) => {
        if (path === "/") {
            setTimeout(() => {
                appContext?.fn.setNoc(0)
                appContext?.fn.setNocCompleted(0)
            }, 1500)
        }
    }
    //EFFECTS//
    useEffect(() => {
        appContext?.fn.setActualPage(location.pathname)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])
    useEffect(() => {
        if (appContext?.showIcon === true) {
            let tl = gsap.timeline()
            tl.addLabel("start")
                .to(brainRef.current!.children[0], {
                    fill: "#EA596E"
                }, "start")
                .to(brainRef.current!.children[1], {
                    fill: "#DD2E44"
                }, "start")
                .to(brainRef.current!.children[2], {
                    fill: "#F4ABBA"
                }, "start")
                .to(brainRef.current!.children[3], {
                    fill: "#EA596E"
                }, "start")
            gsap.fromTo(brainRef.current, {
                opacity: 0,
            }, {
                opacity: 1,
                duration: 1,
                ease: Power2.easeOut
            })
        } else {
            gsap.to(brainRef.current, {
                opacity: 0,
                duration: 1,
                ease: Power2.easeIn
            })
        }
    }, [appContext?.showIcon])
    useEffect(() => {
        if (appContext?.showMenu === true) {
            let tl = gsap.timeline()
            tl.to(menuRef.current, {
                display: "grid",
                duration: 0.02,
                ease: "none"
            }).to(menuRef.current, {
                opacity: 1,
                duration: 1,
                ease: Power2.easeOut
            })
        } else {
            let tl = gsap.timeline()
            tl.to(menuRef.current, {
                opacity: 0,
                duration: 1,
                ease: Power2.easeIn
            }).to(menuRef.current, {
                display: "none",
                duration: 0.02,
                ease: "none"
            })
        }
    }, [appContext?.showMenu])
    //SETUP//
    return (
        <nav id="menu" className="leftTop absolute stretchW" ref={menuRef}>
            <Link to="/">
                <Brain className="appIcon" ref={brainRef} />
            </Link>
            <div className="routeWrapper">
                {routes.map((obj: { name: string, path: string }, index: number) => {
                    return (
                        <Link
                            to={obj.path}
                            key={index}
                            className="link"
                            onMouseEnter={() => { setTransiitonClass(obj.path) }}
                            onTouchStart={() => { setTransiitonClass(obj.path) }}
                            onClick={(e) => { resetState(obj.path) }}
                        >
                            {obj.name}
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export { Menu }