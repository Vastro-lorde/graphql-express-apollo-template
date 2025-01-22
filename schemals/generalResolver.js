
export const uploadResolver = async (parent, { file }) => {
    const { createReadStream, filename, mimetype, encoding } = await file;

    // Handle the file upload (e.g., store it in Cloudinary or locally)
    const stream = createReadStream();
    const path = `./uploads/${filename}`;
    const out = require("fs").createWriteStream(path);
    stream.pipe(out);

    return `File uploaded successfully: ${filename}`;
}