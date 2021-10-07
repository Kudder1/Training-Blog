import React from 'react';

const Home = () => {
    return (
        <div className="main-content block">
            <h1 className="main-heading">27.09 - 03.10 неделя | все хранится в архиве</h1>
            <section className="activity-section activity-section--work">
                <div className="activity-section__item">
                    <h2 className="activity-section__title">Ice Rink</h2>
                    <div className="activity-progress">
                        <span className="activity-progress__text">
                            <b>Progress:</b> 35 / 360 minutes [edit]
                        </span>
                        <span>
                            <input className="progress-input" type="text" />
                            <button>Save</button>
                        </span>
                    </div>
                    <input className="track-input" type="text" placeholder="Minutes" />
                    <button disabled className="track-btn">Track</button>
                </div>
                <div className="activity-section__item">
                    <div className="progress-pie-chart" gt-50 data-percent="13">
                        <div className="ppc-progress">
                            <div className="ppc-progress-fill"></div>
                        </div>
                        <div className="ppc-percents">
                            <div className="pcc-percents-wrapper">
                                <span>13%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="activity-section">
                <h2 className="activity-section__title">Off Ice</h2>
                <input className="track-input" type="text" placeholder="Times" />
                <button className="track-btn">Track</button>
            </section>
            <section className="activity-section">
                <h2 className="activity-section__title">Stretching</h2>
                <input className="track-input" type="text" placeholder="Times" />
                <button className="track-btn">Track</button>
            </section>
        </div>
    );
};

export default Home;