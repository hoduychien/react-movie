import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';

const ImageLazy = ({ src }) => {
    return (
        <div>
            <LazyLoadImage alt="" effect="blur" src={src} />
        </div>
    );
};

ImageLazy.propTypes = {
    src: PropTypes.string,
};

export default ImageLazy;
