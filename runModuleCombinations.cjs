const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const moduleCombinations = [
  ['ClientSideRowModelModule'],
  ['ClientSideRowModelCoreModule'],
  ['ClientSideRowModelCoreModule', 'SortModule'],
  ['ClientSideRowModelCoreModule', 'SortModule', 'FilterModule'],
  // Add more combinations as needed
];

const results = [];
const updateModulesScript = path.join(__dirname, 'updateModules.cjs');

function runCombination(index) {
  if (index >= moduleCombinations.length) {
    // Save results to a JSON file
    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
    console.log('Results saved to results.json');
    return;
  }

  const modules = moduleCombinations[index];
  const command = `node ${updateModulesScript} ${modules.join(' ')}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error running combination ${modules.join(', ')}:`, err);
      return;
    }

    console.log(stdout);
    console.error(stderr);

    // Extract file size and gzip size from the output
    const fileSizeMatch = stdout.match(/File size: (\d+\.\d+) kB/);
    const gzipSizeMatch = stdout.match(/gzip size: (\d+\.\d+) kB/);

    if (fileSizeMatch && gzipSizeMatch) {
      const fileSize = parseFloat(fileSizeMatch[1]);
      const gzipSize = parseFloat(gzipSizeMatch[1]);

      results.push({
        modules,
        fileSize,
        gzipSize,
      });
    }

    // Run the next combination
    runCombination(index + 1);
  });
}

// Start running combinations
runCombination(0);