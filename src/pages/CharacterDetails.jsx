
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Descriptions, Row, Spin, Typography } from 'antd';

import { selectCharacterDetails, setCharacterId, selectMovies, selectStarships, selectSpecies } from '../redux';
import { useSwapi } from '../hooks/useSwapi';
import { fixLabel, getDescriptionMetrics, getDescriptionValue } from '../utils/functions';
import { descriptionExclude, gridResponsive } from '../utils/constants';

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
      id: 1,
      label: 'Films',
      value: films.length,
      onClick: fetchMovies,
      isButton: moviesFromStore?.length ? false : true,
      loading: isLoadingMovies,
      data: moviesWithCharacter,
    },
    {
      id: 2,
      label: 'Starships',
      value: starships.length,
      onClick: fetchStarships,
      isButton: starshipsFromStore?.length ? false : true,
      loading: isLoadingStarships,
      data: starshipsWithCharacter,
    },
    {
      id: 3,
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
      if (descriptionExclude.includes(key)) {
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

        {enhancedInfoData.map(({ id, label, value, onClick, isButton, loading, data }) => {

          if (!value) {
            return null;
          }

          return (
            <Row key={id} span={12} className='info' >
              <Typography.Title level={4}>{label}</Typography.Title>
              {data.map((movie) => {
                const { episode_id, opening_crawl, title } = movie
                return (
                  <Col key={episode_id}>
                    <Typography.Title level={5}>{title}</Typography.Title>
                    <Typography.Text>{opening_crawl}</Typography.Text>
                    <Descriptions grid={gridResponsive}>
                      {generateDescriptionsItems(movie)}
                    </Descriptions>
                  </Col>
                )
              })}
              {isButton && <Button loading={loading} size='small' type="primary" onClick={onClick}>
                {loading ? '' : '+'}
              </Button>}
            </Row>
          )
        })
        }
      </Row>
    </>
  );
};

