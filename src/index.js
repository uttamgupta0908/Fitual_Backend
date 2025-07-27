const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
// const { PrismaClient } = require("../generated/prisma");
const prisma = require("./prisma/prisma");

dotenv.config();

const app = express();
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

////////////////////
app.get("/", (req, res) => {
  res.send({ message: "working fine" });
});

app.use("/auth", authRoutes);

app.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true },
    });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



//exercise routes
const exerciseRoutes = require("./routes/exerciseRoutes");
app.use("/exercises", exerciseRoutes);

//workout routes
const workoutRoutes = require("./routes/workoutRoutes");
app.use("/workouts", workoutRoutes);

//ai
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
