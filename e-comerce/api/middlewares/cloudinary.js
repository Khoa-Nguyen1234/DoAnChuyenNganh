const cloudinary = require("cloudinary").v2;
const cloud = require("../configs/cloud.configs");

cloudinary.config({
  cloud_name: cloud.CLOUD_NAME,
  api_key: cloud.API_KEY,
  api_secret: cloud.API_SECRET,
}); 


module.exports = cloudinary;