const axios = require('axios');

const getPokemonById = async (req, res) => {
    const { id } = req.params;
    const URL = 'https://pokeapi.co/api/v2/pokemon';

    try {

        const {data} = await axios.get(`${URL}/${id}`);
        return res.status(200).json(data);

    } catch (error) {

        return res.status(500).send({ error: error.message });
        
    }
};

module.exports = getPokemonById;