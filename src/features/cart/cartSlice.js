import { createAppSlice } from "../../app/createAppSlice"
import { addToCart, deleteItemFromCart, fetchIemsbyUserId, resetCart, updateCart } from "./cartAPI"

const initialState = {
  value: 0,
  status: "idle",
  items: []
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const addToCartSlice = createAppSlice({
  name: "cart",
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
    addtoCartAsync: create.asyncThunk(
      async item => {
        const response = await addToCart(item)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.items.push(action.payload);
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    fetchItemsbyUserIdAsync: create.asyncThunk(
      async userId => {
        const response = await fetchIemsbyUserId(userId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.items = action.payload;
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    updateCartItemsAsync: create.asyncThunk(
      async (update) => {
        const response = await updateCart(update)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          const index = state.items.findIndex(item=> item.id === action.payload.id)
          state.items[index] = action.payload;
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    deleteItemsFromCartAsync: create.asyncThunk(
      async itemId => {
        const response = await deleteItemFromCart(itemId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          const index = state.items.findIndex(item=> item.id === action.payload.id)
          state.items.splice(index,1);
        }
      },
    ),
    resetCartAsync: create.asyncThunk(
      async userId => {
        const response = await resetCart(userId)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.items = [];
        }
      },
    )
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: cart=> cart.status,
    selectItems: cart => cart.items,
  },
})

// Action creators are generated for each case reducer function.
export const {addtoCartAsync, fetchItemsbyUserIdAsync, updateCartItemsAsync, deleteItemsFromCartAsync, resetCartAsync } = addToCartSlice.actions

export const { selectStatus, selectItems } = addToCartSlice.selectors
