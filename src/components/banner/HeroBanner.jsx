import { useEffect, useState } from 'react';
import './heroBanner.scss';
import { useNavigate } from 'react-router-dom';
import useAsync from '../../hooks/useAsync';
import { useSelector } from 'react-redux';
import ImageLazy from '../loading/imageLazy/ImageLazy';
import Wrapper from '../wrapper/Wrapper';
const HeroBanner = () => {
    const [background, setBackground] = useState('');

    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const { data, loading } = useAsync('/movie/popular');

    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        const bg = url.backdrop + data?.results[0].backdrop_path;
        setBackground(bg);
    }, [data, url.backdrop]);

    const handleSearchQuery = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const handleOnchangeSearchQuery = (event) => {
        setQuery(event.target.value);
    };

    return (
        <section className="hero">
            {!loading && (
                <div className="hero-background">
                    <ImageLazy src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <Wrapper>
                <div className="hero-content">
                    <span className="title">Welcome.</span>
                    <span className="subtitle">
                        Millions of movies, TV shows and people to discover. <a href="/">Explore now.</a>
                    </span>

                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search for a movie or TV shows..."
                            onChange={handleOnchangeSearchQuery}
                            onKeyUp={handleSearchQuery}
                        />
                        <button onClick={handleSearchQuery}>Search</button>
                    </div>
                </div>
            </Wrapper>
        </section>
    );
};

export default HeroBanner;
