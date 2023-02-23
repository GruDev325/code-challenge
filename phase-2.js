const axios = require('axios');
const candidateId = '579187cf-230b-4f43-ba44-fc795eae1cec';

// Define the endpoint URL
const polyanetUrl = 'https://challenge.crossmint.io/api/polyanets';
const soloonUrl = 'https://challenge.crossmint.io/api/soloons';
const comEthUrl = 'https://challenge.crossmint.io/api/comeths';
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
      await sleep(2);
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


// Function to create a soloon
async function createSoloon(row, column, color) {
  const body = {
    row: row,
    column: column,
    color: color,
    candidateId: candidateId
  };

  await axios.post(soloonUrl, body, config);
}

// Function to delete a soloon
async function deleteSoloon(row, column) {
  const body = {
    row: row,
    column: column,
    candidateId: candidateId
  };

  await axios.delete(soloonUrl, body, config);
}

// Function to create a cometh
async function createCometh(row, column, direction) {
  const body = {
    row: row,
    column: column,
    direction: direction,
    candidateId: candidateId
  };

  await axios.post(comEthUrl, body, config);
}

// Function to delete a cometh
async function deleteCometh(row, column) {
  const body = {
    row: row,
    column: column,
    candidateId: candidateId
  };

  await axios.delete(comEthUrl, body, config);
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
        const sps = goalGrid[i][j].split('_');
        console.log(i, j);
        switch (sps[sps.length - 1]) {
          case 'POLYANET':
            await resolvePromise(createPolyanet(i, j));
            break;
          case 'SOLOON':
            await resolvePromise(createSoloon(i, j, sps[0].toLowerCase()));
            break;
          case 'COMETH':
            await resolvePromise(createCometh(i, j, sps[0].toLowerCase()));
            break;
          default:
            break;
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