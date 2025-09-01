import express from "express";
import routes from "./routes/index";

export const app = express();
export const PORT = 3000;

//Main route
app.use("/api", routes);

app.listen(PORT, () => {
    console.log("Server listening on localhost: ", PORT);
});
