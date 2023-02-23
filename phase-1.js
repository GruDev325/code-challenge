const axios = require('axios');
const candidateId = '579187cf-230b-4f43-ba44-fc795eae1cec';
// Define the endpoint URL
const goalMapUrl = `https://challenge.crossmint.io/api/map/${candidateId}/goal`;

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

function sleep(n) {
  return new Promise((resolve) => setTimeout(resolve, n * 1000));
}

async function resolvePromise(promise) {
  while(true) {
    try {
      await promise;
      break;
    } catch (e) {
      await sleep(1);
    }
  }
}

async function getGoalMap() {
  try {
    return await axios.get(goalMapUrl);
  } catch (e) {
    throw e;
  }
}

// Function to create a planet
async function createPolyanet(row, column) {
  const body = {
    row: row,
    column: column,
    candidateId: candidateId
  };

  await axios.post(polyanetUrl, body, config);
}

// Function to delete a planet
async function deletePolyanet(row, column) {
  const body = {
    row: row,
    column: column,
    candidateId: candidateId
  };

  await axios.delete(polyanetUrl, body, config);
}

// Create the POLYanets on grid
async function createMap() {
  try {
    const {
      data: {
        goal: goalGrid
      }
    } = await getGoalMap();
    for (let i = 0; i < goalGrid.length; i++) {
      for (let j = 0; j < goalGrid[i].length; j++) {
        if (goalGrid[i][j] === 'POLYANET') {
          await resolvePromise(createPolyanet(i, j));
        }
      }
      await sleep(2);
    }
  } catch (e) {
    console.log("Error:" + e.message);
  }
}

// Call the createPolyanets function to create the X-shape pattern
createMap();