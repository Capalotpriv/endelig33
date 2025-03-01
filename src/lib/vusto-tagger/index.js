// Re-export from Vusto-tagger
const vustoTagger = require('Vusto-tagger');

// Simple implementation of componentTagger
function componentTagger() {
  return {
    name: 'vusto-tagger',
    // This is a simple implementation that does nothing
    // You can add actual functionality here if needed
    transform(code, id) {
      return code;
    }
  };
}

// Export the functionality
module.exports = { componentTagger };
