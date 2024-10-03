"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import React from "react";
import zoomSdk from "@zoom/appssdk";
import NameTag from "./nametag";
import Header from "./header";
import Footer from "./footer";

export default function Home() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [runningContext, setRunningContext] = useState(null);
  const [userContextStatus, setUserContextStatus] = useState("");
  const [apiSearchText, setApiSearchText] = useState("");
  const [showVideos, setShowVideos] = useState(false);

  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: ["setVirtualForeground", "removeVirtualForeground"],
        version: "0.16.0",
      });
      console.log("App configured", configResponse);
      setRunningContext(configResponse.runningContext);

      setUserContextStatus(configResponse.auth.status);

      const userContext = await zoomSdk.invoke("getUserContext");
      setUser(userContext);
    } catch (error) {
      console.log("zoom sdk not loaded");
    }
  }

  useEffect(() => {
    configureSdk();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">
        <Header />
      </div>

      <NameTag />

      <Footer />
    </div>
  );
}
