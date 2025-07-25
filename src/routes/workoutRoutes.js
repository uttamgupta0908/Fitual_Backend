const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getWorkoutById,
  getWorkoutsByUser,
  deleteWorkout,
} = require("../controllers/workoutController");

router.post("/", createWorkout);
router.get("/:id", getWorkoutById);
router.get("/user/:userId", getWorkoutsByUser);
router.delete("/:id", deleteWorkout);

module.exports = router;
