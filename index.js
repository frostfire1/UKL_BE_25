const express = require('express');
const User = require('./Controllers/User.controller');
const userroute = require('./Routes/User.Route');
const borrowRoute = require('./Routes/Borrow.Route');
const categoryRoute = require('./Routes/Category.Route');
const locationRoute = require('./Routes/Location.Route');
const inventoryRoute = require('./Routes/Inventory.Route');
const usermiddlewares = require('./middlewares/User.Middleware');
const analysRoute = require('./Routes/Analyst.Route');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', userroute);
app.use('/api/inventory', borrowRoute);
app.use('/api/category', categoryRoute);
app.use('/api/location', locationRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/analyst', analysRoute);
app.post('/api/auth/login', usermiddlewares.validateLogin, User.loginUser);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
