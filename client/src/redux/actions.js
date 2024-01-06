import axios from "axios";
import { ALL_POKEMONS } from "./actions-types"

export const allPokemons = (pokemons) => {
   return {
      type: ALL_POKEMONS,
      payload: pokemons
   }
}