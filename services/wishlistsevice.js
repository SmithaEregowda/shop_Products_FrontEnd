
let API_PATH=''
if(process.env.NODE_ENV==="production"){
    API_PATH='https://shop-products-api-1q6w.vercel.app'
}

export  function postWishList(requestOptions) {
    const data =fetch(`${API_PATH}/api/wishlist/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getwishlistByUser(userId,requestOptions) {
    const data =fetch(`${API_PATH}/api/wishlist/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function removefromwishlist(userId,prodId,requestOptions) {
    const data =fetch(`${API_PATH}/api/wishlist/${userId}?prodId=${prodId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }