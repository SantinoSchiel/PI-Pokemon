import { ALL_POKEMONS, FILTER_TYPE, FILTER_APIORDB, CREATE_POKEMON } from "./actions-types";

const initialState = {
    pokemons: [],
    allPokemons: [],
};

const applyFilters = (allPokemons, filters) => {
    const { type, apiOrDb } = filters;

    let filteredPokemons = [...allPokemons];

    if (type !== "All") {
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.types.includes(type));
    }

    if (apiOrDb === "DB") {
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.hp);
    } else if (apiOrDb === "API") {
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.stats);
    }

    return filteredPokemons;
};

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ALL_POKEMONS: {
            return { ...state, pokemons: payload, allPokemons: payload };
        }
        case FILTER_TYPE: {
            const { allPokemons } = state;
            const updatedState = { ...state, filters: { ...state.filters, type: payload } };

            return { ...updatedState, pokemons: applyFilters(allPokemons, updatedState.filters) };
        }
        case FILTER_APIORDB: {
            const { allPokemons } = state;
            const updatedState = { ...state, filters: { ...state.filters, apiOrDb: payload } };

            return { ...updatedState, pokemons: applyFilters(allPokemons, updatedState.filters) };
        }
        case CREATE_POKEMON: {
            const { pokemons, allPokemons } = state;

            return {
                ...state,
                pokemons: [...pokemons, payload],
                allPokemons: [...allPokemons, payload],
            };
        }
        default:
            return { ...state };
    }
};

export default reducer;
