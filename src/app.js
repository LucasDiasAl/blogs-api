const express = require('express');
require('express-async-errors');

const loginRouter = require('./routers/loginRouter.js');
// ...

const app = express();

app.use(express.json());

// ...
app.use('/login', loginRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
