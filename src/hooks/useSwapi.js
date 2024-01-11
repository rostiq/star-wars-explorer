import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setCharacters,
  setMovies,
  setStarships,
  setSpecies,
  updateRequest,
  updateError,
  selectCharacters,
  setCharacterDetails,
} from "../redux/charactersSlice";
import { useEffect, useState } from "react";

const BASE_URL = "https://swapi.dev/api";

export const useSwapi = () => {
  const dispatch = useDispatch();
  const characters = useSelector(selectCharacters);
  const [nextCharacterFetch, setNextCharacterFetch] = useState(null);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [isLoadingStarships, setIsLoadingStarships] = useState(false);
  const [isLoadingSpecies, setIsLoadingSpecies] = useState(false);

  useEffect(() => {
    if (nextCharacterFetch){
      fetchNextPage(nextCharacterFetch);
    }
  }, [nextCharacterFetch]);

  const handleUpdateError = (error) => {
    dispatch(updateError("Something went wrong. Please contact support"));
    console.log(error);
  };
  const fetchCharacterDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/people/${id}`);
      dispatch(setCharacterDetails(response.data));
    } catch (error) {
      handleUpdateError(error);
    }
  };

  const fetchCharacters = async () => {
    try {
      dispatch(updateRequest());
      const response = await axios.get(`${BASE_URL}/people/`);
      dispatch(setCharacters([...characters, ...response.data.results]));
      if (response.data.next) {
        setNextCharacterFetch(response.data.next);
      }
    } catch (error) {
      handleUpdateError(error);
    }
  };

  const fetchNextPage = async (url) => {
    try {
      const response = await axios.get(url);
      dispatch(setCharacters([...characters, ...response.data.results]));
      if (response.data.next) {
        setNextCharacterFetch(response.data.next);
      }
    } catch (error) {
      handleUpdateError(error);
    }
  }

  const fetchSpecies = async () => {
    setIsLoadingSpecies(true);
    try {
      const response = await axios.get(`${BASE_URL}/species/`);
      dispatch(setSpecies(response.data.results));
    } catch (error) {
      handleUpdateError(error);
    } finally {
      setIsLoadingSpecies(false);
    }
  };

  const fetchMovies = async () => {
    setIsLoadingMovies(true);
    try {
      const response = await axios.get(`${BASE_URL}/films/`);
      dispatch(setMovies(response.data.results));
    } catch (error) {
      handleUpdateError(error);
    } finally {
      setIsLoadingMovies(false);
    }
  };

  const fetchStarships = async () => {
    setIsLoadingStarships(true);
    try {
      const response = await axios.get(`${BASE_URL}/starships/`);
      dispatch(setStarships(response.data.results));
    } catch (error) {
      handleUpdateError(error);
    } finally {
      setIsLoadingStarships(false);
    }
  }

  return { fetchCharacterDetails, fetchCharacters,fetchMovies, fetchSpecies, fetchStarships, isLoadingMovies, isLoadingStarships, isLoadingSpecies };
};
