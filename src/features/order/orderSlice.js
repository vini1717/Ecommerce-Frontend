import { createAppSlice } from "../../app/createAppSlice"
import { addOrder, fetchAllOrders, updateOrder } from "./orderAPI"

const initialState = {
  order: [],
  status: "idle",
  currentOrder: null,
  totalOrders : 0
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const orderSlice = createAppSlice({
  name: "order",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: create => ({
    resetOrder: create.reducer(state => {
      state.currentOrder = null
    }),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    addOrderAsync: create.asyncThunk(
      async order => {
        const response = await addOrder(order)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.order.push(action.payload)
          state.currentOrder = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    updateOrderAsync: create.asyncThunk(
      async order => {
        const response = await updateOrder(order)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          const index = state.order.findIndex(order=> order.id === action.payload.id)
          state.order[index] = action.payload;
        }
      },
    ),
    fetchAllOrdersAsync: create.asyncThunk(
      async ({sort,pagination}) => {
        const response = await fetchAllOrders(sort, pagination)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.order = action.payload.data
          state.totalOrders = action.payload.items
        }
      },
    ),
  }),
 
  selectors: {
    selectOrder: order => order.order,
    selectStatus: order => order.status,
    selectCurrentOrder: order => order.currentOrder,
    selectTotalOrders: order=>order.totalOrders
  },
})

// Action creators are generated for each case reducer function.
export const { resetOrder, addOrderAsync, fetchAllOrdersAsync, updateOrderAsync } = orderSlice.actions

export const { selectOrder, selectStatus, selectCurrentOrder, selectTotalOrders} = orderSlice.selectors
