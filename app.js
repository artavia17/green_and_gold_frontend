const v8 = require('v8');
console.log(`Límite de memoria: ${v8.getHeapStatistics().total_available_size / 1024 / 1024} MB`);
