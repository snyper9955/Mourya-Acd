const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, logout, getProfile, updateProfile, googleCallback, getAllUsers } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post("/logout", logout);

router.get('/users', protect, authorize('admin'), getAllUsers);

router.route('/profile')
    .get(protect, getProfile)
    .put(protect, updateProfile);



module.exports = router;
