import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './detailBanner.scss';
import Genres from '../../../components/genres/Genres';
import Wrapper from '../../../components/wrapper/Wrapper';
import PosterFallback from '../../../assets/no-poster.png';
import { PlayIcon } from './PlayBtn';
import ImageLazy from '../../../components/loading/imageLazy/ImageLazy';
import useAsync from '../../../hooks/useAsync';
import PropTypes from 'prop-types';
import CircleRating from '../../../components/rating/Rating';
import VideoPopup from '../../../components/videoPopup/VideoPopup';

const DetailsBanner = ({ video }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useAsync(`/${mediaType}/${id}`);

    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <ImageLazy src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className="opacity-layer"></div>
                            <Wrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.poster_path ? (
                                            <ImageLazy src={url.backdrop + data.poster_path} />
                                        ) : (
                                            <ImageLazy src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${data.name || data.title} (${dayjs(data?.release_date).format('YYYY')})`}
                                        </div>
                                        <div className="subtitle">{data.tagline}</div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating rating={data.vote_average.toFixed(1)} />
                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video.key);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{data.overview}</div>
                                        </div>

                                        <div className="info">
                                            {data.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">Status: </span>
                                                    <span className="text">{data.status}</span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">Release Date: </span>
                                                    <span className="text">
                                                        {dayjs(data.release_date).format('MMM D, YYYY')}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">Runtime: </span>
                                                    <span className="text">{toHoursAndMinutes(data.runtime)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                            </Wrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <Wrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </Wrapper>
                </div>
            )}
        </div>
    );
};

DetailsBanner.propTypes = {
    video: PropTypes.object,
};

export default DetailsBanner;
