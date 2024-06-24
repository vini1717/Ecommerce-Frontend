import { useState } from "react"

import { useDispatch, useSelector } from "react-redux"
// import styles from "./Counter.module.css"
import {
  increment,
  incrementAsync,
  selectCount,
  selectStatus,
} from "./orderSlice"

export const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector(selectCount)
  const status = useSelector(selectStatus)

  return <div></div>
}
