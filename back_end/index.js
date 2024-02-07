const express = require("express");

const { connection } = require("./db");
const { userRoutes } = require("./routes/userRoutes");
const { crudRoutes } = require("./routes/patientRoutes");
const { forgotPasswordRoute } = require("./routes/forgotPassword");

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Add express-session middleware

app.use("/userauth", userRoutes);
app.use("/patient", crudRoutes);
app.use("/forgot", forgotPasswordRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB connected");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
