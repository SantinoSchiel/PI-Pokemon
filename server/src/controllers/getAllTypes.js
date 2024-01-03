const axios = require('axios');
const {Type} = require('../db');

const getAllTypes = async (req, res) => {

    const URL = 'https://pokeapi.co/api/v2/type';
    let allTypes = [];

    try {
        let nextUrl = URL;

        while (nextUrl) {
            const { data } = await axios.get(nextUrl);

            const types = data.results.map(type => ({
                name: type.name,
                info: type.url,
            }));

            allTypes = [...allTypes, ...types];
            nextUrl = data.next;
        }

        for (let i = 0; i < allTypes.length; i++) {
            await Type.findOrCreate({
                where: {
                    name: allTypes[i].name
                }
            })
        }

        return res.status(200).json(allTypes);


    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = getAllTypes;