/** @type {import('next').NextConfig} */

const path = require('path')

module.exports = { 
    // output: 'export',
    trailingSlash: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        unoptimized: true
    },

    
}

