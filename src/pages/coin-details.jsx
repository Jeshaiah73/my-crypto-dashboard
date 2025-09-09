import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router";
// import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';

const DETAIL_URL = 'https://api.coingecko.com/api/v3/coins';

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { 
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${DETAIL_URL}/${id}`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoin(data);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return ( 
    <div className="coin-details-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
      </h1>

      {/* {loading && <Spinner />} */}
      {loading && (
        <div className="coin-details-container">
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-circle"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="coin-details-info">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      )}

      {error && <div className="error">❌ {error}</div>}

      {!loading && !error && coin && (
        <div className="coin-card-animated">
          <img 
            src={coin.image.large} 
            alt={coin.name}
            className="coin-details-image"
          />

          <p className="coin-details-description">
            {coin.description.en.split('. ')[0] + '.'}
          </p>

          <div className="coin-details-info">
            <h3>🏆 Rank: {coin.market_cap_rank}</h3>
            <h3>💰 Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h3>
            <h4>📊 Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h4>
            <h4>⬆️ 24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>⬇️ 24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              🔄 24h Change: ${coin.market_data.price_change_24h.toFixed(2)} (
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>🔹 Circulating Supply: {coin.market_data.circulating_supply.toLocaleString()}</h4>
            <h4>🔸 Total Supply: {coin.market_data.total_supply?.toLocaleString() || 'N/A'}</h4>
            <h4>
              🚀 All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              📉 All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>📅 Last Updated: {new Date(coin.last_updated).toLocaleDateString()} </h4>
          </div>

          <CoinChart coinId={coin.id} />

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <a 
                href={coin.links.homepage[0]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-badge"
              >
                🌐 Website
              </a>
            )}
            {coin.links.blockchain_site[0] && (
              <a 
                href={coin.links.blockchain_site[0]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-badge"
              >
                🧩 Blockchain Explorer
              </a>
            )}
            {coin.categories.length > 0 && (
              <span className="category-badge">
                📂 {coin.categories.join(', ')}
              </span>
            )}
          </div>
        </div>
      )}

      {!loading && !error && !coin && <p>No Data Found!</p>}
    </div>
  );
};

export default CoinDetailsPage;
