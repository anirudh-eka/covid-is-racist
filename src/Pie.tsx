import React from 'react';
import './Pie.css'

export function Pie(props: PropTypes) {

  const colors = ["coral", "cornflowerblue", "darkgoldenrod", "crimson", "darkslateblue", "darkcyan "];

  const diameter = props.chartWidth * 0.6

  const radius = diameter / 2

  const sliceViewModels = props.data
    .reduce((a: Array<SliceViewModel>, s: Slice) => {
      const last = a[a.length - 1];
      const sliceCirc = s.ratio * radius * Math.PI;
      return a.concat({
        circOffset: last.circOffset + last.circSlice,
        circSlice: sliceCirc,
        label: `${s.name} (${(s.ratio * 100).toFixed(1)}%)`,
        color: colors[a.length - 1]
      });
    }, [{ circOffset: 0, circSlice: 0, label: '', color: "" }]);

  const slices = sliceViewModels.map((m: SliceViewModel, i) => {
    return [
    <circle 
      key={i} 
      r={radius / 2} 
      cx={radius} 
      cy={radius} 
      fill="transparent" 
      stroke={m.color} 
      strokeWidth={radius} 
      strokeDasharray={`0 ${m.circOffset} ${m.circSlice} 500`} />,
    ]
  }
  );

  return (
  <React.Fragment>
    <svg width={diameter} viewBox={`-10 -10 ${diameter + 20} ${diameter + 20}`}>
      <circle r={radius} cx={radius} cy={radius} fill="gray" stroke="black" strokeWidth={10} />
      {slices}
    </svg>
    <Legend width={props.chartWidth * 0.4} sliceViewModels={sliceViewModels} />
  </React.Fragment>
  );


}

interface SliceViewModel {
    circOffset: number;
    circSlice: number;
    label: string;
    color: string;
}

interface Slice {
  name: string;
  ratio: number;
}

interface PropTypes {
    chartWidth: number;
    data: Array<Slice>;
}

function Legend(props: {sliceViewModels: SliceViewModel[], width: number}) {

  const legend = props.sliceViewModels.map((m: SliceViewModel) => <li style={{color: m.color}}>{m.label}</li>)
  
    return <ul style={{width: props.width, marginTop: props.width * 0.3}} className="pie-legend">
      {legend}
    </ul>;
}