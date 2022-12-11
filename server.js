const express = require("express");
const app = express();
const connection = require("./configs/db")
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res) => {
    res.json({
        success: true
    })
});

// ROUTES
const createRouter = require("./routes/create");
const readRouter = require("./routes/read");
const deleteRouter = require("./routes/delete");
const updateRouter = require("./routes/update");

app.use("/api/create",createRouter);
app.use("/api/show",readRouter);
app.use("/api/delete",deleteRouter);
app.use("/api/update",updateRouter);

app.listen(3000,() => {
    console.log("Server is live at 3000...");
})