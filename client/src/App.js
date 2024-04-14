import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Error from './components/Error';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from './components/Create';

function App() {
  return (
    <BrowserRouter>
    <Navigation />
      <Routes>
        {/* <Route path="/" element={} /> */}
        <Route index element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
