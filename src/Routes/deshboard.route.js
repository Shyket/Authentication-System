const express = require("express");
const router = express.Router();
var path = require("path");

router.get("/", (req, res) => {
 // console.log(req.cookies);
  res
    .status(200)
    .render(
      path.join(
        __dirname,
        "../../AdminLTE-master/pages/examples/secure",
        "index3"
      ),
      {username:req.cookies.username}
    );
});

module.exports = router;
