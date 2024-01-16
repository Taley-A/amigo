import Post from '../models/Post.js'
import User from '../models/User.js'

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body

    const user = await User.findById(userId)

    const newPost = await Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: {},
    })

    await newPost.save()

    const post = await Post.find()
    // 201 is for creating something
    res.status(201).json(post)
  } catch (err) {
    // 409 is when something can't be created
    res.status(409).json({ message: err.message })
  }
}

// READ

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find()

    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params
    const post = await Post.find({ userId })

    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

// UPDATE
export const likePost = async (req, res) => {
  try {
    // id comes from query string
    const { id } = req.params
    // userId comes from the body of the request
    const { userId } = req.body

    const post = await Post.findById(id)
    const isLiked = post.likes.get(userId)

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId, true)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    )

    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}
