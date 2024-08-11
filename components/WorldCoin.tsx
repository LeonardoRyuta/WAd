"use client";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit"

export function WorldCoin({ setHasVerified }: { setHasVerified: (value: boolean) => void }) {
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    })
    if (!res.ok) {
      throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
  };

  const onSuccess = () => {
    setHasVerified(true);
    console.log("Success")
  };

  return (
    <IDKitWidget
      app_id={`app_staging_df9306233246632b32fd3e1db60ccecc`}  // obtained from the Developer Portal
      action="ad" // obtained from the Developer Portal
      signal={"0x2346ac3Bc15656D4dE1da99384B5498A75f128a2"}
      onSuccess={onSuccess} // callback when the modal is closed
    // handleVerify={handleVerify} // callback when the proof is received
    // verification_level={VerificationLevel.Orb}
    >
      {({ open }) =>
        // This is the button that will open the IDKit modal
        <button onClick={open} className="text-gray-700">Verify with World ID</button>
      }
    </IDKitWidget>
  );
}