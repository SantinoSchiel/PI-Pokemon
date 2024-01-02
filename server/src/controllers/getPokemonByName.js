const axios = require('axios');

const getPokemonByName = async (req, res) => {
    const { name } = req.query;
    const lowerCaseName = name.toLowerCase();
    const URL = 'https://pokeapi.co/api/v2/pokemon';
    //console.log(lowerCaseName);

    if (!lowerCaseName) {
        return res.status(400).json({ message: 'name not provided' });
    }

    try {

        const { data } = await axios.get(`${URL}/${lowerCaseName}`);

        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).send({ error: error.message });

    }
};

module.exports = getPokemonByName;