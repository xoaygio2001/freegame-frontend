import { Routes, Route } from 'react-router-dom';

import HomePage from './containers/client/home-page/HomePage';
import Detail from './containers/client/detail-game/DetailGame';

import Login from './containers/admin/Login/Loginn';
import MangeGame from './containers/admin/manage-game/MangeGame';
import FillterByCategory from './containers/client/filter-by-category/FilterByCategory';

import MangeUser from './containers/admin/mange-user/MangeUser';

import ManageSoftware from './containers/admin/manage-software/ManageSoftware';

import { ToastContainer, toast } from 'react-toastify';

import DetailGame from './containers/admin/manage-game/DetailGame';
import DetailSoftware from './containers/admin/manage-software/DetailSoftware';
import Footer from './containers/client/header-footer/Footer';

import { Navigate } from 'react-router-dom';




function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail-game/:id' element={<Detail />} />
        <Route path='/fillter-by-category/:tagId/:pageNumber' element={<FillterByCategory />} />
        <Route path='/admin' element={<Navigate to="/admin/manage-user" />} />
        <Route path='/admin/manage-user' element={<MangeUser />} />
        <Route path='/admin/manage-game' element={<MangeGame />} />
        <Route path='/admin/manage-software' element={<ManageSoftware />} />
        <Route path='/admin/detail-game/:id' element={<DetailGame />} />
        <Route path='/admin/detail-software/:id' element={<DetailSoftware />} />


      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

  

    </>
  );
}

export default App;
