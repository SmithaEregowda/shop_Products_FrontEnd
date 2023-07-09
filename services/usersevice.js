let API_PATH=''
    if(process.env.NODE_ENV==="production"){
        API_PATH='https://shop-products-api-1q6w.vercel.app'
    }
export  function signup(requestOptions) {
 const data =fetch(`${API_PATH}/api/user/signup`,requestOptions)
    .then(res => {
        return res.json();
    }).then(data=>{return data;} )
        return data;
}
export  function login(requestOptions) {
    const data =fetch(`${API_PATH}/api/user/login`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function getUser(userId,requestOptions) {
    const data =fetch(`${API_PATH}/api/user/profile/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function getAllUsers(query,requestOptions) {
    const data =fetch(`${API_PATH}/api/user/profiles?${query}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function forgotpassword(requestOptions) {
    const data =fetch(`${API_PATH}/api/user/forgot-password`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function resetPassword(requestOptions,token) {
    const data =fetch(`${API_PATH}/api/user/reset-password/${token}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function updateUser(headers,formData,userId) {
    const data =fetch(`${API_PATH}/api/user/update-user/${userId}`,{
        method:'PUT',
        headers:headers,
        body:formData
    })
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }