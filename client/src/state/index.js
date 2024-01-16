import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  posts: [],
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      // we are not changing state directly
      // toolkit uses immer, so we are replacing the object here
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      state.user = null
      state.token = null
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends
      } else {
        console.error('user has no friends lol')
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post
        return post
      })
      state.posts = updatedPosts
    },
  },
})

export const { setFriends, setLogin, setLogout, setMode, setPost, setPosts } =
  authSlice.actions

export default authSlice.reducer
