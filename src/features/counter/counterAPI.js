// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:3000")
    const data = await response.json()
    resolve({ data })
  })
}
