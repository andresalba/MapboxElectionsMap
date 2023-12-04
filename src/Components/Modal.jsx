import './Modal.css'

const Modal = ({ nombre, electoral, winner, percentb, percentt, votesb, votest }) => {

    const projectedWinnerClass = winner === 'Trump' ? 'modal-red' : 'modal-blue';

    return (
        <div className="modal-layer">
            <div className="modal-title">
                <div className="modal-head">
                    <div className="modal-font">
                        President: {nombre}
                    </div>
                    <div className="modal-font">
                        {electoral} Electoral Votes
                    </div>
                </div>
                <div className={`${projectedWinnerClass} modal-font`}>
                    Projected Winner: {winner}
                </div>
            </div>
            <div className="modal-row">
                <div className="modal-data modal-grey">
                    Candidate
                </div>
                <div className="modal-data modal-grey modal-left">
                    %
                </div>
                <div className="modal-data modal-grey modal-left">
                    Votes
                </div>
            </div>
            <div className="modal-row">
                <div className="modal-data modal-blue">
                    Biden
                </div>
                <div className="modal-data modal-left">
                    {percentb}%
                </div>
                <div className="modal-data modal-left">
                    {votesb}
                </div>
            </div>
            <div className="modal-row">
                <div className="modal-data modal-red">
                    Trump
                </div>
                <div className="modal-data modal-left">
                    {percentt}%
                </div>
                <div className="modal-data modal-left">
                    {votest}
                </div>
            </div>
        </div>
    );
};

export default Modal;