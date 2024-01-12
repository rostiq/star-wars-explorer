import { createSlice } from "@reduxjs/toolkit";

import { idFromUrl } from "../utils/functions";
import { initialFilters } from "../utils/constants";

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    list: [],
    movies: [],
    species: [],
    starships: [],
    characterDetails: null,
    characterId: null,
    loading: false,
    error: null,
    filters: initialFilters,
  },
  reducers: {
    updateRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCharacters: (state, action) => {
      state.list = action.payload.map((character) => ({
        ...character,
        id: idFromUrl(character.url),
      }));
      state.loading = false;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
    },
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setSpecies: (state, action) => {
      state.species = action.payload;
    },
    setStarships: (state, action) => {
      state.starships = action.payload;
    },
    setCharacterDetails: (state, action) => {
      state.characterDetails = action.payload;
    },
    setCharacterId: (state, action) => {
      state.characterDetails = state.list.find(
        (character) => character.id === action.payload
      );
    },
  },
});

export const {
  setCharacters,
  setFilters,
  clearFilters,
  setMovies,
  setSpecies,
  setStarships,
  setCharacterDetails,
  setCharacterId,
  updateRequest,
  updateError,
} = charactersSlice.actions;

export default charactersSlice.reducer;
