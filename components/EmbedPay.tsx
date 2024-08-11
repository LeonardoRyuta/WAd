"use client";
import { prepareContractCall, getContract, createThirdwebClient } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { optimismSepolia, baseSepolia, mainnet } from "thirdweb/chains";
import { factoryContractAddress } from "@/utils";

export function EmbedPay({ baseURI, targets, name, symbol }: { baseURI: string, targets: string[], name: string, symbol: string }) {
  const client = createThirdwebClient({ clientId: "216bffc7d046caa6984b935d625a89ba" });

  const contract = getContract({
    client,
    chain: mainnet,
    address: factoryContractAddress,
  });

  const { mutate: sendTx, data: transactionResult } =
    useSendTransaction();

  const pay = async () => {
    console.log("paying");
    const tx = prepareContractCall({
      contract,
      method: "function createNFTAd(string memory _baseURI, address[] memory targets, string memory name, string memory symbol)",
      params: [baseURI, targets, name, symbol],
      value: BigInt(0),
    });
    sendTx(tx);
  };

  return (
    <button
      className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
      onClick={pay}
    >
      Pay via fiat
    </button>
  );
}
