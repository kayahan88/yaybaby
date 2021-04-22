import React from 'react';
import routes from './routes';
import Auth from './Components/Auth/Auth';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Auth /> */}
      {routes}
    </div>
  );
}

export default App;
