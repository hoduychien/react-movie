import { useState } from 'react';

import Wrapper from '../wrapper/Wrapper';
import Carousel from '../carousel/Carousel';
import useAsync from '../../hooks/useAsync';
import Switch from '../switch/Switch';

const TopRated = () => {
    const [endpoint, setEndpoint] = useState('movie');

    const { data, loading } = useAsync(`/${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
    };

    return (
        <div className="carousel-wrapper">
            <Wrapper>
                <span className="carousel-title">Top Rated</span>
                <Switch data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </Wrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );
};

export default TopRated;
