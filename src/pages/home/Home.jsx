import HeroBanner from '../../components/banner/HeroBanner';
import Popular from '../../components/popular/Popular';
import TopRated from '../../components/toprated/TopRated';
import Trending from '../../components/trending/Trending';
import './home.scss';
const Home = () => {
    return (
        <div>
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;
