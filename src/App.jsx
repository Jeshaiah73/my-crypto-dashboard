import { useState, useEffect } from "react";
import HomePage from './pages/home';
import {Routes, Route} from 'react-router';
import AboutPage from "./pages/about";
import Header from "./components/Header";
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  useEffect(() => { 
    const fetchCoins = async () => {
      try {
        const response = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!response.ok) throw new Error('Failed to fetch data'); 
        const data = await response.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCoins();
  }, [limit]);

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage
      coins={coins}
      filter={filter}
      setFilter={setFilter}
      limit={limit}
      setLimit={setLimit}
      sortBy={sortBy}
      setSortBy={setSortBy}
      loading={loading}
      error={error}
      />
    } 
      />
      <Route path='/about' element={<AboutPage /> } />
    </Routes>
    </>
  );
};

export default App;