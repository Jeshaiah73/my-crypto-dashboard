import {useState, useEffect} from 'react';
import { useParams } from "react-router";
const DETAIL_URL = 'https://api.coingecko.com/api/v3/coins'

const CoinDetailsPage = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { 
        const fetchCoin = async() => {
            try {
                const res = await fetch(`${DETAIL_URL}/${id}`);
                if(!res.ok) throw new Error('Failed to fetch data');
                const data = await res.json();
                console.log(data);
                setCoin(data);
                setCoin(data);
            } catch (error) {
                console.log(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoin();
    }, [id]);

    return ( 
        <div>Coin Details {id}</div>
     );
}
 
export default CoinDetailsPage;