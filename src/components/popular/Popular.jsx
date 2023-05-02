import { useState } from 'react';

import Wrapper from '../wrapper/Wrapper';
import Carousel from '../carousel/Carousel';
import useAsync from '../../hooks/useAsync';
import Switch from '../switch/Switch';

const Popular = () => {
    const [endpoint, setEndpoint] = useState('movie');

    const { data, loading } = useAsync(`/${endpoint}/popular`);

    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
    };

    return (
        <div className="carousel-wrapper">
            <Wrapper>
                <span className="carousel-title">Whats Popular</span>
                <Switch data={['Movies', 'TV Shows']} onTabChange={onTabChange} />
            </Wrapper>
            <Carousel data={data?.results} loading={loading} endpoint={endpoint} />
        </div>
    );
};

export default Popular;
