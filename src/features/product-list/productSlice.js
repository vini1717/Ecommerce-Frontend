import { createAppSlice } from "../../app/createAppSlice"
import { fetchAllProducts, fetchProductsByFilter, fetchAllBrands, fetchAllCategories, fetchProductById, createProduct, updateProduct } from "./productAPI"

const initialState = {
  products: [],
  status: "idle",
  totalItems: 0,
  brands: [],
  categories: [],
  selectedProduct: null
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const productSlice = createAppSlice({
  name: "product",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    clearSelectedProduct: create.reducer(state => {
      state.selectedProduct = null
    }),
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    fetchAllProductsAsync: create.asyncThunk(
      async () => {
        const response = await fetchAllProducts()
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.products = action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    fetchProductsByFilterAsync: create.asyncThunk(
      async ({filter,sort,pagination,admin}) => {
        const response = await fetchProductsByFilter({filter,sort,pagination,admin})
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.products = action.payload.data;
          state.totalItems = action.payload.items;
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    fetchBrandsAsync: create.asyncThunk(
      async () => {
        const response = await fetchAllBrands()
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.brands = action.payload;
  
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    fetchCategoriesAsync: create.asyncThunk(
      async () => {
        const response = await fetchAllCategories()
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.categories = action.payload;
  
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    fetchProductByIdAsync: create.asyncThunk(
      async (id) => {
        const response = await fetchProductById(id)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.selectedProduct = action.payload;
  
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    createProductAsync: create.asyncThunk(
      async (product) => {
        const response = await createProduct(product)
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.products.push(action.payload);
        }
      },
    ),
    updateProductAsync: create.asyncThunk(
      async (product) => {
        const response = await updateProduct(product)
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          const index = state.products.findIndex(product=> product.id === action.payload.id)
          state.products[index] = action.payload;
        }
      },
    )
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectAllProducts: product => product.products,
    selectStatus: product => product.status,
    selectTotalItems: product=> product.totalItems,
    selectBrands: product => product.brands,
    selectCategories: product => product.categories,
    selectProductById: product => product.selectedProduct,
  },
})

// Action creators are generated for each case reducer function.
export const { increment, fetchAllProductsAsync, fetchProductsByFilterAsync, fetchBrandsAsync, fetchCategoriesAsync, fetchProductByIdAsync, createProductAsync, updateProductAsync,clearSelectedProduct} = productSlice.actions

export const { selectAllProducts, selectStatus, selectTotalItems, selectBrands, selectCategories, selectProductById } = productSlice.selectors
