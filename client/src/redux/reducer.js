import { ALL_POKEMONS, FILTER_TYPE, ORDER_APIORDB } from "./actions-types"

const initialState = {
    pokemons: [],
    allPokemons: []
}


const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
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
        case ORDER_APIORDB: {
            if (payload === "All") {
                return {
                    ...state,
                    pokemons: state.allPokemons
                }
            }
            if (payload === "DB") {
                const filteredOreder = state.allPokemons.filter(pokemon => pokemon.hp);

                return{
                    ...state,
                    pokemons: filteredOreder
                }
            }
            if (payload === "API") {
                const filteredOreder = state.allPokemons.filter(pokemon => pokemon.stats);

                return{
                    ...state,
                    pokemons: filteredOreder
                }
            }
        }
        default:
            return { ...state }
    }
}

export default reducer;