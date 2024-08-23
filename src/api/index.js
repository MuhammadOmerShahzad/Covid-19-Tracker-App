import axios from 'axios';

const url = 'https://disease.sh/v3/covid-19';

// Fetch global or country-specific data
export const fetchData = async (country) => {
  let changeableUrl = `${url}/all`;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { cases, recovered, deaths, updated } } = await axios.get(changeableUrl);
    return { confirmed: cases, recovered, deaths, lastUpdate: updated };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { confirmed: null, recovered: null, deaths: null, lastUpdate: null };
  }
};

// Fetch daily data
export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/historical/all?lastdays=all`);
    return {
      cases: data.cases,
      deaths: data.deaths,
      recovered: data.recovered
    };
  } catch (error) {
    console.error('Error fetching daily data:', error);
    return { cases: {}, deaths: {}, recovered: {} };
  }
};

// Fetch list of countries
export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    return data.map((country) => country.country);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};
