import { ALL_POKEMONS, FILTER_TYPE, FILTER_APIORDB, ORDER_ALPHABETICALLY, ORDER_ATTACK ,CREATE_POKEMON } from "./actions-types"

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
export const orderAlphabetically = (oreder) => {
   return {
      type: ORDER_ALPHABETICALLY,
      payload: oreder
   }
}
export const orderAttack = (oreder) => {
   return {
      type: ORDER_ATTACK,
      payload: oreder
   }
}

export const createPokemon = (infoPokemon) => {
   return {
      type: CREATE_POKEMON,
      payload: infoPokemon
   }
}