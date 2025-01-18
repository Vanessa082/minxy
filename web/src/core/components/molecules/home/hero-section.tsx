"use client"
import AnalyticsTable from "@/components/atoms/analytics-table";

export default function HeroSection() {
  return (
    <div>
      <h1>Shorten Your Looong URL : &#41;</h1>
      <p>Mini link is an efficient and easy-to-use URL shortening service that boasts your online experience.</p>
      <div>
        If you are seeing this message, then an API KEY<br />
        of an important API used by this app is expired<br />
        I also cannot allow you shortening links without logging in or signing up<br />
        If you wanna shorten links without authenticating your self, please contact the admins <a href="https://github.com/Vanessa082">here </a>so we could update our API keys<br />
      </div>
      <span><a href="">Login</a> to see the analytics of the link you shorten</span>

      <AnalyticsTable />
    </div>
  )
}