const express = require('express');
require('./db/db');
const app = express();
const port = process.env.PORT || 5000;
const userRouter = require('./routers/userRouter');

app.use(express.urlencoded());
app.use(express.json());

app.use('/users', userRouter);

app.listen(port, () => console.log(`Server starting on port ${port}`));