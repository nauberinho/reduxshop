/**
 * Created by Iamnauber on 2017-06-14.
 */
import * as firebase from 'firebase';
const database = firebase.database();

var initialProducts = [{name: 'Exhale', price: 199, amount: 100, image: 'https://www.jrrshop.com/media/catalog/product/m/g/mgn7ozl.png', cartAmount: 0, id: 0},
    {name: 'Gordon Wong', price: 1, amount: 100, image: 'http://content.rankinghero.com/walls/620680/activity_620680_1433197100_630.jpg', cartAmount: 0, id: 1},
    {name: 'Nike Magista', price: 119, amount: 49, image: 'http://www.prodirectsoccer.com/productimages/thumbs/153712.jpg', cartAmount: 0, id: 2},
    {name: 'Nike Magista', price: 119, amount: 49, image: 'http://www.prodirectsoccer.com/productimages/thumbs/153712.jpg', cartAmount: 0, id: 3}];

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
            newCartProducts[action.payload.id].amount += newCartProducts[action.payload.id].cartAmount;
            newCartProducts[action.payload.id].cartAmount -= newCartProducts[action.payload.id].cartAmount;
            newState = {...state, products: newCartProducts, total: 0 }
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