import React, { createContext, FC, ReactElement, PropsWithChildren, useState } from "react";

export const TaskStatusChangedContext = createContext({
    updated: false, //state
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggle: () => {}, //state
})

export const TaskStatusChangedContextProvider:FC<PropsWithChildren> = (props): ReactElement => {
    const [updated, setUpdated] = useState(false);
    
    function toggleHandler() {
        updated ? setUpdated(false) : setUpdated(true);
    }

    return <TaskStatusChangedContext.Provider
        value={{updated: updated, toggle: toggleHandler}}
    >
        {props.children}
    </TaskStatusChangedContext.Provider>
}

//State vs Context
//State is specific to a component
//Context available to all components