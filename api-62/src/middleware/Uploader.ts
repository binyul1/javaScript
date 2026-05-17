import multer from "multer";
import fs from "fs";

const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "./public/uploads/images";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "_" + file.originalname;
    cb(null, filename);
  },
});
const uploader = () => {
  const multerobj = multer({
    // dest: "/path for your file",
    // storage: "configure your storage",
    storage: myStorage,
  });
  return multerobj;
};

export default uploader;
