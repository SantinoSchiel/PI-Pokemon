import { ALL_POKEMONS, FILTER_TYPE, FILTER_APIORDB } from "./actions-types"

export const allPokemons = (pokemons) => {
   return {
      type: ALL_POKEMONS,
      payload: pokemons
   }
}

export const filterType = (type) => {
   return {
      type: FILTER_TYPE,
      payload: type
   }
}

export const filterApiOrDb = (apiOrDb) => {
   return {
      type: FILTER_APIORDB,
      payload: apiOrDb
   }
}