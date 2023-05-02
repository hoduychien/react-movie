import { useRef } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Wrapper from '../wrapper/Wrapper';
import PosterFallback from '../../assets/no-poster.png';
import PropTypes from 'prop-types';
import './carousel.scss';
import Rating from '../rating/Rating';
import ImageLazy from '../loading/imageLazy/ImageLazy';
import Genres from '../genres/Genres';

const Carousel = ({ data, loading, endpoint, title }) => {
    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === 'left'
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth',
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <Wrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={() => navigation('left')} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={() => navigation('right')} />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                                >
                                    <div className="posterBlock">
                                        <ImageLazy src={posterUrl} />
                                        <Rating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids} />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">{dayjs(item.release_Date).format('MMM D, YYYY')}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </Wrapper>
        </div>
    );
};

Carousel.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    title: PropTypes.string,
    endpoint: PropTypes.string,
};

export default Carousel;
