export const fetchAllProducts = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/products")
    const data = await response.json()
    resolve({data})
  })
}


export const fetchProductById = (id) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/products/" + id)
    const data = await response.json()
    resolve({data})
  })
}


export const fetchProductsByFilter = ({filter,sort,pagination}) => {
  //filter={category: [smartphone, laptop]}
let queryString = '';
for (let key in filter)
{
  if(filter[key].length > 0)
  {
    const lastCategory = filter[key][filter[key].length-1];
    queryString+= `${key}=${lastCategory}&`;
  }
  
}
for(let key in sort)
{
  queryString+= `${key}=${sort[key]}&`;
}

for(let key in pagination)
{
  queryString+= `${key}=${pagination[key]}&`;
}
console.log(queryString)
// eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/products?"+queryString);
    const data = await response.json();
    console.log(data)
    resolve({data})
  })
}


export const createProduct = (product) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/products/",{
      method: "POST",
      body: JSON.stringify(product),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    resolve({data})
  })
}


export const updateProduct = (update) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/products/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {'content-type': 'application/json'}
    })
    const data = await response.json()
    resolve({ data })
  })
}


export const fetchAllCategories = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/categories")
    const data = await response.json()
    resolve({data})
  })
}

export const fetchAllBrands = () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await fetch("http://localhost:8080/brands")
    const data = await response.json()
    resolve({data})
  })
}