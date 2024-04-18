
// let API_PATH='http://localhost:3000'
let API_PATH=''
if(process.env.NODE_ENV==="production"){
    API_PATH='https://shop-products-api-1q6w.vercel.app'
}
export  function getAllProducts(requestOptions,query) {
    const data =fetch(`${API_PATH}/api/products?limit=${query?.limit}&pageNo=${query?.pageNo}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getProductById(id,requestOptions) {
    const data =fetch(`${API_PATH}/api/products/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function addProduct(headers,formData) {
    const data =fetch(`${API_PATH}/api/products/create`,{
        method:'POST',
        headers:headers,
        body:formData
    })
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function updateProduct(id,headers,formData) {
    const data =fetch(`${API_PATH}/api/products/${id}`,{
        method:'PUT',
        headers:headers,
        body:formData
    })
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function deleteProductById(id,requestOptions) {
    const data =fetch(`${API_PATH}/api/products/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getRequestByUser(id,requestOptions) {
    const data =fetch(`${API_PATH}/api/req/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function processRequest(requestOptions) {
    const data =fetch(`${API_PATH}/api/req/process`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getProductsByUserId(id,requestOptions) {
    const data =fetch(`${API_PATH}/api/products/user/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

