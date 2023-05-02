import { useState } from 'react';

import './videosSection.scss';

import { PlayIcon } from '../detailBanner/PlayBtn';
import Wrapper from '../../../components/wrapper/Wrapper';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import ImageLazy from '../../../components/loading/imageLazy/ImageLazy';
import PropTypes from 'prop-types';

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <Wrapper>
                <div className="sectionHeading">Official Videos</div>
                {!loading ? (
                    <div className="videos">
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail">
                                    <ImageLazy src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </Wrapper>
            <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
        </div>
    );
};
VideosSection.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
};

export default VideosSection;
