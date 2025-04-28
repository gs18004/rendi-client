import { Outlet, Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import Root from './pages/Home/Home';
import ErrorBoundaryWrapper from '~/ErrorBoundaryWrapper';

const RootLayout = () => {
  return (
    <ErrorBoundaryWrapper>
      <Outlet />
    </ErrorBoundaryWrapper>
  );
};
function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={PATH.ROOT} element={<Root />} />
      </Route>
    </Routes>
  );
}

export default App;
