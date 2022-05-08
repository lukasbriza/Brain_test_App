import React, { useContext, ReactElement } from 'react'
import { AppContext } from './Context'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './transition.css'
const Transition = ({ children, location }: { children: ReactElement, location: any }) => {
    const appContext = useContext(AppContext)
    return (
        <TransitionGroup className={"transitionDiv"}>
            <CSSTransition
                key={location.pathname}
                timeout={1500}
                classNames={appContext?.transitionClass}
                unmountOnExit
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    )
}

export { Transition }