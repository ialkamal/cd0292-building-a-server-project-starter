import { Router, Request, Response } from "express";
import images from "./api/images";

const routes = Router();

routes.use("/images", images);

routes.get("/", (req: Request, res: Response): void => {
    res.status(200).send("API is up!");
});

export default routes;
