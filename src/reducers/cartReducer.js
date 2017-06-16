/**
 * Created by Iamnauber on 2017-06-14.
 */
import * as firebase from 'firebase';
const database = firebase.database();

var initialProducts = [{name: 'John Isa Elliott', price: 299, amount: 1, image: 'https://mobileimages.lowes.com/product/converted/740459/740459631775.jpg', cartAmount: 0, id: 0},
    {name: 'Eureza Delair', price: 4000, amount: 1, image: 'http://media.bellacor.com.edgesuite.net/images/500/79606091-055.jpg', cartAmount: 0, id: 1},
    {name: 'Golden watch', price: 50, amount: 49, image: 'http://da1urhpfd469z.cloudfront.net/uploads/advertphotos/17/0606/30775033-266-500x500.jpg', cartAmount: 0, id: 2},
    {name: 'Old Town Clocks', price: 119, amount: 49, image: 'https://ak1.ostkcdn.com/images/products/9540136/P16718907.jpg', cartAmount: 0, id: 3},
    {name: 'Sixty Minutes Clock', price: 119, amount: 6, image: 'http://target.scene7.com/is/image/Target/50333758?wid=360&hei=360&qlt=80&fmt=pjpeg', cartAmount: 0, id: 4}];

const cartReducer = (state = {
    cartProducts: initialProducts,
    total: 0,
    readOnly: true,
    idsToRemove: [],
    changedProducts: []
}, action) => {

    let newState = {...state};
    let newCartProducts = state.cartProducts;

    switch(action.type){
        case 'ADD_NEW_PRODUCT':
            let newProductsList1 = state.cartProducts
            let product = action.payload;
            product.cartAmount = 0;
            product.id = newProductsList1.length;
            newProductsList1.push(product);
            newState = {...state, cartProducts: newProductsList1 };
            return newState;

        case 'INCREASE_CART_AMOUNT':

            newCartProducts[action.payload.id].cartAmount++;
            newCartProducts[action.payload.id].amount--;
            newState = {...state, cartProducts: newCartProducts, total: (newState.total + Number(action.payload.price)) }
            return newState;

        case 'DECREASE_CART_AMOUNT':
            newCartProducts[action.payload.id].cartAmount--;
            newCartProducts[action.payload.id].amount++;
            newState = {...state, cartProducts: newCartProducts, total: newState.total - Number(action.payload.price)}
            return newState;

        case 'EDITABLE':
            newState.readOnly == true ? newState = {...newState, changedProducts: [...newState.cartProducts]} : newState={...newState, readOnly: true, changedProducts: []}
            return newState;

        case 'REMOVE_FROM_CART':
            let newTotal = newState.total - (newCartProducts[action.payload.id].cartAmount * newCartProducts[action.payload.id].price);
            newCartProducts[action.payload.id].amount += newCartProducts[action.payload.id].cartAmount;
            newCartProducts[action.payload.id].cartAmount -= newCartProducts[action.payload.id].cartAmount;

            newState = {...state, products: newCartProducts, total: newTotal}
            return newState;

        case 'UPDATE_CHANGED_PRODUCT':
            let value = action.payload.target.value;
            typeof action.payload.target.value == "number" ? Number(value) : null;
            console.log(action.payload.target.getAttribute('data-key') + ' = key')
            let newChangedProducts = newState.cartProducts;
            newChangedProducts[action.payload.target.getAttribute('data-key')][action.payload.target.id] = value;
            newState = {...newState, changedProducts: newChangedProducts}
            return newState;

        case 'SUBMIT_CHANGE':
            let newProducts;
            newState.changedProducts.length == 0 ? newProducts = newState.cartProducts : newProducts = newState.changedProducts;

            if(newState.idsToRemove.length>0) {
                let newList = [];
                for (let i = 0; i < newProducts.length; i++) {
                    if(newState.idsToRemove.indexOf(newProducts[i].id) == -1){

                        newList.push(newProducts[i])
                    }

                    console.log(newList, ' = newList')
                }
                for(let i= 0; i<newList.length; i++){

                    newList[i].id = i;
                }

                newProducts = newList;
            }

    newState.changedProducts.length == 0 ? newState = {...newState, changedProducts:  []} : newState = {...newState, cartProducts: newProducts, readOnly: true};

    return newState;


        case 'DELETE_PRODUCT':

            let idsToRemove = newState.idsToRemove;
            idsToRemove.push(action.payload);
            console.log('idstoremove ', idsToRemove)

            newState = {...newState, idsToRemove: idsToRemove}

           return newState;

        default:
            return newState;
    }




}

export default cartReducer;