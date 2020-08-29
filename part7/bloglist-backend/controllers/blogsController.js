const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const user = await User.findById(request.token.id);
  blog.user = user.id;

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const userId = request.token.id;

  if (blog.user.toString() !== userId) {
    response.status(401).send({ error: "The specified user cannot delete the specified blog." }).end();
    return;
  }

  await Blog.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updated);
});

blogsRouter.get("/:id/comments", async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  const comments = blog.comments ? blog.comments : []
  response.json(comments)
})

blogsRouter.post("/:id/comments", async (request, response, next) => {
  const comment = { text: request.body.text }

  console.log(comment)

  const blog = await Blog.findByIdAndUpdate(request.params.id, { $push: { comments: comment } }, { new: true });
  response.status(201).json(blog.comments)
})

module.exports = blogsRouter;
