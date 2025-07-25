const prisma = require("../prisma/prisma");

const createWorkout = async (req, res) => {
  try {
    const { userId, date, duration, exercises } = req.body;

    const newWorkout = await prisma.workout.create({
      data: {
        userId,
        date: new Date(date),
        duration,
        exercises: {
          create: exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            reps: exercise.reps,
            weight: exercise.weight,
            weightUnit: exercise.weightUnit,
          })),
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    console.log({ error }, " Error creating workout");
    res.status(500).json({ error: "Failed to create workout" });
  }
};

const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;

    const workout = await prisma.workout.findUnique({
      where: { id: parseInt(id) },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.json(workout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch workout" });
  }
};

const getWorkoutsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const workouts = await prisma.workout.findMany({
      where: { userId: parseInt(userId) },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user workouts" });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.workoutExercise.deleteMany({
      where: { workoutId: parseInt(id) },
    });

    await prisma.workout.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete workout" });
  }
};

module.exports = {
  createWorkout,
  getWorkoutById,
  getWorkoutsByUser,
  deleteWorkout,
};
