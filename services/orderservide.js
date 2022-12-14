export  function postOrder(requestOptions) {
    const data =fetch(`/api/orders/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function getOrdersByUser(userId,requestOptions) {
    const data =fetch(`/api/orders/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   
   export  function postPayment(requestOptions) {
    const data =fetch(`/api/pay`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }