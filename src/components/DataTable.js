import { useState } from "react";
import LoadingSpinner from './LoadingSpinner';

export default function DataTable({ tableData }) {

  const [numOfRows, setNumOfRows] = useState(10);

  return (
    <div>
      <div className="flex items-center gap-[40px] mt-[54px]">
        <p className="text-16 sm:text-20">Activity Logs</p>
        <p className="text-12">Logs are delayed 24hrs</p>
      </div>
      <div className="overflow-auto  max-h-[300px] mt-6">
        <div className="flex flex-col min-w-[640px]">
          <table className="table w-full mt-[17px] ">
            <thead className="text-16 border-b-[1px] text-left ">
              <tr>
                <th>Date</th>
                <th className="text-center">Time</th>
                <th className="text-center">Action</th>
                <th className="text-center">Price</th>
                <th className="text-center">ETH Held</th>
                <th className="text-center">USDC Held</th>
                <th>Total $</th>
              </tr>
            </thead>
            <tbody className="">
              {tableData ? (Object.values(tableData).reverse().map((item, idx) => {
                return ( Object.values(item).reverse().map((itemRow, idxRow) => {
                  let usdcValue = Number(itemRow['USDCbalance']);
                  usdcValue = usdcValue.toFixed(2);
                  let ethValue = Number(itemRow['ETHbalance']);
                  ethValue = ethValue !== 0 ? ethValue.toFixed(5) : 0;
                  const price = itemRow['Price']
                  const action = itemRow['Signal'] || 'Hold';
                  let time = itemRow['Timestamp'].split('@');
                  const date = time?.[0]
                  time = time?.[1]

                  if (idx < numOfRows)
                    return (
                      <tr key={idx*10+idxRow}>
                        <td className="text-16">{date}</td>
                        <td className="text-16 text-center">{time}</td>
                        <td className="text-16 text-center">{action}</td>
                        <td className="text-16 text-center">{price}</td>
                        <td className="text-16 text-center">{ethValue}</td>
                        <td className="text-16 text-center">{usdcValue || 0}</td>
                        <td className="text-16">{price}</td>
                      </tr>
                    );
                })
                )
              })) : (<tr><td rowSpan="10" colSpan="7" ><LoadingSpinner />  </td></tr>)}
            </tbody>
          </table>

        </div>
      </div>
      {/* <button onClick={() => numOfRows <= tableData?.length && setNumOfRows(numOfRows + 20)} className="bg-none w-fit mx-auto text-14 mt-[18px] flex justify-center items-center">
        See all
      </button> */}
    </div>
  );
}
