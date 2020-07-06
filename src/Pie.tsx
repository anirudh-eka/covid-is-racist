import React from 'react';

export function Pie(props: PropTypes) {

  const colors = ["coral", "cornflowerblue", "darkgoldenrod", "crimson", "darkslateblue", "darkcyan "];

  const sliceViewModels = props.data
    .reduce((a: Array<SliceViewModel>, s: Slice) => {
      const last = a[a.length - 1];
      const sliceCirc = s.ratio * props.radius * Math.PI;
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
      r={props.radius / 2} 
      cx={props.radius} 
      cy={props.radius} 
      fill="transparent" 
      stroke={m.color} 
      strokeWidth={props.radius} 
      strokeDasharray={`0 ${m.circOffset} ${m.circSlice} 500`} />,
    ]
  }
  );

  const diameter = props.radius * 2;

  return (<svg width={diameter} viewBox={`-10 -10 ${diameter + 500} ${diameter + 50}`}>
    <circle r={props.radius} cx={props.radius} cy={props.radius} fill="gray" stroke="black" strokeWidth={10} />
    {slices}
    <Legend left={diameter}  sliceViewModels={sliceViewModels} />
  </svg>);


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
    radius: number;
    data: Array<Slice>;
}

function Legend(props: {left: number, sliceViewModels: SliceViewModel[]}) {
  function toLegendLabel(a: any[], m: SliceViewModel): any[] {
    const last = a[a.length - 1];
    const lastHeight = !last ? 0 : last.y + (44 * Math.ceil(last.label.split(" ").length / 3));

    return a.concat({ ...m, x: props.left, y: lastHeight });
  }
  
  const legend = props.sliceViewModels
    .reduce(toLegendLabel, [])
    .map((m: any, i) => <LegendLabel key={i} x={m.x} y={m.y} color={m.color} label={m.label} />);
  
    return <React.Fragment>
      {legend}
    </React.Fragment>;
}


function LegendLabel(props: {x: number, y: number, color: string, label: string}): JSX.Element {
  const isMultipleOf3 = (x: number) => {
    return x !== 0 && x % 3 === 0
  }
  
  let lines = props.label
    .split(" ")
    .reduce((a: string[][], w: string) => {
      if(isMultipleOf3(last(a).length)) {
        return a.concat([[w]])
      }

      return init(a).concat([last(a).concat(w)])
    }, [[]])
    .map(lines => lines.join(" "))

  return (
    <React.Fragment>
      {lines.map((l, i) => (
        <text key={i} x={props.x + 50} y="30%" className={"Legend-label"} dy={`${props.y + (40 * i)}`} fill={`${props.color}`} stroke={`${props.color}`} textAnchor="left">{`${l}`}</text>
      ))}
    </React.Fragment>
    )
}

function last<T>(a: T[]): T {
  return a[a.length - 1]
} 

function init<T>(a: T[]): T[] {
  return a.splice(0, a.length - 1) 
} 