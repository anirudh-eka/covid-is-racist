import React, { useState, useEffect } from 'react';
import './App.css';
import { Pie } from './Pie';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("https://data.cdc.gov/resource/pj7m-y5uh.json")
    .then(r => r.json())
    .then(j => {
      
      console.log(j)

      const cdcRow = j.find((d: any) => 
        d.state === "United States" && d.indicator === "Weighted distribution of population (%)")
      const data = toPieShape(cdcRow)
      
      setData(data)
      })
  }, [])

  return (
    <div className="container">
      <p>If you want to understand modern racism, consider that Covid-19 is totally color blind and yet, it disproportionately murders people of color in the United States. Sadly of course, millions of white people have lost their lives to the virus too. In fact non-hispanic whites make up the most deaths according to the CDC.</p>
      <Pie radius={300} data={data} />
      <p>So where's the racism? Well the key word is <em>disproportionate</em>. If white people make up 50% of the population, they should make up 50% of the deaths. Thats not the case. This is the breakdown of demographics in the United States:</p>
    </div>
  );
}

const toPieShape = (cdcRow: any) : any => Object.keys(cdcRow)
  .filter(k => k !== "state" && k !== "indicator" && k !== "data_as_of")
  .map((k) => ({name: cdcToPresentation[k], ratio: cdcRow[k]/100}))

export default App;

const cdcToPresentation: any = {
  non_hispanic_white: "White",
  non_hispanic_black_african_american: "Black / African American",
  non_hispanic_american_indian_alaska_native: "American Indian / Alaska Native",
  non_hispanic_asian_pacific_islander: "Asian",
  hispanic_latino_total: "Latinx",
  other: "Other"
}

