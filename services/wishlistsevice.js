export  function postWishList(requestOptions) {
    const data =fetch(`/api/wishlist/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getwishlistByUser(userId,requestOptions) {
    const data =fetch(`/api/wishlist/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function removefromwishlist(userId,prodId,requestOptions) {
    const data =fetch(`/api/wishlist/${userId}?prodId=${prodId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }