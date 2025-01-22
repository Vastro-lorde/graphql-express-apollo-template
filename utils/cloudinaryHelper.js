import { cloudinaryConfig as cloudinary } from "../services/cloudinary/cloudinaryConnect.js";


/**
 * Upload a file to Cloudinary
 * @param {ReadableStream} fileStream - The file stream to upload
 * @param {Object} options - Options for uploading (e.g., folder, tags)
 * @returns {Promise<Object>} - The result from Cloudinary
 */
export const uploadFile = async (fileStream, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    fileStream.pipe(uploadStream);
  });
};

/**
 * Update a file on Cloudinary using its URL
 * @param {string} fileUrl - The URL of the file to update
 * @param {ReadableStream} newFileStream - The new file stream to upload
 * @param {Object} options - Options for uploading the new file
 * @returns {Promise<Object>} - The result from Cloudinary
 */
export const updateFile = async (fileUrl, newFileStream, options = {}) => {
  try {
    // Extract the public ID from the URL
    const publicId = getPublicIdFromUrl(fileUrl);

    // Delete the existing file
    await deleteFile(publicId);

    // Upload the new file
    return await uploadFile(newFileStream, options);
  } catch (error) {
    throw new Error(`Failed to update file: ${error.message}`);
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<Object>} - The result from Cloudinary
 */
export const deleteFile = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

/**
 * Extract the public ID from a Cloudinary file URL
 * @param {string} fileUrl - The URL of the file
 * @returns {string} - The public ID
 */
const getPublicIdFromUrl = (fileUrl) => {
  const urlParts = fileUrl.split('/');
  const publicIdWithExtension = urlParts[urlParts.length - 1];
  const publicId = publicIdWithExtension.substring(
    0,
    publicIdWithExtension.lastIndexOf('.')
  );
  return publicId;
};
