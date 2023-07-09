let API_PATH=''
    if(process.env.NODE_ENV==="production"){
        API_PATH='https://shop-products-api-1q6w.vercel.app'
    }
export  function postCart(requestOptions) {
    const data =fetch(`${API_PATH}/api/cart/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getCartByUser(userId,requestOptions) {
    const data =fetch(`${API_PATH}/api/cart/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function removefromCart(userId,prodId,requestOptions) {
    const data =fetch(`${API_PATH}/api/cart/${userId}?prodId=${prodId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function clearCart(userId,requestOptions) {
    const data =fetch(`${API_PATH}/api/cart/clear/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }