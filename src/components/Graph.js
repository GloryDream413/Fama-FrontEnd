import Highcharts from 'highcharts';
import { useEffect } from 'react';
export default function Graph({ graphData = [] }) {
  let graphRealData = graphData;
  useEffect(() => {
    if(graphData.length >= 7)
    {
      graphRealData = graphData.slice(graphData.length - 7, graphData.length);
    }
    
    const data = [
      ...graphRealData
    ];
    // Parse dates and onvert percentages to decimals
    const parsedData = graphRealData?.[0]?.percentage !== undefined && data.map((point) => ({
      x: new Date(point.date).getTime(), // Convert date to milliseconds
      y: point.percentage, // Convert percentage to decimal
    }))

    // Highcharts configuration
    const options = {
      chart: {
        type: 'spline',
        fill: '#ffff',
        backgroundColor: 'red',
      },
      title: {
        text: '',
        fill: '#ffff'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e/%m/%y', // Custom date format
        },
        labels: {
          style: {
            color: '#dbdadf', // Set x-axis labels color to white
          },
        },
      },
      yAxis: {
        title: {
          text: '',
          fill: '#ffff'
        },
        labels: {
          format: '{value}%', // Display percentages with a percent symbol
          style: {
            color: '#dbdadf', // Set x-axis labels color to white
          },
        },
        tickInterval: 25, // Assuming percentages are between 0 and 100
      },
      series: [
        {
          name: 'Percentage',
          data: parsedData,
          color: '#47b8b5',
          height: '2px'
        },
      ],
    };

    // Render the chart
    Highcharts.chart('chartContainer', options);
  }, [graphRealData?.[graphRealData.length-1]?.percentage]);

  return (
    <div className='mt-[37px]  w-full pt-10 px-4 text-white border border-gray rounded-[16px] bg-[#102039]'>
      <div id="chartContainer" className='w-full ' style={{ height: '300px' }} />
    </div>
  )
}
