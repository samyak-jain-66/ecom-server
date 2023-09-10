const axios = require('axios');

const service = axios.create({
  baseURL: 'https://wild-red-chameleon-sari.cyclic.app/api/v1',
});

module.exports = { service };
