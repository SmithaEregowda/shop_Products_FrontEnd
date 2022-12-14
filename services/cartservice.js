export  function postCart(requestOptions) {
    const data =fetch(`/api/cart/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getCartByUser(userId,requestOptions) {
    const data =fetch(`/api/cart/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function removefromCart(userId,prodId,requestOptions) {
    const data =fetch(`/api/cart/${userId}?prodId=${prodId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function clearCart(userId,requestOptions) {
    const data =fetch(`/api/cart/clear/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }