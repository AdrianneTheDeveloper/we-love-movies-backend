const TheatersService = require("./theaters.service")
const asyncErrorBoundary = require(".././errors/errorBoundary");
const treeize = require("../utils/treeize");

async function list(req, res, next) {
    const response = await TheatersService.getAllTheaters();
    const theatersAndMovies = treeize(response);
    res.json({ data: theatersAndMovies });

}

module.exports = {
    list: asyncErrorBoundary(list)
}