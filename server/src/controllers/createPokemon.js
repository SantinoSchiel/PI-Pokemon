const { Pokemon } = require('../db');

const createPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        const info = { name, image, hp, attack, defense, speed, height, weight, types };
        // console.log(info);

        const newPokemon = await Pokemon.create(info);

        return res.status(200).json(newPokemon);

    } catch (error) {

        // console.log(req.body)
        // console.error("Error al crear el Pokémon:", error);
        return res.status(500).send({ error: "Error interno del servidor al crear el Pokémon." });

    }
};

module.exports = createPokemon;