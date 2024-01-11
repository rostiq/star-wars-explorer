
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, List, Col, Row, Statistic, Typography, Space } from 'antd';

import { selectFilteredCharacters, selectLoading } from '../redux/charactersSlice';
import { Filter } from '../components';

const { Text } = Typography;

export const Main = () => {

  const characters = useSelector(selectFilteredCharacters);
  const loading = useSelector(selectLoading);

  return (
    <Space direction="vertical" >
      <Text>Choose character:</Text>

      <Filter />

      <List
        grid={{ gutter: 16, xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3, }}
        dataSource={characters}
        loading={loading}
        pagination={{ position: 'bottom', align: 'center', pageSize: 9 }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Link to={`/characters/${item.id}`}>
              <Card title={item.name}>
                <Row gutter={12}>
                  <Col span={12}>
                    <Statistic title="Gender" value={item.gender} />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Skin" value={item.skin_color} precision={2} />
                  </Col>
                </Row>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    </Space>
  );
};

