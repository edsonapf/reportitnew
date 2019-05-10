import {UPDATE_USER } from '../actions/types';


const initialState = {
        name: 'Usuário Default',
        username: 'default',
        registrationNumber: '000.000.000-00',
        profile: null,
        isLogged:false,
        token:'',
        id:'',
}

const usersReducer = (state = initialState, { type,  payload }) => {
    switch(type){
        case UPDATE_USER:
            return {
                ...state,
                ...payload,
            }
        default:
            return state;


    }
}

export default usersReducer;