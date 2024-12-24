const express = require('express');
const accessController = require('../../controllers/accessController.js');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await accessController.login(email, password);
        res.json(data);
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    try {
        const data = accessController.register(email, password);
        res.json(data);
    } catch (err) {
        throw new Error(err);
    }
});

router.get('/', (req, res) => {
    res.json({ message: 'Access router' });
});

module.exports = router;
