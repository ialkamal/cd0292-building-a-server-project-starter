import sharp from "sharp";
import fs from "fs";

const path = __dirname.split("\\").splice(0, 7).join("\\");

const imageError = new Error("Image does not exist.");
const imageResizeError = new Error("Error resizing image.");
const thumbnailStorageError = new Error("Error storing thumbnail.");

//Function to resize image to thumbnail
const resizeImage = async (filename: string, width: number, height: number) => {
    const image_path: string = `${path}/images/${filename}.jpg`;
    if (!fs.existsSync(image_path)) {
        throw imageError;
    }

    const thumb_path: string = `${path}/thumb/${filename}_thumb.jpg`;
    let resizedImage;

    if (!fs.existsSync(thumb_path)) {
        try {
            resizedImage = await sharp(image_path).resize(+width, +height);
        } catch {
            throw imageResizeError;
        }
        try {
            if (resizedImage) {
                await resizedImage.toFile(thumb_path);
            }
        } catch {
            throw thumbnailStorageError;
        }
    }
    return thumb_path;
};

export default resizeImage;
