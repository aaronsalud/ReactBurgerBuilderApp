import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

let updatedState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            updatedState = {
                purchased: false
            }
            return updatedState(state, updatedState);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };

            updatedState = {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            };
            return updateState(state, updatedState);
        case actionTypes.PURCHASE_BURGER_FAILED:          
            updatedState =  {
                loading: false
            };
            return updateState(state, updatedState);
        case actionTypes.PURCHASE_BURGER_START:
            updatedState = {
                loading: true
            };
            return updateState(state, updatedState);
        case actionTypes.FETCH_ORDERS_START:
            updatedState = {
                loading: true
            };
            return updateState(state, updatedState);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            updatedState = {
                orders: action.orders,
                loading: false
            };
            return updateState(state, updatedState);
        case actionTypes.FETCH_ORDERS_FAILED:
            updatedState = {
                ...state,
                loading: false,
                error: action.error
            };
            return updateState(state, updatedState);
        default:
            return state;
    }
}

export default reducer;