import React, { useState, useEffect, useRef } from 'react';
import './App.css'
import { Pie } from './Pie';


function App() {

  const [date, setDate] = useState<string|null>(null)
  const [covidDeathsData, setCovidDeathsData] = useState([])
  const [slidesWidth, setSlidesWidth] = useState(0)

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

  console.log('slides width ', slidesWidth)
  return (
    <Slides onWidthResize={setSlidesWidth} >
      <Slide>
        <h1>{`Total Covid Deaths by Demographic as of ${date}`}</h1>
        <figure>
          <Pie chartWidth={slidesWidth} data={covidDeathsData} />
          <figcaption>
            Source: <a href="https://data.cdc.gov/NCHS/Provisional-Death-Counts-for-Coronavirus-Disease-C/pj7m-y5uh">CDC</a>
          </figcaption>
        </figure>
      </Slide>
      <Slide>
        <h1>Somehow,</h1>
        <p><em>Covid-19 disproportionately targets people of color</em> without having eyes. That is no accident.</p>
        
      </Slide>
      <Slide>
        <h1>If our system can teach a virus to see race</h1>
        <p><em>then why is it so surprising that you aren't color-blind?</em> Honestly, you never stood a chance.</p>
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
      <p>↓</p>
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


function Slides(props: {children: React.ReactElement[], onWidthResize?: Function}) {
  const target: any = useRef(null)

  useEffect(() => {
    if(target && target.current) {
      console.log(target.current.getBoundingClientRect())
      const { width } = target.current.getBoundingClientRect()
      props.onWidthResize && props.onWidthResize(width)
    }
  }, [])

  return (
    <div className="container" ref={target} >
      {props.children.map((c, i) => {
        return i + 1 === props.children.length ? React.cloneElement(c, {last: true}) : c
        })
      }
    </div>
  )
}
