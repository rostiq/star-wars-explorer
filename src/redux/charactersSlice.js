import { createSlice,createSelector } from "@reduxjs/toolkit";
import { GENDER_TYPES, idFromUrl } from "../utils";

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
    filters: {
      movie: null,
      name: '',
      gender: null,
      massMin: '',
      massMax: '',
    },
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
      state.filters = {
        movie: null,
        name: '',
        gender: null,
        massMin: '',
        massMax: '',
      };
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
      state.characterDetails = state.list.find((character) => character.id === action.payload);
    }
  },
});

export const { setCharacters, setFilters, clearFilters, setMovies, setSpecies, setStarships, setCharacterDetails, setCharacterId, updateRequest, updateError } = charactersSlice.actions;

export const selectCharacters = (state) => state.characters.list;
export const selectFilters = (state) => state.characters.filters;
export const selectCharacterDetails = (state) => state.characters.characterDetails;
export const selectMovies = (state) => state.characters.movies;
export const selectSpecies = (state) => state.characters.species;
export const selectStarships = (state) => state.characters.starships;
export const selectLoading = (state) => state.characters.loading;
export const selectError = (state) => state.characters.error;

export const selectCharactersLength = (state) => selectCharacters(state).length;

export const selectFilteredCharacters = createSelector(
  [selectCharacters, selectFilters],
  (characters, filters) => {
    const { movie, name, gender, massMin, massMax } = filters;

    return characters.filter((character) => {
      const movieFilter = movie ? character.films.includes(movie) : true;
      
      const nameFilter = name ? character.name.toLowerCase().includes(name.toLowerCase()) : true;
      const genderFilter = () => {
        switch (gender) {
          case GENDER_TYPES.male.key:
            return character.gender === GENDER_TYPES.male.key;
          case GENDER_TYPES.female.key:
            return character.gender === GENDER_TYPES.female.key;
          case GENDER_TYPES.other.key:
            return character.gender !== GENDER_TYPES.male.key && character.gender !== GENDER_TYPES.female.key;
          default:
            return true;
        }
      };
      
      const massFilter =
        massMin && massMax
          ? character.mass >= parseFloat(massMin) && character.mass <= parseFloat(massMax)
          : true;
  
      return movieFilter && nameFilter && genderFilter() && massFilter;
    });
  }
);

export default charactersSlice.reducer;
