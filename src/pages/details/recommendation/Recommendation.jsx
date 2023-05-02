import Carousel from '../../../components/carousel/Carousel';
import useAsync from '../../../hooks/useAsync';
import PropTypes from 'prop-types';
const Recommendation = ({ mediaType, id }) => {
    const { data, loading } = useAsync(`/${mediaType}/${id}/recommendations`);

    return (
        <div>
            {data && <Carousel title="Recommendations" data={data?.results} loading={loading} endpoint={mediaType} />}
        </div>
    );
};
Recommendation.propTypes = {
    mediaType: PropTypes.string,
    id: PropTypes.string,
};

export default Recommendation;
