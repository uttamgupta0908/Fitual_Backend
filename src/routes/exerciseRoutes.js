const express = require("express");
const router = express.Router();
const {
  createExercise,
  getAllExercises,
  getExerciseById,
} = require("../controllers/exerciseController");

router.post("/", createExercise);
router.get("/", getAllExercises);
router.get("/:id", getExerciseById);

module.exports = router;
