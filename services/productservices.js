export  function getAllProducts(requestOptions) {
    const data =fetch(`/api/products`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getProductById(id,requestOptions) {
    const data =fetch(`/api/products/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function addProduct(headers,formData) {
    const data =fetch(`/api/products/create`,{
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
    const data =fetch(`/api/products/${id}`,{
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
    const data =fetch(`/api/products/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getRequestByUser(id,requestOptions) {
    const data =fetch(`/api/req/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function processRequest(requestOptions) {
    const data =fetch(`/api/req/process`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getProductsByUserId(id,requestOptions) {
    const data =fetch(`/api/products/user/${id}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

