export const NAVIGATE = {
  home: "/",
  characters: "/characters/",
};

export const ROUTES = {
  home: "/",
  characters: "/characters/:id",
};

export const FILTER_TYPES = {
  name: {
    label: "Name",
    key: "name",
  },
  gender: {
    label: "Gender",
    key: "gender",
  },
  movie: {
    label: "Movie",
    key: "movie",
  },
  massMin: {
    label: "Min weight",
    key: "massMin",
  },
  massMax: {
    label: "Max weight",
    key: "massMax",
  },
  height: {
    label: "Height",
    key: "height",
  },
};

export const GENDER_TYPES = [
  {
    label: "Male",
    key: "male",
  },
  {
    label: "Female",
    key: "female",
  },
  {
    label: "Other",
    key: "other",
  },
];

export const gendersExclude = ["n/a", "hermaphrodite"];

export const descriptionExclude = [
  "opening_crawl",
  "url",
  "homeworld",
  "title",
];

export const gridResponsive = {
  gutter: 16,
  xs: 1,
  sm: 1,
  md: 2,
  lg: 2,
  xl: 3,
  xxl: 3,
};

export const initialFilters = {
  movie: null,
  name: "",
  gender: null,
  massMin: "",
  massMax: "",
};
