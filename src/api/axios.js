const axios = require("axios");

const service = axios.create({
  baseURL: "https://shiny-getup-deer.cyclic.app/api/v1",
});

module.exports = { service };
