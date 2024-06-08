const router = require("express").Router();
const {
  signin,
  login,
  createOrderId,
  verifyOrder,
  purcahsedHistory,
  getAll,
} = require("./controller");

router.post("/create", signin);
router.post("/login", login);
router.post("/coi", createOrderId);
router.post("/vo", verifyOrder);
router.get("/history", purcahsedHistory);
router.get("/getAll",getAll)

module.exports = router;
