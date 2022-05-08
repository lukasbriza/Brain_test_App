import { Link } from 'react-router-dom'
import { useContext, useRef } from 'react'

import { AppContext } from '../App/Context'
////////////////////////////////////////////////////////////
interface buttonProps {
    value?: string;
    modificationClasses?: string;
    to: string;
    onClick: any
}

const Button = ({ value, modificationClasses, ...props }: buttonProps) => {
    const appContext = useContext(AppContext)

    const animationRef = useRef<HTMLSpanElement>(null)
    const buttonRef = useRef<HTMLAnchorElement>(null)

    const handleMouse = (e: any) => {
        let offsetLeft = buttonRef.current!.offsetLeft
        let offsetTop = buttonRef.current!.offsetTop
        let x = e.pageX - offsetLeft
        let y = e.pageY - offsetTop
        animationRef.current!.style.top = y + 'px'
        animationRef.current!.style.left = x + 'px'
    }

    const setTransiitonClass = () => {
        switch (appContext?.actualPage) {
            case "/":
                appContext.fn.setTransitionClass("up")
                break;
            case "/calculations":
                appContext.fn.setTransitionClass("down")
                break;
        }
    }
    //SETUP
    return (
        <Link
            ref={buttonRef}
            className={`button link ${modificationClasses}`}
            {...props}
            onTouchStart={() => { setTransiitonClass() }}
            onMouseEnter={(e) => { handleMouse(e); setTransiitonClass() }}
            onMouseLeave={(e) => { handleMouse(e) }}
        >
            <p className="button_text">{value}</p>
            <span ref={animationRef}></span>
        </Link>
    )
}

Button.defaultProps = {
    value: "Button"
}
////////////////////////////////////////////////////////////
export { Button }