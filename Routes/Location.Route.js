const express = require('express');
const LocationController = require('../Controllers/Location.controller');
const { validateCreateLocation, validateid } = require('../middlewares/Location.middleware');
const { authorize, validateRole } = require('../middlewares/Autherize');

const router = express.Router();

router.use(express.json());
router.get('/name', authorize, LocationController.findLocationByName);
router.post('/', authorize, validateRole(['ADMIN']), validateCreateLocation, LocationController.createLocation);
router.delete('/:id', authorize, validateRole(['ADMIN']), validateid, LocationController.deleteLocation);
router.get('/', authorize, LocationController.getAllLocations);

module.exports = router;