import PropTypes from 'prop-types';
import './switch.scss';
import { useState } from 'react';
const Switch = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };
    return (
        <div>
            <div className="switch">
                <div className="tabItems">
                    {data.map((tab, index) => (
                        <span
                            key={index}
                            className={`tabItem ${selectedTab === index ? 'active' : ''}`}
                            onClick={() => activeTab(tab, index)}
                        >
                            {tab}
                        </span>
                    ))}
                    <span className="movingBg" style={{ left }} />
                </div>
            </div>
        </div>
    );
};

Switch.propTypes = {
    data: PropTypes.array,
    onTabChange: PropTypes.func,
};

export default Switch;
