import { RequestHandler, Router } from "express";
import User from "../models/User";

/**
|--------------------------------------------------
| @route     POST users
  @desc      Post a user
|--------------------------------------------------
*/

export const createUser: RequestHandler = async (req, res) => {
  const { username } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      username
    });

    await user.save();

    res.status(200).json({ msg: "User has been created" });
  } catch (error) {
    console.error(error.message);

    res.status(500).send("Server Error");
  }
};

/**
|--------------------------------------------------
| @route     GET users
  @desc      Get all users
|--------------------------------------------------
*/

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
|--------------------------------------------------
| @route     GET users
  @desc      GET a user
|--------------------------------------------------
*/

export const getUser: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
|--------------------------------------------------
| @route     PATCH users
  @desc      PATCH a user
|--------------------------------------------------
*/

export const updateUser: RequestHandler<{ id: string }> = async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;

  let userFields = {};
  if (username) {
    userFields = { username };
  }

  try {
    let user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user = await User.findByIdAndUpdate(
      id,
      { $set: userFields },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
|--------------------------------------------------
| @route     DELETE users
  @desc      DELETE a user
|--------------------------------------------------
*/
export const deleteUser: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    await User.findByIdAndRemove(id);
    res.json({ msg: "User has been deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
