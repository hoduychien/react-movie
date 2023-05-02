import { useSelector } from 'react-redux';

import './cast.scss';

import avatar from '../../../assets/avatar.png';
import Wrapper from '../../../components/wrapper/Wrapper';
import ImageLazy from '../../../components/loading/imageLazy/ImageLazy';
import PropTypes from 'prop-types';

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <Wrapper>
                <div className="sectionHeading">Top Cast</div>
                {!loading ? (
                    <div className="listItems">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <ImageLazy src={imgUrl} />
                                    </div>
                                    <div className="name">{item.name}</div>
                                    <div className="character">{item.character}</div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </Wrapper>
        </div>
    );
};

Cast.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
};

export default Cast;
