import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import JobPostPage from './pages/JobPostPage/JobPostPage';
import JobDescriptionPage from './pages/JobDescriptionPage/JobDescriptionPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/jobpost' element={<ProtectedRoute Component={JobPostPage}/>}/>
          <Route path='/jobpost/:id' element={<JobDescriptionPage/>}/>
        </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
