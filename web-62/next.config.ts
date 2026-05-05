import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        hostname:"placehold.co",
      }
    ]
  },
  // environment
  env:{},
  // headers : () => {
  //   return []
  // }
  // cacheHandler : "./cache-handler.js"
  logging : {
    fetches :{
      fullUrl: true,
    }
  }
};

export default nextConfig;
