"use client";
import React, { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { upload } from "thirdweb/storage";

export function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [ipfsUri, setIpfsUri] = useState("");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file to upload.");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading...");

    try {
      const client = createThirdwebClient({ clientId: "216bffc7d046caa6984b935d625a89ba" });
      const uri = await upload({
        client,
        files: [videoFile],
      });

      setIpfsUri(uri);
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload Video</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Choose Video File</label>
          <input
            type="file"
            accept="video/*"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleFileChange}
          />
        </div>

        <button
          onClick={handleUpload}
          className={`w-full py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 ${uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload to IPFS"}
        </button>

        {uploadStatus && (
          <div className="mt-4 text-center">
            <p className={`font-semibold ${uploadStatus.includes("failed") ? "text-red-500" : "text-green-500"}`}>
              {uploadStatus}
            </p>
            {ipfsUri && (
              <p className="text-blue-500 mt-2">
                <a href={ipfsUri} target="_blank" rel="noopener noreferrer">
                  View Uploaded Video
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
