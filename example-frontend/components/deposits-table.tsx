"use client";

import { usePonderQuery } from "@ponder/react";
import CountUp from "react-countup";
import { formatEther, parseEther } from "viem";
import { createPoolQueryOptions } from "../lib/ponder";
import { CreateAgentButton } from "./create-agent";

export default function DepositsTable() {
  const createPoolQuery = usePonderQuery(createPoolQueryOptions);

  return (
    <div className="flex flex-col gap-1 justify-between items-center w-full">
      {createPoolQuery.status === "pending" ? (
        <p className="font-semibold">Loading...</p>
      ) : createPoolQuery.status === "error" ? (
        <p className="font-semibold text-red-500">Error fetching Agents</p>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-lg font-semibold">
                  Account
                </th>
                <th className="px-4 py-3 text-left text-lg font-semibold">
                  Amount
                </th>
                <th className="hidden px-4 py-3 text-left text-lg font-semibold sm:table-cell">
                  Timestamp
                </th>
                <th className="hidden px-4 py-3 text-left text-lg font-semibold sm:table-cell">
                  Agent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {createPoolQuery.data?.map(
                ({
                  userAddress,
                  agentAddress,
                  virtualEthReserves,
                  virtualTokenReserves,
                  timestamp,
                  id,
                }) => (
                  <tr key={id} className="hover:bg-gray-50">
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <a
                        className="text-sm font-semibold text-red-500 underline"
                        href={`https://sepolia.etherscan.io/address/${agentAddress}`}
                        target="_blank"
                      >
                        {agentAddress.slice(0, 6)}...{agentAddress.slice(38)}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <CountUp
                        start={0}
                        end={Number(formatEther(virtualEthReserves))}
                        duration={2.5}
                        decimals={0}
                        decimal={"."}
                        separator={","}
                        className="text-sm font-semibold"
                      />
                    </td>
                    <td className="hidden px-4 py-3 text-sm sm:table-cell">
                      {new Date(Number(timestamp) * 1000).toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      <a
                        className="text-sm font-semibold text-red-500 underline"
                        href={`https://sepolia.etherscan.io/address/${userAddress}`}
                      >
                        {userAddress.slice(0, 6)}...{userAddress.slice(38)}
                      </a>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
