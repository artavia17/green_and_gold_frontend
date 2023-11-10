/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = { 
    // output: 'export',
    trailingSlash: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: false,
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'green-and-gold-api.alonsocr.com',
              port: '',
              pathname: '/api/**',
            },
        ],
        domains: ['green-and-gold-api.alonsocr.com'],
    },
}

