const prisma = require("../prisma/prisma");

// Create exercise
exports.createExercise = async (req, res) => {
  const {
    name,
    muscleGroup,
    equipment,
    difficulty,
    description,
    videoUrl,
    imageUrl,
  } = req.body;

  try {
    const exercise = await prisma.exercise.create({
      data: {
        name,
        muscleGroup,
        equipment,
        difficulty,
        description,
        videoUrl,
        imageUrl,
      },
    });

    res.json(exercise);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all exercises
exports.getAllExercises = async (req, res) => {
  const exercises = await prisma.exercise.findMany();
  res.json(exercises);
};

// Get exercise by id
exports.getExerciseById = async (req, res) => {
  const { id } = req.params;
  const exercise = await prisma.exercise.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(exercise);
};
