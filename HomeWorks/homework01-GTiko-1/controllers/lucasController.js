const lucasModel = require("../models/lucasModel");

exports.findLucasNumber = async (req, res) => {
    try {
        const { n } = req.query;
        const result = await lucasModel.findLucasNumber(n);
        res.send({ "lucas": result });
    } catch (error) {
        console.log("error..")
        res.send(error.message);
    }
}