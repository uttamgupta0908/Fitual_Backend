// prisma/seed.js
// const { PrismaClient } = require("@prisma/client");
const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // 👤 Create a user
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      name: "Uttam",
      email: "uttam0908@gmail.com",
      password: hashedPassword,
    },
  });
  console.log("✅ User created:", user);

  // 🏋️ Seed Exercises (return IDs)
  const createdExercises = await Promise.all([
    prisma.exercise.create({
      data: {
        name: "Bench Press",
        muscleGroup: "Chest",
        equipment: "Barbell",
        difficulty: "intermediate",
        description: "A compound exercise for chest strength.",
        videoUrl: "https://example.com/benchpress",
        imageUrl: "https://example.com/benchpress.png",
      },
    }),
    prisma.exercise.create({
      data: {
        name: "Squat",
        muscleGroup: "Legs",
        equipment: "Barbell",
        difficulty: "advanced",
        description: "Builds leg strength and core stability.",
        videoUrl: "https://example.com/squat",
        imageUrl: "https://example.com/squat.png",
      },
    }),
    prisma.exercise.create({
      data: {
        name: "Push Up",
        muscleGroup: "Chest",
        equipment: "Bodyweight",
        difficulty: "beginner",
        description: "Bodyweight chest and triceps exercise.",
        videoUrl: "https://example.com/pushup",
        imageUrl: "https://example.com/pushup.png",
      },
    }),
  ]);

  console.log("✅ Exercises created:", createdExercises);

  // 🏋️ Create a Workout with real Exercise IDs
  const workout = await prisma.workout.create({
    data: {
      userId: user.id,
      date: new Date(),
      duration: 3600,
      exercises: {
        create: [
          {
            exerciseId: createdExercises[0].id, // Bench Press
            sets: 3,
            reps: 12,
            weight: 40,
            weightUnit: "kg",
          },
          {
            exerciseId: createdExercises[1].id, // Squat
            sets: 4,
            reps: 10,
            weight: 80,
            weightUnit: "kg",
          },
        ],
      },
    },
    include: {
      exercises: { include: { exercise: true } },
    },
  });

  console.log("✅ Workout created:", JSON.stringify(workout, null, 2));
}

main()
  .then(() => {
    console.log("🎉 Seeding finished successfully!");
  })
  .catch((e) => {
    console.error("❌ Seeding error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
