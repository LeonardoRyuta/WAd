import { type IVerifyResponse, verifyCloudProof, ISuccessResult } from '@worldcoin/idkit'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log("Received POST request to /api/verify")
  console.log(req.body)
  const proof = req.body
  const app_id = "app_staging_46b6e766cc8951d105e703fc9f59486e"
  const action = "ad"
  const verifyRes = (await verifyCloudProof(proof as any, app_id, action)) as IVerifyResponse

  if (verifyRes.success) {
    // This is where you should perform backend actions if the verification succeeds
    // Such as, setting a user as "verified" in a database
    NextResponse.json(verifyRes, { status: 200 })
  } else {
    // This is where you should handle errors from the World ID /verify endpoint. 
    // Usually these errors are due to a user having already verified.
    NextResponse.json(verifyRes, { status: 400 });
  }
}