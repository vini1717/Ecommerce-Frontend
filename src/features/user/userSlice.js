import { createAppSlice } from "../../app/createAppSlice"
import {  fetchUserInfo, fetchUserOrders, updateUser } from "./userAPI"

const initialState = {
  userOrders: [],
  status: "idle",
  userInfo: null
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const userSlice = createAppSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    fetchUserOrdersAsync: create.asyncThunk(
      async (userId) => {
        const response = await fetchUserOrders(userId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.userOrders = action.payload
        }
      },
    ),
    updateUserAsync: create.asyncThunk(
      async (update) => {
        const response = await updateUser(update)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.userInfo = action.payload
        },
        rejected: (state, action) => {
          state.status = "idle"
          state.error = action.error
        }
      },
    ),
    fetchUserInfoAsync: create.asyncThunk(
      async (update) => {
        const response = await fetchUserInfo(update)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.userInfo = action.payload
        }
      },
    )
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectuserOrders: user => user.userOrders,
    selectStatus: user => user.status,
    selectUserInfo : user=>user.userInfo
  },
})

// Action creators are generated for each case reducer function.
export const { increment, fetchUserOrdersAsync, updateUserAsync, fetchUserInfoAsync } = userSlice.actions

export const { selectuserOrders, selectStatus, selectUserInfo} = userSlice.selectors
