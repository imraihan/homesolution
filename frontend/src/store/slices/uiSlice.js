import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: { menuOpen: false, servicesMenuOpen: false, cityMenuOpen: false, userMenuOpen: false },
  reducers: {
    toggleMenu: (s) => {
      s.menuOpen = !s.menuOpen;
    },
    closeMenus: (s) => {
      s.menuOpen = false;
      s.servicesMenuOpen = false;
      s.cityMenuOpen = false;
      s.userMenuOpen = false;
    },
    toggleUserMenu: (s) => {
      s.userMenuOpen = !s.userMenuOpen;
      s.servicesMenuOpen = false;
      s.cityMenuOpen = false;
    },
    toggleServicesMenu: (s) => {
      s.servicesMenuOpen = !s.servicesMenuOpen;
      s.cityMenuOpen = false;
      s.userMenuOpen = false;
    },
    toggleCityMenu: (s) => {
      s.cityMenuOpen = !s.cityMenuOpen;
      s.servicesMenuOpen = false;
      s.userMenuOpen = false;
    },
  },
});
export const { toggleMenu, closeMenus, toggleServicesMenu, toggleCityMenu, toggleUserMenu } = slice.actions;
export default slice.reducer;
