import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Input, Radio, Button, Space } from 'antd';

import { useSwapi } from '../hooks/useSwapi';
import { selectCharactersLength, selectFilters, selectMovies, setFilters, clearFilters } from '../redux';
import { FILTER_TYPES, GENDER_TYPES } from '../utils/constants';

const selectStyles = { width: 180 };

export const Filter = () => {

  const dispatch = useDispatch();
  const { fetchMovies, fetchCharacters } = useSwapi();

  const filters = useSelector(selectFilters);
  const charactersLength = useSelector(selectCharactersLength);

  const movies = useSelector(selectMovies);
  const moviesOptions = movies?.map((movie) => ({ value: movie.url, label: movie.title }));

  useEffect(() => {
    if (!charactersLength) {
      fetchCharacters();
    }
    if (!movies?.length) {
      fetchMovies();
    }
  }, [charactersLength, fetchCharacters, fetchMovies, movies?.length])

  const onFiltersChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  }

  const handleClearFilters = () => {
    dispatch(clearFilters());
  }
  const onRadioChange = (value) => {
    onFiltersChange(FILTER_TYPES.movie.key, value)
  }


  const onNameChange = (e) => {
    const value = e.target.value;
    onFiltersChange(FILTER_TYPES.name.key, value);
  }

  const onGenderChange = (e) => {
    const value = e.target.value;
    onFiltersChange(FILTER_TYPES.gender.key, value);
  }

  const onMassMinChange = (e) => {
    const value = e.target.value;
    onFiltersChange(FILTER_TYPES.massMin.key, value);
  }

  const onMassMaxChange = (e) => {
    const value = e.target.value;
    onFiltersChange(FILTER_TYPES.massMax.key, value);
  }

  return (
    <Space wrap>
      <Select
        style={selectStyles}
        onChange={onRadioChange}
        options={moviesOptions}
        value={filters?.movie}
        loading={moviesOptions?.length ? false : true}
        placeholder={FILTER_TYPES.movie.label}
      />

      <Input placeholder={FILTER_TYPES.name.label} value={filters?.name} onChange={onNameChange} />

      <Radio.Group onChange={onGenderChange} value={filters?.gender}>
        {GENDER_TYPES.map((gender) => {
          const { key, label } = gender;
          return (
            <Radio key={key} value={key}>
              {label}
            </Radio>
          );
        })}
      </Radio.Group>

      <Input placeholder={FILTER_TYPES.massMin.label} value={filters?.massMin} onChange={onMassMinChange} />
      <Input placeholder={FILTER_TYPES.massMax.label} value={filters?.massMax} onChange={onMassMaxChange} />

      <Button type="primary" onClick={handleClearFilters}>Clear Filters</Button>
    </Space>
  );
}