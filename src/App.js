import React, { useEffect, useState } from 'react';
import './App.css';
//import { height, HeightContext } from './HeightContext';
import Header from './Header'
import ThreeScene from './three/ThreeScene';

export const Context = React.createContext()

function App() {
  const [state, setState] = useState({
    height: {
      firstHeight: 1,
      secondHeight: 1
    },
    darkmode: true
  })

  const settingState = (firstHeight, secondHeight, darkmode) => {
    setState({
      height: {
        firstHeight: firstHeight,
        secondHeight: secondHeight
      },
      darkmode: darkmode
    })
  }

  return (
    <div>
      <Context.Provider value={state} >
        <Header setState={settingState} />
        <ThreeScene />
      </Context.Provider>
    </div>
  );
}

export default App;
