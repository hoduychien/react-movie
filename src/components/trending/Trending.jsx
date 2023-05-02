import { useState } from 'react';
import Switch from '../switch/Switch';
import Wrapper from '../wrapper/Wrapper';
import useAsync from '../../hooks/useAsync';
import Carousel from '../carousel/Carousel';

const Trending = () => {
    const [endpoint, setEndpoint] = useState('day');

    const { data, loading } = useAsync(`/trending/movie/${endpoint}`);

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Day' ? 'day' : 'week');
    };
    return (
        <div className="carousel-wrapper">
            <Wrapper>
                <span className="carousel-title">Trending</span>
                <Switch data={['Day', 'Week']} onTabChange={onTabChange} />
            </Wrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;
