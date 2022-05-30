const express = require("express")
const {get_All_Tags} = require("../controllers/tagController")
const router = express.Router()

router.get("/", get_All_Tags)
module.exports = router