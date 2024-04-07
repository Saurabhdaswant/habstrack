const express = require("express");
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");

const getCollection = () => {
  const client = getConnectedClient();
  const collection = client.db("test").collection("habits");
  return collection;
};

const router = express.Router();

router.get("/habits", async (req, res) => {
  const collection = getCollection();
  const habits = await collection.find({}).toArray();

  res.status(200).json(habits);
});

router.post("/habits", async (req, res) => {
  const collection = getCollection();
  let { habit } = req.body;

  if (!habit) {
    return res.status(400).json({ mssg: "error no habit found" });
  }

  habit = typeof habit === "string" ? habit : JSON.stringify(habit);

  const newhabit = await collection.insertOne({ habit, status: false });

  res.status(201).json({ habit, status: false, _id: newhabit.insertedId });
});

router.delete("/habits/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);

  const deletedhabit = await collection.deleteOne({ _id });
  res.status(200).json(deletedhabit);
});

router.put("/habits/:id", async (req, res) => {
  const collection = getCollection();
  const _id = new ObjectId(req.params.id);
  const { status } = req.body;

  if (typeof status !== "boolean") {
    return res.status(400).json({ mssg: "invalid status" });
  }

  const updatedhabit = await collection.updateOne(
    { _id },
    { $set: { status: !status } }
  );
  res.status(200).json(updatedhabit);
});

module.exports = router;
