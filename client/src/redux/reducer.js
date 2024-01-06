import { ALL_POKEMONS } from "./actions-types"

const initialState = {
    pokemons: [],
}


const reducer = (state = initialState, {type, payload}) => { 
    switch(type){
        // REDUCER | ADD_FAV
        case ALL_POKEMONS:{
            return { ...state, pokemons: payload};
        }
        default:
            return {...state}
    }
}

export default reducer;