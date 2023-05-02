import './details.scss';
import DetailsBanner from './detailBanner/DetailsBanner';
import Recommendation from './recommendation/Recommendation';
import useAsync from '../../hooks/useAsync';
import { useParams } from 'react-router-dom';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideosSection';
import Similar from './recommendation/Similar';

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useAsync(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useAsync(`/${mediaType}/${id}/credits`);
    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;
