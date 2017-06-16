/**
 * Created by Iamnauber on 2017-06-11.
 */

import * as firebase from 'firebase';
const database = firebase.database();

const initialState = {

    tempProduct: {
        name: '',
        price: 0,
        amount: 0,
        cartAmount: 0,
        image: '',
        id: 0
    }

}

const formReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){

        case 'SET_NAME':
            newState = {...state, tempProduct: {...state.tempProduct, name: action.payload}}
            return newState;
        case 'SET_PRICE':
            newState = {...state, tempProduct: {...state.tempProduct, price: Number(action.payload)}}
            return newState;
        case 'SET_AMOUNT':
            newState = {...state, tempProduct: {...state.tempProduct, amount: Number(action.payload)}}
            return newState;
        case 'SET_IMAGE':
            newState = {...state, tempProduct: {...state.tempProduct, image: action.payload}}
            return newState;

        case 'ADD_NEW_PRODUCT':
            newState = initialState;
            return newState;

        case 'PUSH_TO_DATABASE':

            /*database.ref('products/').push(
                newState.tempProduct

            )*/

            //return newState;

            break;

            default:
                return state;

    }

}

export default formReducer;