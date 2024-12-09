const express = require('express');
const AnalysController = require('../Controllers/Analys.controller');
const { authorize, validateRole } = require('../middlewares/Autherize');

const router = express.Router();
const { 
    validateGetBorowByDayStartAndEnd,
    validateGetCategoryBorrowByDayStartAndEnd,
    validateGetTargetLocationBorrowByDayStartAndEnd,
    validateGetInventoryLocationBorrowByDayStartAndEnd,
    validateGetNotreturnBorrowByDayStartAndEnd,
    validateGetLateReturnBorrowByDayStartAndEnd,
    validateAnalysAll
} = require('../middlewares/Analyst.middleware');

const roles = ['ADMIN', 'OPERATOR'];
router.use(express.json());

router.get('/borrow', authorize, validateRole(roles), validateGetBorowByDayStartAndEnd, AnalysController.getBorowByDayStartAndEnd);
router.get('/category-borrow', authorize, validateRole(roles), validateGetCategoryBorrowByDayStartAndEnd, AnalysController.getCategoryBorrowByDayStartAndEnd);
router.get('/target-location-borrow', authorize, validateRole(roles), validateGetTargetLocationBorrowByDayStartAndEnd, AnalysController.getTargetLocationBorrowByDayStartAndEnd);
router.get('/inventory-location-borrow', authorize, validateRole(roles), validateGetInventoryLocationBorrowByDayStartAndEnd, AnalysController.getInventoryLocationBorrowByDayStartAndEnd);
router.get('/not-return-borrow', authorize, validateRole(roles), validateGetNotreturnBorrowByDayStartAndEnd, AnalysController.getNotreturnBorrowByDayStartAndEnd);
router.get('/late-return-borrow', authorize, validateRole(roles), validateGetLateReturnBorrowByDayStartAndEnd, AnalysController.getLateReturnBorrowByDayStartAndEnd);
router.get('/', authorize, validateRole(roles), validateAnalysAll,AnalysController.AnalysAll);

module.exports = router;
