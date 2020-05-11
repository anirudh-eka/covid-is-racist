import React from 'react';
import './App.css'
import Text from './text.json'
import CovidDemographicsPie from './CovidDemographicsPie';
import USDemographicsPie from './USDemographicPie';

interface Charts {
  [key: string] : any
}
const charts: Charts = {
  "covid-demographic-pie": CovidDemographicsPie,
  "us-demographic-pie": USDemographicsPie
}

function App() {

  const content = Text.content.map((para, key) => {
    if(para.type === 'chart') {
      const Chart = charts[para.data]
      return <Chart key={key} />
    }
    return <p key={key}>{para.data}</p>
  })

  return (
    <div className="container">
      <h1>Covid is racist</h1>
      {content}
    </div>
  );
}

export default App;

