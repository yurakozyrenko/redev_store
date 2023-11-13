const Router = require('express');
const router = new Router();
const DeviceInfoController = require('../controllers/deviceInfoController');

router.post('/', DeviceInfoController.create);
router.get('/:deviceId', DeviceInfoController.getOne);

module.exports = router;
