import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  data: false,
}

const modalSlice = createSlice({
  name: modal,
  initialState,
  reducers: {},
})

export default modalSlice.reducer
