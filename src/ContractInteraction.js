import { useState, useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractRead
} from "wagmi";
// smart contract ABI to interact with
import ContractAbi from "./res/Abi.json";
// libraries for style https://ant.design/components/overview
import { Button, Input, Space, Card } from "antd";
import "antd/dist/reset.css";
import { Fragment } from "ethers/lib/utils.js";

// function to call enumeration of items

function AddContact({ data }) {
  console.log(data);
  return (
    <>
      {data.map((e, index) => {
        return (
          <div key={index}>
            {data[index] !== data[index - 1] && (
              <li>Number in smart contract: {parseInt(e, 10)}</li>
            )}
          </div>
        );
      })}
    </>
  );
}

// module to read out smart contract and store values
export function ReadContract() {
  const contractRead = useContractRead({
    // storage contract to read out int
    address: "0x690172192cE338d6e5bCB65d3C9e44aA5352781e",
    abi: ContractAbi,
    functionName: "get",
    watch: true
  });
  // write data in variable ;
  const comparison = contractRead.data;
  const [value, setValue] = useState([]);

  // always executes when value of comparison changes
  useEffect(() => {
    setValue((value) => [...value, comparison]);
  }, [comparison]);

  return (
    <div className="centerDiv">
      <br />
      <Card style={{ width: 300 }}>
        <ul>
          <AddContact data={value} />
        </ul>
      </Card>
    </div>
  );
}

// writing number into smart contract
export function WriteContract() {
  const [number, setNumber] = useState("");
  const {
    config,
    error: prepareError,
    isError: isPrepareError
  } = usePrepareContractWrite({
    address: "0x690172192cE338d6e5bCB65d3C9e44aA5352781e",
    abi: ContractAbi,
    functionName: "set",
    args: [parseInt(number, 10)], //argument to write
    enabled: Boolean(number) //possible to write if there is a value in number
  });
  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });
  console.log((prepareError || error)?.message);
  return (
    <div className="centerDiv">
      <br />
      <Space>
        <Input
          id="tokenId"
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Store number"
          value={number}
        />
        <Button
          type="primary"
          disabled={!write || isLoading}
          onClick={() => {
            write?.();
          }}
        >
          {isLoading ? "Writing..." : "Write"}
        </Button>

        {isSuccess && (
          <div>
            Successfully wrote in contract!
            <div>
              <a href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
                Goerli Etherscan
              </a>
            </div>
          </div>
        )}
        {(isPrepareError || isError) && (
          <div>Error: {(prepareError || error)?.message}</div>
        )}
      </Space>
    </div>
  );
}
