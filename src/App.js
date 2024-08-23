import React from 'react';
import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import image from './images/image.png';

class App extends React.Component {
  state = {
    data: null,  // Initialize with null to manage loading state
    country: '',
    loading: true,  // Add a loading state
  };

  async componentDidMount() {
    try {
      const data = await fetchData();
      this.setState({ data, loading: false });  // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ loading: false });  // Ensure loading stops even on error
    }
  }

  handleCountryChange = async (country) => {
    try {
      this.setState({ loading: true });  // Start loading when fetching data
      const data = await fetchData(country);
      this.setState({ data, country, loading: false });  // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching country data:', error);
      this.setState({ loading: false });  // Ensure loading stops even on error
    }
  };

  render() {
    const { data, country, loading } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        {loading ? (
          <p>Loading...</p>  // Simple loading indicator
        ) : (
          <>
            <Cards data={data} />
            <CountryPicker handleCountryChange={this.handleCountryChange} />
            <Chart data={data} country={country} />
          </>
        )}
      </div>
    );
  }
}

export default App;
