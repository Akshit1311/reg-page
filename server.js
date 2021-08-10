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

  file1.mv(`${__dirname}/uploads/${file1}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error moving file" });
    }
  });
  file2.mv(`${__dirname}/uploads/${file2}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error moving file" });
    }
  });
  file3.mv(`${__dirname}/uploads/${file3}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error moving file" });
    }
  });

  res.status(200).json({ msg: "User Registered Successfully" });
});

app.listen(5000, () => {
  console.log(`Server started on port 5000...`);
});
