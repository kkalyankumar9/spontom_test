const express = require("express");
const { auth } = require("../middleware/auth");

const { CrudModel } = require("../models/patientModel");
const patientRoutes = express.Router();

patientRoutes.use(auth);

patientRoutes.get("/get", async (req, res) => {
  try {
    const data = await CrudModel.find({ userID: req.body.userID });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

patientRoutes.post("/create", async (req, res) => {
  try {
    const data = new CrudModel(req.body);
    await data.save();
    res.status(200).send({ msg: "New User has been created", data: data });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

patientRoutes.patch("/update/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await CrudModel.findOne({ _id: id });
    if (data.userID !== req.body.userID) {
      res.status(400).send({ err: "Not Authorized" });
    } else {
      await CrudModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).send({ msg: `Notes having id ${id} is updated ` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
patientRoutes.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CrudModel.findOne({ _id: id });
    if (data.userID !== req.body.userID) {
      res.status(400).send({ err: "Not Authorized" });
    } else {
      await CrudModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: `Notes having id ${id} is Deleted ` });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = { patientRoutes };
