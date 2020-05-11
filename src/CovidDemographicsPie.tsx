import React, { useState, useEffect } from 'react';
import { Pie } from './Pie';


export default function CovidDemographicsPie() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://data.cdc.gov/resource/pj7m-y5uh.json")
    .then(r => r.json())
    .then(j => {
      const cdcRow = j.find((d: any) => 
        d.state === "United States" && d.indicator === "Weighted distribution of population (%)")
      const data = toPieShape(cdcRow)
      
      setData(data)
    })
  }, [])

  return <Pie radius={300} data={data} />
}

const toPieShape = (cdcRow: any) : any => Object.keys(cdcRow)
  .filter(k => k !== "state" && k !== "indicator" && k !== "data_as_of")
  .map((k) => ({name: cdcToPresentation[k], ratio: cdcRow[k]/100}))


const cdcToPresentation: any = {
  non_hispanic_white: "White",
  non_hispanic_black_african_american: "Black / African American",
  non_hispanic_american_indian_alaska_native: "American Indian / Alaska Native",
  non_hispanic_asian_pacific_islander: "Asian",
  hispanic_latino_total: "Latinx",
  other: "Other"
}