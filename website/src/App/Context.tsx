import React, { createContext, useState } from 'react';



//CONTEXT//
const AppContext = createContext({})

const AppContextProvider = (props: any) => {
    let appState = {}
    return (
        <AppContext.Provider value={appState}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppContextProvider, AppContext }