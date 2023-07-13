import dayjs from "dayjs";
import React, { useState, useEffect } from 'react';
import DataContent from "./DataContent";
import DataTable from "./DataTable";
import Graph from "./Graph";
import axios from "axios";
import { endPointOfApi } from './../hooks/query/queryConstants';

export default function MainGraph() {
  const [allTimePerformance, SetAllTimePerformance] = useState(0);
  const [realMonth2datePerformance, SetMonth2DatePerformance] = useState(0);
  const [getUserData, SetGetUserData] = useState();
  const [realProfitArray, SetProfitArray] = useState();
  const [realGraphData, SetGraphData] = useState();
  const [realDrawDowns, SetDrawDown] = useState();

  const handleFetch = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${endPointOfApi}/get-data`,
      headers: {},
      timeout: 120000,
    };

    axios.request(config)
    .then((response) => {
      SetGetUserData(response.data)
    })
    .catch((error) => {
    });

    const updatedUserData = getUserData?.map((item) => {
      if (item && item.Timestamp) {
        const date = new Date(item.Timestamp * 1000);
        const RealDate = date.toLocaleDateString();
        const RealTime = date.toLocaleTimeString();
        const timestamp = `${RealDate}@${RealTime}`;
        return { ...item, Timestamp: timestamp };
      } else {
        return item;
      }
    });
  
    const groupedData = {};
    updatedUserData?.map((item) => {
      const date = item.Timestamp.split("@")[0];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(item);
    });
    
    let toDayDate = '';
    for (const key in groupedData) {
      toDayDate = key;
    }
  
    const currentDateData = groupedData?.[toDayDate];
    const tempAllTimePerformance = currentDateData?.[currentDateData.length - 1].profit.toFixed(7);
    
    SetAllTimePerformance(tempAllTimePerformance);
  
    // format Data for Graph
    const dateArray = getUserData && Object.keys(groupedData);
    const profitArray = getUserData && Object.values(groupedData);
    const graphData = profitArray?.map((item, idx) => {
      return {
        percentage: item?.[item.length - 1].profit,
        table: item?.[0],
        date: dateArray?.[idx]
      }
    })
  
    SetProfitArray(profitArray);
    SetGraphData(graphData);
  
    let month2datePerformance = 0;
    if(groupedData?.length >= 30)
    {
      month2datePerformance = (currentDateData?.[currentDateData.length - 1].profit - groupedData?.[dateArray?.[dateArray?.length - 30]]?.[0]?.profit).toFixed(7);
    }
    else
    {
      month2datePerformance = (currentDateData?.[currentDateData.length - 1].profit - groupedData?.[dateArray?.[0]]?.[0]?.profit).toFixed(7);
    }
  
    SetMonth2DatePerformance(month2datePerformance);
  
    let average_drawdown_rate = 0;
    let average_drawdown_occurance = 0;
  
    for(let idx=1;idx<currentDateData?.length;idx++)
    {
      if(currentDateData?.[idx-1].profit > currentDateData?.[idx].profit)
      {
        average_drawdown_occurance++;
        average_drawdown_rate += currentDateData?.[idx].profit - currentDateData?.[idx-1].profit;
      }
    }
  
    if(average_drawdown_occurance == 0)
    {
      average_drawdown_rate = 0;
    }
    else
    {
      average_drawdown_rate = average_drawdown_rate / average_drawdown_occurance;
    }
    average_drawdown_occurance = 0;
    for(let idx=0;idx<dateArray?.length;idx++)
    {
      if(groupedData?.[dateArray?.[idx]]?.[0].profit > groupedData?.[dateArray?.[idx]]?.[groupedData?.[dateArray?.[idx]]?.length - 1].profit)
      {
        average_drawdown_occurance++;
      }
    }

    average_drawdown_occurance = average_drawdown_occurance / dateArray?.length;
    const drawdowns = {
      'average_drawdown_rate': average_drawdown_rate.toFixed(7),
      'average_drawdown_occurance': average_drawdown_occurance.toFixed(2)
    }
  
    SetDrawDown(drawdowns);
  }

  useEffect(() => {
    handleFetch()
  }, [getUserData])

  return (
    <div className="">
      <div className="col-span-3 mt-[41px]">
        <div className="grid grid-cols-1 gap-[20px] w-[90%] lg:grid-cols-2">
          <div className="flex gap-5 justify-between items-center lg:justify-normal">
            <p className="text-14 sm:text-20">All time performance:</p>
            {allTimePerformance >= 0 && (
              <p className="text-16 sm:text-25 text-number">{allTimePerformance}%</p>
            )}
            {allTimePerformance < 0 && (
              <p className="text-16 sm:text-25">{allTimePerformance}%</p>
            )}
          </div>
          <div className="flex gap-5 justify-between items-center lg:justify-normal">
            <p className="text-14 sm:text-20">Month to date performance:</p>
            {allTimePerformance >= 0 && (
              <p className="text-16 sm:text-25 text-number">{realMonth2datePerformance}%</p>
            )}
            {allTimePerformance < 0 && (
              <p className="text-16 sm:text-25">{realMonth2datePerformance}%</p>
            )}
          </div>
        </div>
        <Graph graphData={realGraphData} />
        <DataContent drawdown={realDrawDowns} />
        <DataTable tableData={realProfitArray} />
      </div>
    </div>
  );
}
