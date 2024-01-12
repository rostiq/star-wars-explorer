import { createSelector } from "@reduxjs/toolkit";

import { getCorrectGender } from "../utils/functions";

export const selectCharacters = (state) => state.characters.list;
export const selectFilters = (state) => state.characters.filters;
export const selectCharacterDetails = (state) =>
  state.characters.characterDetails;
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

      const nameFilter = name
        ? character.name.toLowerCase().includes(name.toLowerCase())
        : true;

      const genderFilter = gender
        ? getCorrectGender(character.gender) === gender
        : true;

      const massFilter =
        massMin && massMax
          ? character.mass >= parseFloat(massMin) &&
            character.mass <= parseFloat(massMax)
          : true;

      return movieFilter && nameFilter && genderFilter && massFilter;
    });
  }
);
