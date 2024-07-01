import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage/homePage';
import BlogPage from './pages/blogPage/blogPage';

function App() {

  return (
    
    <Router>
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/blogInfo/:id' element={<BlogPage />} />
    </Routes>
  </Router>
    
  );
}

export default App;
