type ProgressPieProps = {
    percent: number;
    degree: number;
}

const ProgressPie = ({percent, degree}: ProgressPieProps) => {
    return (
        <div className={`progress-pie-chart ${percent >= 50 ? 'gt-50' : ''}`} data-percent={percent}>
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