import React, { useContext } from "react";
import { AppContext } from "./Context";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./transition.css";
const Transition = (props) => {
  const appContext = useContext(AppContext);
  return (
    <TransitionGroup className={"transitionDiv"}>
      <CSSTransition
        key={props.location.pathname}
        timeout={1500}
        classNames={appContext?.transitionClass}
        unmountOnExit
      >
        {props.children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export { Transition };
