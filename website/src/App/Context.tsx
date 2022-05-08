import React, { SetStateAction, createContext, useState, useEffect } from 'react';

////////////////////////////////////////////////////////////
interface appContextProps {
    noc: number,
    nocCompleted: number,
    actualPage: string,
    showIcon: boolean,
    showMenu: boolean,
    brainAnPlayed: boolean | undefined,
    transitionClass: "up" | "down",
    fn: {
        setNoc: React.Dispatch<SetStateAction<number>>,
        setNocCompleted: React.Dispatch<SetStateAction<number>>
        setActualPage: React.Dispatch<SetStateAction<string>>,
        setShowIcon: React.Dispatch<SetStateAction<boolean>>,
        setShowMenu: React.Dispatch<SetStateAction<boolean>>,
        setBrainAnPlayed: React.Dispatch<SetStateAction<boolean | undefined>>,
        setTransitionClass: React.Dispatch<SetStateAction<"up" | "down">>
    }
}

//CONTEXT//
const AppContext = createContext<appContextProps | null>(null)

const AppContextProvider = (props: any) => {
    const [noc, setNoc] = useState<number>(0)
    const [nocCompleted, setNocCompleted] = useState<number>(0)
    const [actualPage, setActualPage] = useState<string>("/")
    const [showIcon, setShowIcon] = useState<boolean>(false)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [brainAnPlayed, setBrainAnPlayed] = useState<boolean | undefined>(undefined)
    const [transitionClass, setTransitionClass] = useState<"up" | "down">("up")

    let appState: appContextProps = {
        noc: noc,
        nocCompleted: nocCompleted,
        actualPage: actualPage,
        showIcon: showIcon,
        showMenu: showMenu,
        brainAnPlayed: brainAnPlayed,
        transitionClass: transitionClass,
        fn: {
            setNoc: setNoc,
            setNocCompleted: setNocCompleted,
            setActualPage: setActualPage,
            setShowIcon: setShowIcon,
            setShowMenu: setShowMenu,
            setBrainAnPlayed: setBrainAnPlayed,
            setTransitionClass: setTransitionClass,
        }
    }

    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}
////////////////////////////////////////////////////////////
export { AppContextProvider, AppContext }