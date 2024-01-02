const axios = require('axios');
const Pokemon = require('../models/Pokemon');

const createPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight } = req.body;
        
        const newPokemon = await Pokemon.create({name, image, hp, attack, defense, speed, height, weight});

        return res.status(200).json(newPokemon);

    } catch (error) {

        return res.status(500).send({ error: error.message });

    }
};

module.exports = createPokemon;