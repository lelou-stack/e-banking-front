import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Hello from './components/Hello';
import Transfer from './components/Transfer';
import Historic from './components/Historic';
import Validate from './components/validate';
import Addbenef from './components/addbenef';
import Choosebenef from './components/choosebenef';
import Transfertgab from './components/transfertgab';
import Informations from './components/informations';
import Congratulations from './components/Congratulations';
import Validategab from './components/validategab';
import Congratulationsgab from './components/Congratulationsgab';
import Transferbank from './components/bank';
import Validatebank from './components/validatebank';
import Congratsbank from './components/Congratulationsbank';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/historic" element={<Historic />} />
        <Route path="/validate" element={<Validate />} />
        <Route path="/addbenef" element={<Addbenef />} />
        <Route path="/choosebenef" element={<Choosebenef />} />
        <Route path="/transfergab" element={<Transfertgab />} />
        <Route path="/call" element={<Informations/>}/>
        <Route path="/congrats" element={<Congratulations/>}/>
        <Route path="/validategab" element={<Validategab/>}/>
        <Route path="/congratsgab" element={<Congratulationsgab/>}/>
        <Route path="/bank" element={<Transferbank/>}/>
        <Route path="/congratsbank" element={<Congratsbank/>}/>
        <Route path="/validatebank" element={<Validatebank/>}/>

      </Routes>
    </Router>
  );
}

export default App;
