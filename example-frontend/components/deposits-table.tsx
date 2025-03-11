"use client";

import { usePonderQuery } from "@ponder/react";
import CountUp from "react-countup";
import { formatEther } from "viem";
import { createPoolQueryOptions } from "../lib/ponder";

export default function DepositsTable() {
  const createPoolQuery = usePonderQuery(createPoolQueryOptions);

  return (
    <div className="flex flex-col gap-1 justify-between items-center w-full">
      {createPoolQuery.status === "pending" ? (
        <p className="font-semibold">Loading...</p>
      ) : createPoolQuery.status === "error" ? (
        <p className="font-semibold text-red-500">Error fetching Agents</p>
      ) : (
        <ul className="w-full">
          <li className="grid grid-cols-2 w-full text-lg font-semibold sm:grid-cols-3">
            <p>Account</p>
            <p>Amount</p>
            <p className="hidden sm:flex">Timestamp</p>
          </li>
          {createPoolQuery.data?.map(
            ({
              userAddress,
              agentAddress,
              virtualEthReserves,
              virtualTokenReserves,
              timestamp,
              id,
            }) => (
              <li
                className="grid grid-cols-2 py-2 w-full text-lg font-semibold sm:grid-cols-3"
                key={id}
              >
                <a
                  className="text-sm font-semibold text-red-500 underline"
                  href={`https://sepolia.etherscan.io/address/${userAddress}`}
                >
                  {userAddress.slice(0, 6)}...{userAddress.slice(38)}
                </a>
                <CountUp
                  start={0}
                  end={Number(formatEther(virtualEthReserves))}
                  duration={2.5}
                  decimals={5}
                  decimal={"."}
                  separator={","}
                  className="text-sm font-semibold"
                />
                <p className="hidden text-sm sm:flex">
                  {new Date(Number(timestamp) * 1000).toLocaleString()}
                </p>
                <a
                  className="text-sm font-semibold text-red-500 underline"
                  href={`https://sepolia.etherscan.io/contract/${agentAddress}`}
                >
                  {agentAddress.slice(0, 6)}...{agentAddress.slice(38)}
                </a>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
