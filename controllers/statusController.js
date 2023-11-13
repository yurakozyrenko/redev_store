const StatusService = require('../services/status.service');
const ApiError = require('../error/ApiError');

class StatusController {
    async createStatus(req, res, next) {
        try {
            const { id: userId } = req.user;
            const { adress, phone } = req.body;
            const status = await DevicesService.createDevice({
                name,
                price,
                categoryId,
            });

            return res.json(status);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getStatus(req, res) {
        const { id } = req.params;
        const device = await DevicesService.getOneDevice({ id });
        return res.json(device);
    }
}

module.exports = new StatusController();
