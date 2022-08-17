const express = require('express');
const authRouter = require("./routes/auth")

const app = express();
app.use(express.json());

authRouter.authConfig(app);

app.get("/", (req, res) => {
    res.send("Hi I am working");
})

app.listen(5001, () => {
    console.log("Now running on port 5001")
})