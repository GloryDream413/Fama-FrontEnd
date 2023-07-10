import dayjs from "dayjs";
import React, { useState, useEffect } from 'react';
import DataContent from "./DataContent";
import DataTable from "./DataTable";
import Graph from "./Graph";
import { dataBase } from "@/_mock/dbData";
import axios from "axios";
import { endPointOfApi } from './../hooks/query/queryConstants';

export default function MainGraph() {

  const [getUserData, setGetUserData] = useState();
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
        setGetUserData(response.data)
      })
      .catch((error) => {
      });
  }

  useEffect(() => {
    handleFetch()
  }, [])


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
  
  console.log("userData=", groupedData);

  let toDayDate = '';
  for (const key in getUserData) {
    toDayDate = key;
  }

  const currentDateData = getUserData?.[toDayDate];
  const performanceDetails = currentDateData?.performance;

  // format Data for Graph
  const dateArray = getUserData && Object.keys(getUserData);
  const profitArray = getUserData && Object.values(getUserData);
  const handleFormateDate = (date) => {
    const newDate = date.split('-');
    const toDayDate = `${newDate[1]}/${newDate[0]}/${newDate[2]}`
    return toDayDate
  }

  

  const graphData = profitArray?.map((item, idx) => {
    return {
      percentage: item?.profit,
      table: item?.data[0],
      date: handleFormateDate(dateArray?.[idx])
    }
  })


  return (
    <div className="">
      <div className="col-span-3 mt-[41px]">
        <div className="grid grid-cols-1 gap-[20px] w-[90%] lg:grid-cols-2">
          <div className="flex gap-5 justify-between items-center lg:justify-normal">
            <p className="text-14 sm:text-20">All time performance:</p>
            <p className="text-16 sm:text-25 text-number">{`+${performanceDetails?.all_time_performance}%`}</p>
          </div>
          <div className="flex gap-5 justify-between items-center lg:justify-normal">
            <p className="text-14 sm:text-20">Month to date performance:</p>
            <p className="text-16 sm:text-25 text-number">+{performanceDetails?.month_to_date_performance}%</p>
          </div>
        </div>
        <Graph graphData={graphData} />
        <DataContent drawdown={currentDateData?.drawdowns} />
        <DataTable tableData={profitArray} />
      </div>
    </div>
  );
}
