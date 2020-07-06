import React, { useState, useEffect, Children } from 'react';
import './App.css'
import { Pie } from './Pie';


function App() {

  const [date, setDate] = useState<string|null>(null)
  const [covidDeathsData, setCovidDeathsData] = useState([])

  useEffect(() => {
    fetch("https://data.cdc.gov/resource/pj7m-y5uh.json")
    .then(r => r.json())
    .then(j => {
      const weightedDistributionForUS = j.find((d: any) => 
        d.state === "United States" && d.indicator === "Weighted distribution of population (%)")
      setDate(new Date(weightedDistributionForUS.data_as_of).toLocaleDateString())
      setCovidDeathsData(toPieShape(weightedDistributionForUS))
    })
  }, [])

  return (
    <Slides>
      <Slide>
        <h1>{`Total Covid Deaths by Demographic as of ${date}`}</h1>
        <figure>
          <Pie radius={300} data={covidDeathsData} />
          <figcaption>
            Source: <a href="https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh">CDC</a>
          </figcaption>
        </figure>
      </Slide>
      <Slide>
        <h1>Somehow,</h1>
        <p><em>Covid-19 disproportionately targets people of color</em> eventhough it doesn't have eyes.</p>
      </Slide>
      <Slide>
        <h1>If our system can make the actions of a virus racist</h1>
        <p><em>then what chances do we have in being color-blind?</em></p>
      </Slide>
    </Slides>
  );
}

export default App;

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

function Slide(props: {children: any, last?: boolean}) {
  
  const footer = !props.last 
  ? (<footer className="slide-footer">
      <p>Next</p>
    </footer>)
  : (<footer className="slide-footer-end">
    <div className="period"></div>
  </footer>)

  return <section className="slide">
    <div className="slide-body">
      {props.children}
    </div>
    {footer}
  </section>;
}


function Slides(props: {children: React.ReactElement[]}) {
  // props.children.map((c) => React.cloneElement(c))
  return (
    <div className="container">
      {props.children.map((c, i) => {
        return i + 1 === props.children.length ? React.cloneElement(c, {last: true}) : c
        })
      }
    </div>
  )
}
