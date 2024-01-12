
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, List, Col, Row, Statistic, Typography, Space } from 'antd';

import { selectFilteredCharacters, selectLoading } from '../redux';
import { Filter } from '../components';
import { NAVIGATE, gridResponsive } from '../utils/constants';

const { Text } = Typography;

const paginationStyles = { position: 'bottom', align: 'center', pageSize: 9 };

const pageStyles = { width: '100%' };

export const Main = () => {

  const characters = useSelector(selectFilteredCharacters);
  const loading = useSelector(selectLoading);

  return (
    <Space direction="vertical" style={pageStyles}>
      <Text>Choose character:</Text>

      <Filter />

      <List
        grid={gridResponsive}
        dataSource={characters}
        loading={loading}
        pagination={paginationStyles}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Link to={`${NAVIGATE.characters}${item.id}`}>
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

