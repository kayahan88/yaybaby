const initialState = {
    user: {}
};

//action types
const LOGIN_USER = 'LOGIN_USER';
const GET_USER = 'GET_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const REGISTER_USER = 'REGISTER_USER';

//action creators
export function loginUser(payload){
    console.log('login user in reducer.js')
    return{
        type: LOGIN_USER,
        payload: payload
    }
};
export function registerUser(payload){
    console.log(payload)
    return{
        type: REGISTER_USER,
        payload: payload
    }
}
export function getUser(payload){
    console.log(payload)
    return{
        type: GET_USER,
        payload: payload
    }
}
export function logoutUser(){
    return{
        type: LOGOUT_USER,
        payload: initialState
    }
};

//reducer function
export default function reducer(state = initialState, action){
    const {payload} = action
    switch(action.type){
        case LOGIN_USER:
            return{...state, user: payload}
        case REGISTER_USER:
            return{...state, user: payload}
        case GET_USER:
            return{...state, user: payload}
        case LOGOUT_USER:
            return{...state, payload}
        default: 
            return state;
    }
};