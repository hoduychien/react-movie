import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './movieCard.scss';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from '../rating/Rating';
import Genres from '../genres/Genres';
import ImageLazy from '../loading/imageLazy/ImageLazy';

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path ? url.poster + data.poster_path : PosterFallback;
    return (
        <div className="movieCard" onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div className="posterBlock">
                <ImageLazy className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">{dayjs(data.release_date).format('MMM D, YYYY')}</span>
            </div>
        </div>
    );
};
MovieCard.propTypes = {
    data: PropTypes.object,
    fromSearch: PropTypes.bool,
    mediaType: PropTypes.string,
};
export default MovieCard;
