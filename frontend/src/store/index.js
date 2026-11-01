import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/authSlice';
import location from './slices/locationSlice';
import ui from './slices/uiSlice';
import services from './slices/servicesSlice';
import cart from './slices/cartSlice';
import wishlist from './slices/wishlistSlice';
import checkout from './slices/checkoutSlice';
import panel from './slices/panelSlice';

export const makeStore = () => configureStore({ reducer: { auth, location, ui, services, cart, wishlist, checkout, panel } });
