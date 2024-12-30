import React, { useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import imageTobase64 from "../helpers/imagetobase64";
import List from "../Show/List";
import { toast } from "react-toastify";
import { useAuth } from "../stores/Auth";
const AddForm = (props) => {
  const {user} = useAuth();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const name = import.meta.env.VITE_COMPANY_NAME;

  const [img, setImg] = useState(null);
  const [pho, setPho] = useState(null);
  const [phot, setPhot] = useState(null);
  const [image, setImage] = useState(null);

  const [ProductImage, setProductImage] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const Type = props.value;

  const [users, setUser] = useState({
    Title: "",
    YouTube: "",
    About: "",
    oprice: "",
    dprice: "",
    brand: "",
    pincode: "",
    deladdress: "",
    taxrate: "",
    scost: "50",
    state: "Jharkhand",
    stock: "",
    code: "",
    sku: "",
    percent: "",
    category: "",
    morephoto: "",
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
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    const photoPic = await imageTobase64(file);
    setPho(photoPic);
    setPhot(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Title", users.Title);
    formData.append("YouTube", users.YouTube);
    formData.append("oprice", users.oprice);
    formData.append("dprice", users.dprice);
    formData.append("brand", users.brand);
    formData.append("pincode", users.pincode);
    formData.append("deladdress", users.deladdress);
    formData.append("taxrate", users.taxrate);
    formData.append("scost", users.scost);
    formData.append("state", users.state);
    formData.append("stock", users.stock);
    formData.append("sku", users.sku);
    formData.append("code", users.code);
    formData.append("percent", users.percent);
    formData.append("category", users.category);
    formData.append("About", content);
    formData.append("image", image);
    formData.append("phot", phot);
    formData.append("Type", Type);
    formData.append("user", user._id);
    Array.from(ProductImage).forEach((item) => {
      formData.append("ProductImage", item);
    });
  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  
    try {
      const res = await axios.post(`${backendUrl}/api/addpost`, formData, config);
      if (res) {
        toast.success(res.data);
        setUser({
          Title: "",
          YouTube: "",
          About: "",
          thumbnail: "",
          simage: "",
          oprice: "",
          dprice: "",
          brand: "",
          pincode: "",
          deladdress: "",
          taxrate: "",
          scost: "",
          state: "",
          stock: "",
          code: "",
          sku: "",
          percent: "",
          category: "",
          morephoto: "",
        });
        setContent("");
        setImage(null);
        setImg(null);
      }
    } catch (error) {
      toast.error( "An error occurred. Please try again.");
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
                      {(Type === "add product" ||
                        Type === "add pages" ||
                        Type === "add blogs") && (
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
                    {Type === "add product" ? (
                      <div className="col-12">
                        <label htmlFor="simage" className="form-label">
                          Secondary Image <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="simage"
                          accept=".jpg,.jpeg,.png,.webp"
                          onChange={handlePhoto}
                        />
                        <br />
                        {pho !== null && (
                          <img
                            src={pho}
                            alt=""
                            style={{ height: "130px", minWidth: "12px" }}
                          />
                        )}
                        <br />

                        <label htmlFor="simage" className="form-label">
                          More Image{" "}
                          <span className="text-danger">* upto 8</span>
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          multiple
                          id="simage"
                          accept=".jpg,.jpeg,.png,.webp"
                          // value={ProductImage}
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files.length > 8) {
                              toast.warning("Upto 8 Images Only");
                              e.target.value = "";
                            } else {
                              setProductImage(files);
                            }
                          }}
                        />

                        {ProductImage && ProductImage.length > 0 ? (
                          <div className="kbfvbmvnswipercss">
                            {Array.from(ProductImage).map((item) => {
                              return (
                                <div key={item.id} className="jshkjsswipehere">
                                  <img
                                    src={
                                      item ? URL.createObjectURL(item) : null
                                    }
                                    alt=""
                                    style={{ height: "100%", width: "100%" }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        ) : null}

                        <br />
                        <label htmlFor="YouTube" className="form-label">
                          Youtube Link
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="YouTube"
                          name="YouTube"
                          placeholder="https://www.youtube.com/xxxxx"
                          value={users.YouTube}
                          onChange={handleInput}
                        />
                        <br />
                        <label htmlFor="oprice" className="form-label">
                          Original Price <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="oprice"
                          name="oprice"
                          placeholder="Original Price"
                          value={users.oprice}
                          onChange={handleInput}
                        />
                        <br />
                        <label htmlFor="dprice" className="form-label">
                          Discount Price <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="dprice"
                          name="dprice"
                          placeholder="Discounted Price"
                          value={users.dprice}
                          onChange={handleInput}
                        />
                        <br />
                        <label htmlFor="brand" className="form-label">
                          Brand <span className="text-danger">*</span>
                        </label>
                        <select
                          id="brand"
                          className="form-control"
                          name="brand"
                          onChange={handleInput}
                          required
                        >
                          <option value="">Select</option>
                          <option value="Generic">Generic</option>
                          <option value="5%">5%</option>
                          <option value="18%">18%</option>
                          <option value="28%">28%</option>
                        </select>
                        <br />
                        <label htmlFor="pincode" className="form-label">
                          Pincode <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          name="pincode"
                          placeholder="Pincode"
                          value={users.pincode}
                          onChange={handleInput}
                          minLength={6}
                          maxLength={6}
                        />
                        <br />
                        <label htmlFor="deladdress" className="form-label">
                          Delivery Address
                          <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          id="deladdress"
                          name="deladdress"
                          placeholder="Delivery Address"
                          value={users.deladdress}
                          onChange={handleInput}
                        ></textarea>
                        <br />
                        <label htmlFor="taxrate" className="form-label">
                          Tax <span className="text-danger">*</span>
                        </label>
                        <select
                          id="taxrate"
                          className="form-control"
                          name="taxrate"
                          onChange={handleInput}
                          required
                        >
                          <option value="">Select</option>
                          <option value="0">0%</option>
                          <option value="5">5%</option>
                          <option value="18">18%</option>
                          <option value="28">28%</option>
                        </select>
                        <br />
                        <label htmlFor="scost" className="form-label">
                          Shipping Cost <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="scost"
                          name="scost"
                          value="50 Rupee"
                          disabled
                        />
                        <br />
                        <label htmlFor="state" className="form-label">
                          State <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value="Jharkhand"
                          disabled
                        />
                        <br />
                        <label htmlFor="stock" className="form-label">
                          Stock
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="stock"
                          name="stock"
                          placeholder="Default 1 (1-3)"
                          value={users.stock}
                          onChange={handleInput}
                          minLength={1}
                          maxLength={3}
                        />
                        <br />
                        <label htmlFor="code" className="form-label">
                          Coupon Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="code"
                          name="code"
                          placeholder="Coupon Code (3-6)"
                          value={users.code}
                          onChange={handleInput}
                          minLength={3}
                          maxLength={6}
                        />
                        <br />
                        <label htmlFor="sku" className="form-label">
                          Sku Code <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="sku"
                          name="sku"
                          placeholder="SKU (4)"
                          value={users.sku}
                          onChange={handleInput}
                          minLength={4}
                          maxLength={4}
                        />
                        <br />
                        <label htmlFor="percent" className="form-label">
                          Percent % <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="percent"
                          name="percent"
                          value={users.percent}
                          onChange={handleInput}
                          minLength={1}
                          maxLength={2}
                        />
                        <br />
                        <label htmlFor="category" className="form-label">
                          Category <span className="text-danger">*</span>
                        </label>
                        <select
                          id="category"
                          className="form-control"
                          name="category"
                          onChange={handleInput}
                          required
                        >
                          <option value="">Select</option>
                          <option value="0%">Agarbatti</option>
                          <option value="5%">Flower</option>
                          <option value="18%">18%</option>
                          <option value="28%">28%</option>
                        </select>
                        <br />
                      </div>
                    ) : null}
                    {Type === "add shopkeeper" ? (
                      <>
                        <div className="col-12">
                          <label htmlFor="mail" className="form-label">
                            Shopkeeper Email{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="mail"
                            placeholder="email"
                            name="mail"
                            value={users.mail}
                            onChange={handleInput}
                          />
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="password"
                            name="password"
                            value={users.password}
                            onChange={handleInput}
                          />
                        </div>
                      </>
                    ) : null}

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

export default AddForm;
