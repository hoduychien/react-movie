import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { fetchDataFromAPI } from './utils/api';
import { useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSilce';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResults from './pages/search/SearchResults';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import Layout from './components/layout/Layout';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromAPI('/configuration').then((res) => {
            const url = {
                backdrop: res.images.secure_base_url + 'original',
                poster: res.images.secure_base_url + 'original',
                profile: res.images.secure_base_url + 'original',
            };
            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let endPoints = ['tv', 'movie'];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromAPI(`/genre/${url}/list`));
        });
        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/:mediaType/:id" element={<Details />} />
                    <Route path="/search/:query" element={<SearchResults />} />
                    <Route path="/explore/:mediaType" element={<Explore />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
