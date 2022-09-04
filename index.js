const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const userRoute = require("./Router/User.route")
const errorHandler = require('./Middleware/ErrorHandler');
app.use(express.json());
app.use(errorHandler)
/************* Api *************/
app.get('/', (req, res) => res.send('Hello World!'));

app.use("/user", userRoute)

app.get('*', (req, res) => res.send('Node found route'));


/************* Error Handler ************/


app.listen(port, () => console.log(`Example app listening on port ${port}!`))