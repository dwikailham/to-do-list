import Dashboard from './components/Dashboard';
import Detail from './components/Detail';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './styles/style.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Dashboard />} />
        <Route exact path='/detail/:id' element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
