const cloud = require("cloudinary");
cloud.config({
  cloud_name: "drlakj4eo",
  api_key: "565692928369581",
  api_secret: "KPYLkWyN7Zrrxq6ZoK5qfcPjI_4"
});

exports.uploads = (file) => {
  return new Promise((resolve, reject) => {
    cloud.uploader.upload(file, (result) => {
      resolve({ url: result.url, id: result.public_id });
    }, { resource_type: "auto" });
  });
}
