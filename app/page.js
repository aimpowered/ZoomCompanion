"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import React from 'react';
import zoomSdk from "@zoom/appssdk";
import NameTag from "./nametag"
import Header from './header';
import Footer from './footer';
import { affirmations, hands } from './state';


export default function Home() {
  async function configureSdk() {
    try {
      const configResponse = await zoomSdk.config({
        capabilities: [
          "setVirtualForeground",
          "removeVirtualForeground"
        ],
        version: "0.16.0",
      });
      console.log("App configured", configResponse);
      const userContext = await zoomSdk.invoke("getUserContext");
    } catch (error) {
      console.log('zoom sdk not loaded')
    }
  }

  useEffect(() => {
    configureSdk();
  }, []);

  const header_title = affirmations.getCurrentAffirmation()
    || 'Say what I want to say, whatever happens will help me grow';

  return (

    <div className="bg-white w-screen h-screen">
      <div className="flex w-full justify-between">

          <Header
            title={header_title}
          />

      </div>

      <NameTag />
      
    <Footer />

    </div>

  );
}
