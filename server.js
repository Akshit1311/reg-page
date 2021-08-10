const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

app.post("/", (req, res) => {
  const { name, email, mobile } = req.body;

  if (!name || !email || !mobile) {
    return res.status(400).json({ msg: "Fields missing" });
  }

  console.log({ files: req.files, body: req.body });

  if (req.files === null) {
    return res.status(400).json({ msg: "No file was uploaded" });
  }

  const file1 = req.files.pic;
  const file2 = req.files.idProofName;
  const file3 = req.files.idProofImg;

  if (!file1 || !file2 || !file3) {
    return res.status(400).json({ msg: "Files missing" });
  }

  file1.mv(`${__dirname}/uploads/pic/${file1.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error moving file" });
    }
  });
  file2.mv(`${__dirname}/uploads/idProofName/${file2.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error moving file" });
    }
  });
  file3.mv(`${__dirname}/uploads/idProofImg/${file3.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error moving file" });
    }
  });

  res.status(200).json({
    msg: "User Registered Successfully",
    subData: { ...req.body, files: req.files },
  });
});

app.listen(5000, () => {
  console.log(`Server started on port 5000...`);
});
