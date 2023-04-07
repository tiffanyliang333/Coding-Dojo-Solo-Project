import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MetricWall from './components/MetricWall';
import AddMetric from './components/AddMetric';
import UpdateMetric from './components/UpdateMetric';
import ViewMetric from './components/ViewMetric';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element = {<MetricWall />} path = "/metrics" />
          <Route element = {<AddMetric />} path ="/metrics/new"/>
          <Route element = {<UpdateMetric />} path ="/metrics/edit/:id"/>
          <Route element = {<ViewMetric />} path ="/metrics/:id"/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
