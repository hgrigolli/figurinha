const express = require('express');
const router = express.Router();
const controller = require('../controllers/figurinhas');


router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.remove);
router.get('/:id', controller.getById);
router.get('/', controller.getAll);


module.exports = router;
