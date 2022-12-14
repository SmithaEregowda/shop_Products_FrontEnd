import { createStore } from 'redux'; 
const userReducer = (state = { user: {} }, action) => {
    if (action.type === 'addUser') {
        return {  
            user: {
                ...action.payload
            }
        }
    }
    return state;
}
const store=createStore(userReducer);
export default store