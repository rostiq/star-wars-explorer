import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Input, Radio, Button, Space } from 'antd';

import { useSwapi } from '../hooks/useSwapi';
import { selectCharactersLength, selectFilters, selectMovies, setFilters, clearFilters } from '../redux/charactersSlice';
import { FILTER_TYPES, GENDER_TYPES } from '../utils';

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
  }, [])

  const onFiltersChange = (key, value) => {
    dispatch(setFilters({[key]: value }));
  }

  const handleClearFilters = () => {
    dispatch(clearFilters());
  }

  const onRadioChange = (value) => {
  onFiltersChange(FILTER_TYPES.movie.key, value)
  }

  return (
    <Space wrap>
      <Select
        style={{ width: 180 }}
        onChange={onRadioChange}
        options={moviesOptions}
        value={filters?.movie}
        loading={moviesOptions?.length ? false : true}
        placeholder={FILTER_TYPES.movie.label}
      />

      <Input placeholder={FILTER_TYPES.name.label} value={filters?.name} onChange={(e) => onFiltersChange(FILTER_TYPES.name.key, e.target.value)} />

      <Radio.Group onChange={(e) => onFiltersChange(FILTER_TYPES.gender.key, e.target.value)} value={filters?.gender}>
        <Radio value={GENDER_TYPES.male.key}>{GENDER_TYPES.male.label}</Radio>
        <Radio value={GENDER_TYPES.female.key}>{GENDER_TYPES.female.label}</Radio>
        <Radio value={GENDER_TYPES.other.key}>{GENDER_TYPES.other.label}</Radio>
      </Radio.Group>

      <Input placeholder={FILTER_TYPES.massMin.label} value={filters?.massMin} onChange={(e) => onFiltersChange(FILTER_TYPES.massMin.key, e.target.value)} />
      <Input placeholder={FILTER_TYPES.massMax.label} value={filters?.massMax} onChange={(e) => onFiltersChange(FILTER_TYPES.massMax.key, e.target.value)} />

      <Button type="primary" onClick={handleClearFilters}>Clear Filters</Button>
    </Space>
  );
}