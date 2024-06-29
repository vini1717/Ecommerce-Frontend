// A mock function to mimic making an async request for data
export const createUser = (userData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/auth/signup", {
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
    try{
      const response = await fetch("http://localhost:8080/auth/login",{
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: {'content-type': 'application/json'}
    })
    if(response.ok)
    {
      const data = await response.json()
    console.log({data});
    // resolve({ data: data[0] })
    resolve({data})
    }
    else{
      const error = await response.json();
      reject(error)
    }
    
    }
    catch(error){
      reject(error)
    }
   
  })
}


export const signOut = (userId) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    resolve({ data: 'success' })
  })
}