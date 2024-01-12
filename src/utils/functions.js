import { gendersExclude } from "./constants";

export const idFromUrl = (url) => {
  const urlParts = url.split("/");
  const id = urlParts[urlParts.length - 2];
  return Number(id);
};

export const fixLabel = (key) => {
  const spaced = key.replace(/_/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

export const getDescriptionValue = (key, value) => {
  if (key === "created" || key === "edited") {
    return new Date(value).toLocaleString();
  }
  return typeof value === "object" ? value.length : value;
};

export const getDescriptionMetrics = (key) => {
  return key === "height" ? " cm" : key === "mass" ? " kg" : "";
};

export const getCorrectGender = (gender) => {
  if (gendersExclude.includes(gender)) {
    return "other";
  }
  return gender;
};
