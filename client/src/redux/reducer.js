import { ALL_POKEMONS, FILTER_TYPE, FILTER_APIORDB } from "./actions-types"

const initialState = {
    pokemons: [],
    allPokemons: []
}


const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // REDUCER | ADD_FAV
        case ALL_POKEMONS: {
            return { ...state, pokemons: payload, allPokemons: payload };
        }
        case FILTER_TYPE: {
            if (payload === "All") {
                return {
                    ...state,
                    pokemons: state.allPokemons
                }
            }

            const filteredTypes = state.allPokemons.filter(pokemon => pokemon.types.includes(payload));

            return{
                ...state,
                pokemons: filteredTypes
            }
        }
        case FILTER_APIORDB: {
            if (payload === "All") {
                return {
                    ...state,
                    pokemons: state.allPokemons
                }
            }
            if (payload === "DB") {

            }
            if (payload === "API") {

            }
        }
        default:
            return { ...state }
    }
}

export default reducer;