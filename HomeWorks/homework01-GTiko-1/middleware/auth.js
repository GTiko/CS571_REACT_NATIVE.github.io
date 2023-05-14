exports.validateNumber = (req, res, next) => {
    const { n } = req.query;
    if (isNaN(n)) {
        return res.send('Invalid input');
    }
    next();
}