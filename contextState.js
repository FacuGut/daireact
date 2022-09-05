import * as React from 'react';
import {useContext} from "react";
export const initialState={
    loading:true,
    token:'',
    menu:{
      platos:[],
      precioPromedio:0,
      healthScore:0,
      platosVeganos:0,
      platosVegetarianos:0,
    },
};

export const ActionTypes={
SetLoading:'SET_LOADING',
SetToken:'SET_TOKEN',
SetMenu:'SET_MENU',
SetMenuPlatos:'SET_MENU_PLATOS',
SetMenuPrecioPromedio:'SET_MENU_PRECIOPROMEDIO',
SetMenuHealthScore:'SET_MENU_HEALTHSCORE',
SetMenuPlatosVeganos:'SET_MENU_PLATOSVEGANOS',
SetMenuPlatosVegetarianos:'SET_MENU_PLATOSVEGETARIANOS',

}

export const reducer =(state={},action)=>{
    switch(action.type){
        case ActionTypes.SetLoading:
            return{
                ...state,
                loading: action.value,
            };
        case ActionTypes.SetToken:
            return{
                ...state,
                token: action.value,
            };
            case ActionTypes.SetMenu:
            return{
                ...state,
                  menu: action.value,
            };
            case ActionTypes.SetMenuPlatos:
                return {
                    ...state,
                    menu: {
                        ...state.menu,
                        platos: [...state.menu.platos, action.value],
                    }
                };
            case ActionTypes.SetMenuPrecioPromedio:
            return{
            ...state,
            precioPromedio: action.value,
            };
            case ActionTypes.SetMenuHealthScore:
            return{
            ...state,
            menu:{
            ...menu,
            healthScore: action.value,
            },
            };
            case ActionTypes.SetMenuPlatosVeganos:
            return{
                ...state,
            menu:{
            ...state,
            platosVeganos: action.value,
            },
            };
            case ActionTypes.SetMenuPlatosVegetarianos:
            return{
            ...state,
            menu:{
            ...state,
            platosVegetarianos: action.value,
            },
        };
         
    }
}
export const initialContext={
    contextState:initialState,
    setContextState:()=>{},
};

const Cont = React.createContext(initialContext);
export function ContextProvider({children,initial=initialState}){
const [state, dispatch] = React.useReducer(reducer, initial);

const contextState=state;
const setContextState=dispatch;

return <Cont.Provider value ={{contextState,setContextState}}>{children}</Cont.Provider>
}
export const useContextState=()=>useContext(Cont);


