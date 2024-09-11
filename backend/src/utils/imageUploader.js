const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    let options = { folder };

    if (height) {
        options.height = height;
    }

    if (quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";

    // Add logging to confirm the file's temp path
    console.log('Uploading file with tempFilePath:', file);

  

    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log('Upload successful:', result);
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};
