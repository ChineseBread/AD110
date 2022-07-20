import {createContext} from "react";

const ScreenContext = createContext({isPhone:false})
export function ScreenContextProvider({clientWidth,children}){
    return (
        <ScreenContext.Provider value={{isPhone: clientWidth <= 1000}}>
            {children}
        </ScreenContext.Provider>
    )
}
export default ScreenContext