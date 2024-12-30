import React from 'react'

const Withdraw = () => {
  return (
    <div className="col-lg-4">
    <div className="card">
      <div className="card-body">
        <h5>Recent Orders</h5>
        <ul className="list-group">
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>John Doe</strong> <br />
              <small>Product: Widget A</small> <br />
              <small>Price: $45.99</small>
            </div>
            <span className="badge bg-success">Shipped</span>
          </li>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>Jane Smith</strong> <br />
              <small>Product: Gadget B</small> <br />
              <small>Price: $120.00</small>
            </div>
            <span className="badge bg-warning">Pending</span>
          </li>
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>Michael Lee</strong> <br />
              <small>Product: Gear C</small> <br />
              <small>Price: $85.50</small>
            </div>
            <span className="badge bg-danger">Cancelled</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Withdraw