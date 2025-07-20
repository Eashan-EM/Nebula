import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                // add any other forwarded origins here
            ]
        }
    }
}

export default nextConfig
