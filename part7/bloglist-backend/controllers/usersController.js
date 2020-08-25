const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcryptjs");

usersRouter.get("/", async (request, response) => {
  let users = await User.find({});
  const blogs = await Blog.find({});

  users = users.map((user) => {
    return {
      ...user.toObject(),
      blogs: blogs.filter((x) => x.user && x.user.toString() === user.id.toString()),
    };
  });
  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const newUser = request.body;

  if (!newUser.username || newUser.username.length < 3 || !newUser.password || newUser.password.length < 3) {
    return response.status(400).json({ error: "username and password must be filled, and be minimum 3 characters long." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newUser.password, saltRounds);

  const user = new User({
    username: newUser.username,
    passwordHash: passwordHash,
    name: newUser.name,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

usersRouter.put("/:id", async (request, response, next) => {
  const requestBody = request.body;

  if (!requestBody.password || requestBody.password.length < 3) {
    return response.status(400).json({ error: "username and password must be filled, and be minimum 3 characters long." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(requestBody.password, saltRounds);

  const newUser = {
    passwordHash: passwordHash,
    name: requestBody.name,
  };

  const updated = await User.findByIdAndUpdate(request.params.id, newUser, { new: true });
  response.json(updated);
});

module.exports = usersRouter;
