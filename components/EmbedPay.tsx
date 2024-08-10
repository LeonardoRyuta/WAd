"use client";
// import { prepareContractCall, getContract } from "thirdweb";
// import { useSendTransaction } from "thirdweb/react";
import { useSendTransaction } from "thirdweb/react";
import { mintTo } from "thirdweb/extensions/erc721";
import { ContractOptions } from "thirdweb/contract";

export function EmbedPay() {
  // const contract = getContract({
  //   client,
  //   chain,
  //   address: "0x...",
  // });

  // const { mutate: sendTx, data: transactionResult } =
  //   useSendTransaction();

  // const pay = () => {
  //   const transaction = mintTo({
  //     contract: "0x..." as unknown as Readonly<ContractOptions<any>>,
  //     to: "0x...",
  //     nft: {
  //       name: "NFT Name",
  //       description: "NFT Description",
  //       image: "https://example.com/image.png",
  //     },
  //   });
  //   sendTx(transaction);
  // };

  return (
    <button
      className="bg-indigo-600 text-white py-2 px-6 rounded-full hover:bg-indigo-700"
    //  onClick={pay}
    >
      Pay via fiat
    </button>
  );
}