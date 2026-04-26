const express = require('express');
const router = express.Router();
const { bookEvent, updatePaymentStatus, getMyBookings, cancelBooking } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, bookEvent);
router.put('/:id/payment-status', protect, admin, updatePaymentStatus);
router.get('/my', protect, getMyBookings);
router.delete('/:id', protect, cancelBooking);

module.exports = router;
