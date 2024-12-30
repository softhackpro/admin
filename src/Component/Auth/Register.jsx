import { React, useState } from "react";
import { toast } from 'react-toastify';
const Register = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const name = import.meta.env.VITE_COMPANY_NAME;
  const [user, setUser] = useState({
    email: "",
    phone: "",
    fullname: "",
    password: "",
    role:""
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const handlesignup = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(
          `${backendUrl}/api/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (response.status === 201) {
          toast.success("Registered Successfully");
        }
        if (response.status !== 201) {
          toast.error("Something Went Wrong");
        }
        // toast()
      } catch (error) {
        toast.error("Try After Sometime")
      }
  };
  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-2 display-5 text-center">Register</h2>
              <p className="text-secondary mb-2 text-center">
                {name}
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9">
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <div>
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                    <div className="col-12">
                      <label htmlFor="fullname" className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control" // class
                        id="fullname"
                        name="fullname"
                        value={user.fullname}
                        onChange={handleInput}
                        required
                      />
                    </div>
                        <div className="col-12 col-md-6">
                          <label htmlFor="email" className="form-label">
                            Email <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-envelope"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                              </svg>
                            </span>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={user.email}
                              onChange={handleInput}
                              required
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className="col-12 col-md-6">
                          <label htmlFor="phone" className="form-label">
                            Phone <span className="text-danger">*</span>
                          </label>
                          <div className="input-group">
                            <span className="input-group-text">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path></svg>
                            </span>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={user.phone}
                              onChange={handleInput}
                              required
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className="col-12 col-md-6">
                          <label htmlFor="role" className="form-label">
                          Role <span className="text-danger">*</span>
                        </label>
                        <select
                          id="role"
                          className="form-control"
                          name="role"
                          onChange={handleInput}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Manager">Manager</option>
                          <option value="Delivery">Delivery Boy</option>
                          <option value="Admin">Admin</option>
                        </select>
                        </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">
                        Set Password<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleInput}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <div className="row mb-4">
                        
                      <div className="d-grid">
                          <button
                            onClick={handlesignup}
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Register;
