import { ALL_POKEMONS, FILTER_TYPE, ORDER_APIORDB } from "./actions-types"

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

export const orderApiOrDb = (apiOrDb) => {
   return {
      type: ORDER_APIORDB,
      payload: apiOrDb
   }
}