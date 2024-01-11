
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Descriptions, Row, Spin, Typography } from 'antd';

import { selectCharacterDetails, setCharacterId, selectMovies, selectStarships, selectSpecies } from '../redux/charactersSlice';
import { useSwapi } from '../hooks/useSwapi';
import { fixLabel, getDescriptionMetrics, getDescriptionValue } from '../utils';

export const CharacterDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { fetchCharacterDetails, fetchMovies, fetchSpecies, fetchStarships, isLoadingMovies, isLoadingStarships, isLoadingSpecies } = useSwapi();

  const characterDetails = useSelector(selectCharacterDetails);
  const moviesFromStore = useSelector(selectMovies);
  const starshipsFromStore = useSelector(selectStarships);
  const speciesFromStore = useSelector(selectSpecies);

  useEffect(() => {
    dispatch(setCharacterId(Number(id)));
  }, [id])

  if (!characterDetails?.name) {
    fetchCharacterDetails(Number(id));
    return <Spin />;
  }

  const { starships, films, species } = characterDetails;

  const moviesWithCharacter = moviesFromStore?.filter((movie) => films.includes(movie.url));
  const starshipsWithCharacter = starshipsFromStore?.filter((starship) => starships.includes(starship.url));
  const speciesWithCharacter = speciesFromStore?.filter((specie) => species.includes(specie.url));

  const enhancedInfoData = [
    {
      label: 'Films',
      value: films.length,
      onClick: fetchMovies,
      isButton: moviesFromStore?.length ? false : true,
      loading: isLoadingMovies,
      data: moviesWithCharacter,
    },
    {
      label: 'Starships',
      value: starships.length,
      onClick: fetchStarships,
      isButton: starshipsFromStore?.length ? false : true,
      loading: isLoadingStarships,
      data: starshipsWithCharacter,
    },
    {
      label: 'Species',
      value: species.length,
      onClick: fetchSpecies,
      isButton: speciesFromStore?.length ? false : true,
      loading: isLoadingSpecies,
      data: speciesWithCharacter,
    }
  ];

  const generateDescriptionsItems = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (key === 'homeworld' || key === 'url' || key === 'opening_crawl') {
        return;
      }
      return (
        <Descriptions.Item key={key} label={fixLabel(key)}>
          {getDescriptionValue(key, value)}
          {getDescriptionMetrics(key)}
        </Descriptions.Item>
      )
    });
  };

  return (
    <>
      <Descriptions title="Character Info">
        {generateDescriptionsItems(characterDetails)}
      </Descriptions>

      <Row gutter={16} >

        {enhancedInfoData.map(({ label, value, onClick, isButton, loading, data }) => {
          if (!value) {
            return null;
          }
          return (
            <Row key={label} span={12} className='info' >
              <Typography.Title level={4}>{label}</Typography.Title>
              {data.map((movie, index)=>{
                return (
                  <Descriptions key={movie.episode_id} title={`No. ${index+1}`} grid={{ gutter: 16, xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    xxl: 3, }}>
                {generateDescriptionsItems(movie)}
              </Descriptions>
                )
              })}
              {isButton && <Button loading={loading} size='small' type="primary" onClick={onClick}>
                {loading? '' : '+'} 
              </Button>}
            </Row>
          )
        })
        }
      </Row>
    </>
  );
};

