const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

//create task item

router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = new List({ title, body, user: existingUser });
      await list.save().then(() => res.status(200).json({ list }));
      existingUser.list.push(list);
      existingUser.save();
    }
  } catch (error) {
    console.log(error);
  }
});

//update task item
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const list = await List.findByIdAndUpdate(req.params.id, { title, body });
      list
        .save()
        .then(() =>
          res.status(200).json({ message: "Task successfully updated!" })
        );
    }
  } catch (error) {
    console.log(error);
  }
});

//delete task item
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );
    if (existingUser) {
      await List.findByIdAndDelete(id).then(() =>
        res.status(200).json({ message: "The task deleted successfully!" })
      );
    }
  } catch (error) {
    console.log(error);
  }
});

//get all tasks
router.get("/getTasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const existingUser = await User.findById(id);
    if (existingUser) {
      const list = await List.find({ user: req.params.id });
      if (list.length !== 0) {
        res.status(200).json({ list });
      } else {
        res.status(200).json({ message: "There are no tasks!" });
      }
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
