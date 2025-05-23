import { Outlet, Route, Routes } from 'react-router-dom';
import { PATH } from './constants/path';
import Root from './pages/Root/Root';
import ErrorBoundaryWrapper from '~/ErrorBoundaryWrapper';
import Login from '~/pages/Login/Login';
import CollectInfo from '~/pages/CollectInfo/CollectInfo';
import SignUp from '~/pages/SignUp/SignUp';
import CollectInfoComplete from '~/pages/CollectInfoComplete/CollectInfoComplete';
import LiveCoaching from '~/pages/LiveCoaching/LiveCoaching';

const RootLayout = () => {
  return (
    <ErrorBoundaryWrapper>
      <div className="min-h-dvh">
        <div className="mx-auto min-h-dvh max-w-md shadow-lg">
          <Outlet />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path={PATH.ROOT} element={<Root />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.SIGN_UP} element={<SignUp />} />
        <Route path={PATH.COLLECT_INFO} element={<CollectInfo />} />
        <Route
          path={PATH.COLLECT_INFO_COMPLETE}
          element={<CollectInfoComplete />}
        />
        <Route path={PATH.LIVE_COACHING} element={<LiveCoaching />} />
      </Route>
    </Routes>
  );
}

export default App;
