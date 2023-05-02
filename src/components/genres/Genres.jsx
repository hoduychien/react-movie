import { useSelector } from 'react-redux';
import './genres.scss';
import PropTypes from 'prop-types';

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);
    return (
        <div className="genres">
            {data?.map((item) => {
                return (
                    <div className="genre" key={item}>
                        {genres[item]?.name}
                    </div>
                );
            })}
        </div>
    );
};

Genres.propTypes = {
    data: PropTypes.array,
};

export default Genres;
