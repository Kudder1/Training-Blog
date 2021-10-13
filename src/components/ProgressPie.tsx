type ProgressPieProps = {
    percent: number;
    degree: number;
}

const ProgressPie = ({percent, degree}: ProgressPieProps) => {
    if (percent > 100) {
        degree = 360
    }
    if (percent < 0 || !percent) {
        percent = 0;
        degree = 0
    }
    return (
        <div className={`progress-pie-chart ${percent >= 50 ? 'gt-50' : ''} ${percent >= 75 ? 'gt-75' : ''}`} data-percent={percent}>
            <div className="ppc-progress">
                <div
                    className="ppc-progress-fill"
                    style={{transform: `rotate(${degree}deg)`}}>
                </div>
            </div>
            <div className="ppc-percents">
                <div className="pcc-percents-wrapper">
                    <span>{percent}%</span>
                </div>
            </div>
        </div>
    );
};

export default ProgressPie;