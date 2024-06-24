// A mock function to mimic making an async request for data
export const createUser = (userData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    resolve({ data })
  })
}


export const checkUser = (loginInfo) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve,reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch("http://localhost:8080/users?email="+email)
    const data = await response.json()
    console.log({data});
    if(data.length && data[0].password === password)
    {

      resolve({ data: data[0] })
    }
    else{
      reject({message: "Wrong Username/Password"})
    }
   
  })
}


export const signOut = (userId) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    resolve({ data: 'success' })
  })
}