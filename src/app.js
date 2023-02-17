const express = require('express');
require('express-async-errors');

const loginRouter = require('./routers/loginRouter');
const userRouter = require('./routers/userRouter');
const categoryRouter = require('./routers/cateogryRouter');
const postRouter = require('./routers/postRouter');
// ...

const app = express();

app.use(express.json());

// ...
app.use('/login', loginRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
