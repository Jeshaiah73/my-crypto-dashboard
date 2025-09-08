import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

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
    <div>
      <h1>Lightcrypt Dash</h1>
      { loading && <p>Loading...</p>}
      { error && <div className='error'>{error}</div>}

      <LimitSelector limit={limit} onLimitChange={setLimit} />

      {!loading && !error && (
        <main className='grid'>
          { coins.map(coin => (
            <CoinCard key={coin.id} coin={coin} />
          ))}      
        </main> 
        ) }
    </div>
  );
};

export default App;