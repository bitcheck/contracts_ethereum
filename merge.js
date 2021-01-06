const { merge } = require('sol-merger');

// Get the merged code as a string
const mergeCode = async () => {
  const code = await merge("./contracts/DisputeManager.sol");
  console.log(code);
}
// Print it out or write it to a file etc.
mergeCode();