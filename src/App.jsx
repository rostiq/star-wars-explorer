import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';

import { store } from './redux/store';
import { ROUTES } from './utils/constants';
import { Main, CharacterDetails } from './pages';
import { Logo } from './components';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout className='layout'>
          <Header>
            <Logo />
          </Header>

          <Content className='content'>
            <Routes>
              <Route path={ROUTES.home} element={<Main />} />
              <Route path={ROUTES.characters} element={<CharacterDetails />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;