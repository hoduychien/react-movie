import { useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../utils/api';
const useAsync = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setData(null);
        setError(null);

        fetchDataFromAPI(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError('Something went wrong!');
            });
    }, [url]);

    return { data, loading, error };
};

export default useAsync;
