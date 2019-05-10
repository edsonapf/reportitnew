import {UPDATE_OCCURRENCE, UPDATE_OCCURRENCES} from '../actions/types';

const initiaState = { 
    current:{
        description:'',
        date:'',
        type:'',
        itemsLost:'',
        location:{
            address:'',
            latt:'',
            long:'',
        },
    },
    list:[
        {
            description:'',
            date:'',
            type:'',
            itemsLost:'',
            location:{
                address:'',
                latt:'',
                long:'',
            },
        }
    ],
};

const occcurrenceReducer = (state = initiaState, {type, payload}) => {
    switch(type){
        case UPDATE_OCCURRENCE:
            return {
                ...state,
                current: payload,
            };
        case UPDATE_OCCURRENCES:
            return {
                ...state,
                list: payload,
            };
        default:
            return state;
    }
};



export default occcurrenceReducer;