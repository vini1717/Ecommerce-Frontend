import { createAppSlice } from "../../app/createAppSlice"
import { checkUser, createUser, signOut, updateUser } from "./authAPI"

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    
    createUserAsync: create.asyncThunk(
      async (userData) => {
        const response = await createUser(userData)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.loggedInUser = action.payload
        }
      },
    ),
    checkUserAsync: create.asyncThunk(
      async (loginInfo, {rejectWithValue}) => {
        try{
          const response = await checkUser(loginInfo)
          return response.data;
        }
        catch(error)
        {
          console.log(error);
          return rejectWithValue(error);
        }
        
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.loggedInUser = action.payload
        },
        rejected: (state, action) => {
          state.status = "idle"
          state.error = action.payload
        }
      },
    ),
    signOutAsync: create.asyncThunk(
      async (userId) => {
        const response = await signOut(userId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.loggedInUser = null
        }
      },
    )
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: auth => auth.status,
    selectLoggedInUser: auth => auth.loggedInUser,
    selectError: auth=> auth.error
  },
})

// Action creators are generated for each case reducer function.
export const { createUserAsync, checkUserAsync, signOutAsync} = authSlice.actions

export const { selectLoggedInUser, selectError } = authSlice.selectors
