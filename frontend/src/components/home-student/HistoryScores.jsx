import React, { useEffect, useState } from 'react'

function ScoreHistory() {
    return (
        <>
        {/* <!-- start history container --> */}
        <div className="student-home-history">
          <div className="student-home-history-label">History <i className="fa-solid fa-clock-rotate-left"></i></div>
          <div className="student-home-grid">
            <div className="history-grids-label">
              <span className="history-label">Subject</span>
              <span className="history-label">Type</span>
              <span className="history-label">Date</span>
              <span className="history-label">Score</span>
            </div>

            <div className="history-grids">
              <div className="student-home-scores">
                  <p>galing sayo laman neto no?</p>
              </div>
            </div>
            <div className="history-grids">
              <div className="student-home-scores">
                  <p>galing sayo laman neto no?</p>
              </div>
            </div>
          </div>

        </div>
        {/* <!-- end history container --> */}
        </>
    )
}

export default ScoreHistory;