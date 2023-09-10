const SendError = (req, res) => {
  return res.status(501).json("Invalid Route");
};

module.exports = { SendError };
