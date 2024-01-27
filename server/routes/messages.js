const { addMessage, getChat } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg/", addMessage);
router.post("/getchat/", getChat);

module.exports = router;
