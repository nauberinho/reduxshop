/**
 * Created by Iamnauber on 2017-06-11.
 */
import * as firebase from 'firebase';
const database = firebase.database();

var productsList = [];
var initialProducts = [{name: 'Exhale', price: 199, amount: 100, image: 'https://www.jrrshop.com/media/catalog/product/m/g/mgn7ozl.png', cartAmount: 0, id: 0},
    {name: 'Gordon Wong', price: 1, amount: 100, image: 'http://content.rankinghero.com/walls/620680/activity_620680_1433197100_630.jpg', cartAmount: 0, id: 1},
    {name: 'Nike Magista', price: 119, amount: 49, image: 'http://www.prodirectsoccer.com/productimages/thumbs/153712.jpg', cartAmount: 0, id: 2},
    {name: 'Nike Magista', price: 119, amount: 49, image: 'http://www.prodirectsoccer.com/productimages/thumbs/153712.jpg', cartAmount: 0, id: 3}];

database.ref('products').on('value', (snapshot) => {

    let data = snapshot.val();


    for (let product in data) {
        productsList.push({
            name: data[product].name,
            price: data[product].price
        })
    }
});

const productsReducer = (state = {

    products: initialProducts,
    previousStates: [],
    readOnly: true,
    editText: 'Edit',
    changedProducts: [],
    editClass: 'edit-button',
    idsToRemove: []
}, action) => {
    let newState = {...state};

    let newPreviousStates;

    let newProductsList2 = state.products;

    switch(action.type){

        case 'UPDATE_STATE':
            let productsList1 = [];

            database.ref('products').on('value', snapshot => {

                let data = snapshot.val();


                for (let product in data) {
                    productsList1.push({
                        name: data[product].name,
                        price: data[product].price,
                        amount: 10,
                        id: productsList1.length-1
                    })
                }
            });

            newState = {...state, products: productsList1}
            return newState;

        case 'ADD_NEW_PRODUCT':

            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})

            let product = action.payload;
            product.id = newProductsList2.length;
            newProductsList2.push(product);
            newState = {...state, products: newProductsList2, previousStates: newPreviousStates}
            return newState;

        case 'INCREASE_CART_AMOUNT':
            newProductsList2[action.payload.id].amount--;
            newProductsList2[action.payload.id].cartAmount++
            newState = {...state, products: newProductsList2 }
            return newState;

        case 'DECREASE_CART_AMOUNT':
            newProductsList2[action.payload.id].amount++;
            newProductsList2[action.payload.id].cartAmount--
            newState = {...state, products: newProductsList2 }
            return newState;

        case 'REMOVE_FROM_CART':
            newProductsList2[action.payload.id].amount += newProductsList2[action.payload.id].cartAmount;
            newProductsList2[action.payload.id].cartAmount -= newProductsList2[action.payload.id].cartAmount;
            newState = {...state, products: newProductsList2 }
            return newState;

        case 'EDITABLE':
        newState.readOnly == true ? newState = {...newState, editClass: 'cancel-edit-button', readOnly: false, editText: 'Cancel edit', changedProducts: [...newState.products]}: newState={...newState, editClass: 'edit-button', readOnly: true, changedProducts: [], editText: 'Edit'}
            return newState;

        case 'UPDATE_CHANGED_PRODUCT':
            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})


            let value = action.payload.target.value;
            typeof action.payload.target.value == "number" ? Number(value) : null;
            console.log(action.payload.target.getAttribute('data-key') + ' = key')
            let newChangedProducts = newState.products;
            newChangedProducts[action.payload.target.getAttribute('data-key')][action.payload.target.id] = value;
            newState = {...newState, changedProducts: newChangedProducts, previousStates: newPreviousStates}
            return newState;

        case 'SUBMIT_CHANGE':
            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})


            let newProducts = newState.changedProducts;
            if(newState.idsToRemove.length>0) {
                let newList = [];
                console.log(newList, 'idsToRemoveIsLongerThan 1', 'newProductslength: ' , newProducts.length)
                for (let i = 0; i < newProducts.length; i++) {
                    if(newState.idsToRemove.indexOf(newProducts[i].id) == -1){

                        newList.push(newProducts[i])
                    }



                }
                for (let j = 0; j < newList.length; j++) {

                    newList[j].id = j;
                }
                newProducts = newList;
            }

            newState = {...newState, products: newProducts, readOnly: true, editText: 'Edit', previousStates: newPreviousStates};
            //newState.changedProducts.length == 0 || newState.idsToRemove.length == 0 ? newState = {...newState, changedProducts:  []} : newState = {...newState, products: newProducts, readOnly: true, editText: 'Edit'};

            return newState;

        case 'DELETE_PRODUCT':
            newPreviousStates = [...newState.previousStates]
            newPreviousStates.push({...newState})


            let idsToRemove = newState.idsToRemove;
            idsToRemove.push(action.payload);
            console.log('idstoremove ', idsToRemove);
            newState = {...newState, idsToRemove: idsToRemove, previousStates: newPreviousStates }



            return newState;


        case 'REGRET_ACTION':
            console.log( newState.previousStates[action.payload-1], ' indexing previous state')
            let beforeState = {...newState.previousStates[action.payload-1]}
            newState = {...beforeState}
            /*newPreviousStates = newState.previousStates;
            for(let i=newPreviousStates.length-1; i>=0; i--){
                if(i>= action.payload) {

                    newPreviousStates.pop()
                }
            }
            newState = {...newState, previousStates: newPreviousStates}*/
            return newState;
        default:
                return newState;



    }



}


export default productsReducer;
