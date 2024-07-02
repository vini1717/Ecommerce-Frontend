export const addOrder = (order) => {
  console.log(order);
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    resolve({ data })
  })
}

export const updateOrder = (order) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/orders/"+ order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    resolve({ data })
  })
}


export const fetchAllOrders = (sort,pagination) => {
  let queryString = '';

  for(let key in sort)
{
  queryString+= `${key}=${sort[key]}&`;
}

  for(let key in pagination)
{
  queryString+= `${key}=${pagination[key]}&`;
}
// eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/orders?"+queryString);
    console.log(queryString);
    const data = await response.json();
    resolve({data})
  })
}