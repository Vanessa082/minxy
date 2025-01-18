"use client"
import { MainTag } from "@/components/atoms";
import AnalyticsTable from "@/components/atoms/analytics-table";

export default function HeroSection() {
  return (
    <MainTag className="flex flex-col justify-center items-center py-6 gap-8">
    <h1 className="text-app-blue-500 font-extrabold text-4xl">
      Shorten Your Looong URL : &#41;
    </h1>
  
    <p className="text-app-dark-200 text-sm text-center">
      Mini link is an efficient and easy-to-use URL shortening service that boasts your online experience.
    </p>
  
    {/* Message Box
    <div className="bg-app-white-200 text-app-blue-500 p-4 rounded-lg shadow-lg text-left">
      <p>If you are seeing this message, then an API KEY<br />
      of an important API used by this app is expired.<br /><br />
      I also cannot allow you to shorten links without logging in or signing up.<br /><br />
      If you wanna shorten links without authenticating yourself, please contact the admins 
        <a href="https://github.com/Vanessa082" className="text-pink-500 font-bold"> here </a>
        so we could update our API keys.
      </p>
    </div> */}
  
    <span className="text-app-dark-200">
      <a href="#" className="text-app-blue-500 font-semibold">Login</a> to get and see analytics for the links you shorten.
    </span>
      <AnalyticsTable />
  </MainTag>
  
  )
}