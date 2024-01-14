import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// register user
export const register = async (request, response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      occupation,
      location,
    } = req.body

    // encryption for password
    const salt = await bcrypt.genSalt
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      email,
      passwordHash,
      picturePath,
      friends,
      occupation,
      location,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    })

    const savedUser = await newUser.save()

    // user created response
    response.status(201).json(savedUser)
  } catch (err) {
    response.status(500).json({ error: err.message })
  }
}
