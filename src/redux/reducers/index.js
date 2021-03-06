import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import menuReducer from './menu.reducer';
import authReducer from './auth.reducer';
import shopReducer from './shop.reducer';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';

const rootReducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
  shop: shopReducer,
  cart: cartReducer,
  user: userReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
};

export default persistReducer(persistConfig, rootReducer);
