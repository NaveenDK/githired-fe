import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["app/components/*"]
    }
  }
}

export default nextConfig;
