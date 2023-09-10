const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UploadImage = async (images, fileStr, _preset, type) => {
  if (type === "multiple") {
    const imagesArrayLink = {
      primary: "",
      secondary1: "",
      secondary2: "",
      secondary3: "",
    };
    for (let key in images) {
      if (images[key] !== "") {
        try {
          const uploadResponse = await cloudinary.uploader.upload(images[key], {
            upload_preset: _preset,
          });
          imagesArrayLink[key] = uploadResponse.secure_url;
        } catch (error) {
          console.log("Error while uploading image: multiple " + error);
          return;
        }
      }
    }
    return imagesArrayLink;
  } else {
    try {
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: _preset,
      });
      return uploadResponse.secure_url;
    } catch (error) {
      console.log("Error while uploading image: single " + error);
      return;
    }
  }
};

module.exports = { UploadImage };
