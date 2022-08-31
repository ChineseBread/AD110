import {createContext} from "react";

const ScreenContext = createContext<{isPhone:boolean}>({isPhone:false})
export function ScreenContextProvider({clientWidth,children}:any){
    return (
        <ScreenContext.Provider value={{isPhone: clientWidth <= 900}}>
            {children}
        </ScreenContext.Provider>
    )
}
export default ScreenContext