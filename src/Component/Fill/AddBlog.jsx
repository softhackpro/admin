import React, { useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import imageTobase64 from "../helpers/imagetobase64";
import { toast } from "react-toastify";
import { useAuth } from "../stores/Auth";
const AddBlog = (props) => {
  const {user} = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const name = import.meta.env.VITE_COMPANY_NAME;

  const [img, setImg] = useState(null);
  const [image, setImage] = useState(null);
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const Type = props.value;

  const [users, setUser] = useState({
    Title: "",
  });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...users,
      [name]: value,
    });
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setImg(imagePic);
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", users.Title);
    
    formData.append("About", content);
    formData.append("image", image);
    formData.append("Type", Type);
    formData.append("user", user._id);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    try {
      const res = await axios.post(`${backendUrl}/api/addblog`, formData, config);
      if (res) {
        toast.success(res.data);
        setUser({
          Title: "",
        });
        setContent("");
        setImage(null);
        setImg(null);
      }
    } catch (error) {
      toast.error(error.response?.data || "An error occurred. Please try again.");
    }
  };
  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-2 display-5 text-center text-capitalize">
                {Type}
              </h2>
              <p className="text-secondary mb-2 text-center ">{name}</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9">
              <div className="bg-white border rounded shadow-sm overflow-hidden">
                <form action="#!">
                  <div className="row gy-4 gy-xl-5 p-4 p-xl-5">
                    <div className="col-12">
                      <label htmlFor="Title" className="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Title"
                        name="Title"
                        value={users.Title}
                        onChange={handleInput}
                        placeholder="Title"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="thumbnail" className="form-label">
                        Thumbnail <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="thumbnail"
                        accept=".jpg,.jpeg,.png,.webp"
                        onChange={handleImage}
                      />
                      <br />
                      {img !== null && (
                        <img
                          src={img}
                          alt=""
                          style={{ height: "130px", minWidth: "12px" }}
                        />
                      )}
                      {(Type !== "add banner") && (
                        <div className="col-12">
                          <br />
                          <label htmlFor="About" className="form-label">
                            Write about it<span className="text-danger">*</span>
                          </label>
                          <JoditEditor
                            className="form-control"
                            ref={editor}
                            value={content}
                            onChange={setContent}
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary btn-lg"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBlog;
