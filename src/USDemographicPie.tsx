import React from 'react';
import { Pie } from './Pie';

export default function USDemographicPie() {
    const totalUSDemographics = [
        { name: "White", ratio: 0.602 },
        { name: "Black / African American", ratio: 0.123 },
        { name: "American Indian / Alaska Native", ratio: 0.007},
        { name: "Asian", ratio: 0.056},
        { name: "Latinx", ratio: 0.183},
        { name: "Other", ratio: 0.03}
      ]
    
    return <Pie chartWidth={300} data={totalUSDemographics} />
}