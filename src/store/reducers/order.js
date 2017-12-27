import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    const updatedState = {
        purchased: false
    }
    return updatedState(state, updatedState);
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    };

    const updatedState = {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
    };
    return updateState(state, updatedState);
};

const purchaseBurgerFailed = (state, action) => {
    const updatedState = {
        loading: false
    };

    return updateState(state, updatedState);
};

const purchaseBurgerStart = (state, action) => {
    const updatedState = {
        loading: true
    };
    return updateState(state, updatedState);
};

const fetchOrdersStart = (state, action) => {
    const updatedState = {
        loading: true
    };
    return updateState(state, updatedState);
};

const fetchOrdersSuccess = (state, action) => {
    const updatedState = {
        orders: action.orders,
        loading: false
    };
    return updateState(state, updatedState);
};

const fetchOrdersFailed = (state, action) => {
    const updatedState = {
        loading: false,
        error: action.error
    };
    return updateState(state, updatedState);
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAILED:
            return purchaseBurgerFailed(state, action);

        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);

        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);

        case actionTypes.FETCH_ORDERS_FAILED:
            return fetchOrdersFailed(state, action);

        default:
            return state;
    }
}

export default reducer;