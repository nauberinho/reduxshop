/**
 * Created by naube on 2017-06-15.
 */

import * as firebase from 'firebase';
const database = firebase.database();

const historyReducer = (state = {

    actions: [],
    numberOfRegretables: 0

}, action) => {
    let newState = {...state}
        switch(action.type){

            case 'REGRET_ACTION':

           let newActions = newState.actions;
            for(let i=newState.actions.length-1; i>=0; i--){
                if(i>= action.payload) {

                    newActions.pop()
                }
            }
            newState.numberOfRegretables = newState.numberOfRegretables - action.regretableIndex;
            newState = {...newState, actions: newActions}
            return newState;
        }
    if(action.type!= 'REGRET_ACTION') {
        let newNumberOfRegretables= newState.numberOfRegretables;
        let newActionsList = state.actions;
        let bool;
        if (action.regretable == true) {
            bool = true
            newNumberOfRegretables++;
        }

        else {
            bool = false;

        }

        newActionsList.push(
            {
                message: action.type,
                regretable: bool,
                regretableIndex: newNumberOfRegretables
    }
    )

        newState = {...state, actions: newActionsList, numberOfRegretables: newNumberOfRegretables};


    }

    return newState;


}

/*
                type: 'SET_NAME',

                type: 'SET_PRICE',

                type: 'SET_AMOUNT',

                type: 'SET_IMAGE',

                type: 'PUSH_TO_DATABASE'

                        type: 'UPDATE_STATE'

                        type: 'ADD_NEW_PRODUCT'

                        type: 'EDITABLE'

                        type: 'SUBMIT_CHANGE'

                        type: 'UPDATE_CHANGED_PRODUCT'

                        type: 'DECREASE_CART_AMOUNT'
                        type: 'REMOVE_FROM_CART'

                        type: 'CHANGE_VIEW',

                        type: 'AUTHENTICATION',
*/




export default historyReducer;
