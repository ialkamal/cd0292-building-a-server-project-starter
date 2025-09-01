import { Router, Request, Response } from "express";
import resizeImage from "../../utility";

const images = Router();

//Resize Image Route
images.get("/", async (req: Request, res: Response): Promise<void> => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (!filename) {
        res.status(400).send("Missing filename.");
        return;
    }
    if (!width) {
        res.status(400).send("Missing width.");
        return;
    }
    if (!height) {
        res.status(400).send("Missing height.");
        return;
    }
    try {
        const thumb_path = await resizeImage(filename, width, height);
        res.status(200).sendFile(thumb_path);
    } catch (err) {
        res.status(500).send({ Error: (err as Error).message });
    }
});

export default images;
