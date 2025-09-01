import request from "supertest";
import path from "path";
import fs from "fs";
import { app } from "../index";
import resizeImage from "../utility/index";

const removeAllThumbnails = (dir: string): void => {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
        const thumbnailPath = path.join(dir, file);
        fs.unlinkSync(thumbnailPath);
    });
};

describe("Testing Endpoints", () => {
    it("Test /api Endpoint returns 200 status code", async () => {
        await request(app).get("/api").expect(200);
    });
    it("Test /api Endpoint returns API is up!", async () => {
        const res = await request(app).get("/api");
        expect(res.text).toMatch("API is up!");
    });
    it("Test /api/images Endpoint returns error filename is missing.", async () => {
        const res = await request(app).get("/api/images").expect(400);
        expect(res.text).toMatch("Missing filename.");
    });
    it("Test /api/images Endpoint returns 200 with correct queries.", async () => {
        await request(app)
            .get("/api/images?filename=fjord&width=200&height=200")
            .expect(200);
    });
});

describe("Image Processing", () => {
    it("resizing an image that doesn't exist", async () => {
        await expectAsync(
            resizeImage("fjord1", 200, 200)
        ).toBeRejectedWithError("Image does not exist.");
    });
    it("A thumbnail should exist after resizing.", async () => {
        const resizedImagePath = await resizeImage("encenadaport", 100, 100);
        expect(fs.existsSync(resizedImagePath)).toBeTrue();
    });
    afterAll(() => {
        const path = __dirname.split("\\").splice(0, 7).join("\\");
        removeAllThumbnails(`${path}/thumb/`);
    });
});
