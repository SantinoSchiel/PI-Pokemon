import { ALL_POKEMONS, FILTER_TYPE, FILTER_APIORDB, ORDER_ALPHABETICALLY, ORDER_ATTACK, CREATE_POKEMON } from "./actions-types";

const initialState = {
    pokemons: [],
    allPokemons: [],
};

const applyFilters = (allPokemons, filters) => {
    const { type, apiOrDb, order } = filters;

    let filteredPokemons = [...allPokemons];

    if (type !== "All") {
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.types.includes(type));
    }

    if (filteredPokemons.length === 0) {
        filteredPokemons = [...allPokemons];
    }

    // console.log('filteredPokemons', filteredPokemons)
    if (apiOrDb === "DB") {
        // console.log('apiOrDb', apiOrDb)
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.hp);

        // console.log('allPokemons', allPokemons)
    } else if (apiOrDb === "API") {
        filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.stats);
    }

    switch (order) {
        case "DefaultAlphabetical":
            console.log('entro a DefaultAlphabetical')
            break;
        case "GrowingAlphabetical":
            console.log('entro a GrowingAlphabetical')
            filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "DecreasingAlphabetical":
            console.log('entro a DecreasingAlphabetical')
            filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case "DefaultAttack":
            console.log('entro a DefaultAtack')
            break;
        case "GrowingAttack":
            console.log('entro a GrowingAttack')
            filteredPokemons.sort((a, b) => (a.stats ? a.stats.attack : a.attack) - (b.stats ? b.stats.attack : b.attack));
            break;
        case "DecreasingAttack":
            console.log('entro a DecreasingAttack')
            filteredPokemons.sort((a, b) => (b.stats ? b.stats.attack : b.attack) - (a.stats ? a.stats.attack : a.attack));
            break;
        default:
            break;
    }

    // console.log('filteredPokemons', filteredPokemons);
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
        case ORDER_ALPHABETICALLY: {
            const { allPokemons, filters } = state;
            const updatedState = { ...state, filters: { ...filters, order: payload } };

            return { ...updatedState, pokemons: applyFilters(allPokemons, updatedState.filters) };
        }
        case ORDER_ATTACK: {
            const { allPokemons, filters } = state;
            const updatedState = { ...state, filters: { ...filters, order: payload } };

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
