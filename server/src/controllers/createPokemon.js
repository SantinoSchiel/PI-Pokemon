const {Pokemon} = require('../db');

const createPokemon = async (req, res) => {
    try {
        const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;
        
        const newPokemon = await Pokemon.create({name, image, hp, attack, defense, speed, height, weight, types});

        return res.status(200).json(newPokemon);

    } catch (error) {

        return res.status(500).send({ error: error.message });

    }
};

module.exports = createPokemon;