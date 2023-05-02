import Carousel from '../../../components/carousel/Carousel';
import useAsync from '../../../hooks/useAsync';
import PropTypes from 'prop-types';

const Similar = ({ mediaType, id }) => {
    const { data, loading } = useAsync(`/${mediaType}/${id}/similar`);

    const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies';

    return <Carousel title={title} data={data?.results} loading={loading} endpoint={mediaType} />;
};
Similar.propTypes = {
    mediaType: PropTypes.string,
    id: PropTypes.string,
};

export default Similar;
