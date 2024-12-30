import React from 'react'

const RecentOrder = () => {
  return (
   
    <div className="container mt-4">
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">Withdraw Requests</h5>
      </div>
      <div className="card-body">
        <ul className="list-group">
          
          <li className="list-group-item d-flex justify-content-between align-items-center flex-column flex-sm-row p-3">
            <div className="mb-2 mb-sm-0">
              <strong>User: John Doe</strong><br/>
              <small>Amount: $200</small><br/>
              <small className="text-muted">Date: 2024-12-06</small>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <span className="badge bg-warning text-dark mb-2 mb-sm-0">Pending</span>
              <div className="btn-group ms-2">
                <button className="btn btn-success btn-sm">Approve</button>
                <button className="btn btn-danger btn-sm">Reject</button>
              </div>
            </div>
          </li>
  
          
          <li className="list-group-item d-flex justify-content-between align-items-center flex-column flex-sm-row p-3">
            <div className="mb-2 mb-sm-0">
              <strong>User: Jane Smith</strong><br/>
              <small>Amount: $150</small><br/>
              <small className="text-muted">Date: 2024-12-05</small>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <span className="badge bg-success text-white mb-2 mb-sm-0">Approved</span>
              <div className="btn-group ms-2">
                <button className="btn btn-success btn-sm" disabled>Approve</button>
                <button className="btn btn-danger btn-sm" disabled>Reject</button>
              </div>
            </div>
          </li>
  
        
          <li className="list-group-item d-flex justify-content-between align-items-center flex-column flex-sm-row p-3">
            <div className="mb-2 mb-sm-0">
              <strong>User: Michael Lee</strong><br/>
              <small>Amount: $100</small><br/>
              <small className="text-muted">Date: 2024-12-04</small>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <span className="badge bg-danger text-white mb-2 mb-sm-0">Rejected</span>
              <div className="btn-group ms-2">
                <button className="btn btn-success btn-sm" disabled>Approve</button>
                <button className="btn btn-danger btn-sm" disabled>Reject</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default RecentOrder