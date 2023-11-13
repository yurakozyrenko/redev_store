const Router = require('express');
const router = new Router();
const StatusController = require('../controllers/statusController');

router.post('/', StatusController.createStatus);
router.get('/', StatusController.getStatus);

module.exports = router;