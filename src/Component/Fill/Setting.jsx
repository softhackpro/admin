import React, { useEffect, useState } from "react";
import axios from "axios";
import imageTobase64 from "../helpers/imagetobase64";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const Settings = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [users, setUser] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    quora: "",
    youtube: "",
    flyube: "",
    rectangleLogo: "",
    companyName: "",
    slogan: "",
    playstore: "",
    iosStore: "",
    phoneNumber: "",
    footer: "",
    squareLogo: "",
  });

  const [imgPreview, setImgPreview] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...users, [name]: value });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64Image = await imageTobase64(file);
    setImgPreview(base64Image);
    setUser({ ...users, rectangleLogo: file });
  };

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    const base64Photo = await imageTobase64(file);
    setPhotoPreview(base64Photo);
    setUser({ ...users, squareLogo: file });
  };

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/getSettings`);
      
      const data = res.data.data;

      setUser({
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        twitter: data.twitter || "",
        quora: data.quora || "",
        youtube: data.youtube || "",
        flyube: data.flyube || "",
        rectangleLogo: data.rectangleLogo || "",
        companyName: data.companyName || "",
        slogan: data.slogan || "",
        playstore: data.playstore || "",
        iosStore: data.iosStore || "",
        phoneNumber: data.phoneNumber || "",
        footer: data.footer || "",
        squareLogo: data.squareLogo || "",
      });

      if (data.rectangleLogo) setImgPreview(`${backendUrl}/public/Images/${data.rectangleLogo}`);
      if (data.squareLogo) setPhotoPreview(`${backendUrl}/public/Images/${data.squareLogo}`);
    } catch (error) {
      toast.error("Failed to load settings. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(users).forEach((key) => {
      formData.append(key, users[key]);
    });

    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const res = await axios.post(`${backendUrl}/api/settings`, formData, config);
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="form-container shadow-lg p-4 rounded bg-white">
            <h2 className="text-center text-primary mb-5" style={headerStyles}>
              Update Your Settings
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6 text-center">
                  <label htmlFor="squareLogo" className="form-label">Upload Square Logo</label>
                  <input
                    type="file"
                    className="form-control shadow-sm"
                    id="squareLogo"
                    name="squareLogo"
                    accept="image/*"
                    onChange={handlePhoto}
                  />
                  {photoPreview && (
                    <div className="mt-3">
                      <img
                        src={photoPreview}
                        style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
                        alt="Square Logo Preview"
                      />
                    </div>
                  )}
                </div>

                <div className="col-md-6 text-center">
                  <label htmlFor="rectangleLogo" className="form-label">Upload Rectangle Logo</label>
                  <input
                    type="file"
                    className="form-control shadow-sm"
                    id="rectangleLogo"
                    name="rectangleLogo"
                    accept="image/*"
                    onChange={handleImage}
                  />
                  {imgPreview && (
                    <div className="mt-3">
                      <img
                        src={imgPreview}
                        style={{ width: "250px", height: "80px", objectFit: "contain", borderRadius: "8px" }}
                        alt="Rectangle Logo Preview"
                      />
                    </div>
                  )}
                </div>
              </div>

              <h3 className="mt-5">Social Media Links</h3>
              <div className="row g-4">
                {["facebook", "instagram", "twitter", "quora", "youtube", "flyube"].map((platform) => (
                  <div className="col-md-6" key={platform}>
                    <label htmlFor={platform} className="form-label">{capitalizeFirstLetter(platform)} Link</label>
                    <input
                      type="url"
                      className="form-control shadow-sm"
                      id={platform}
                      name={platform}
                      value={users[platform]}
                      placeholder={`https://${platform}.com/yourpage`}
                      onChange={handleInput}
                    />
                  </div>
                ))}
              </div>

              <h3 className="mt-5">Company Details</h3>
              <div className="row g-4">
                <div className="col-md-6">
                  <label htmlFor="companyName" className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="companyName"
                    name="companyName"
                    value={users.companyName}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="slogan" className="form-label">Slogan</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="slogan"
                    name="slogan"
                    value={users.slogan}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <label htmlFor="playstore" className="form-label">Play Store Link</label>
                  <input
                    type="url"
                    className="form-control shadow-sm"
                    id="playstore"
                    name="playstore"
                    value={users.playstore}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="iosStore" className="form-label">iOS Store Link</label>
                  <input
                    type="url"
                    className="form-control shadow-sm"
                    id="iosStore"
                    name="iosStore"
                    value={users.iosStore}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control shadow-sm"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={users.phoneNumber}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="footer" className="form-label">Footer Text</label>
                  <input
                    type="text"
                    className="form-control shadow-sm"
                    id="footer"
                    name="footer"
                    value={users.footer}
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="text-center mt-5">
                <button type="submit" className="btn btn-primary btn-lg px-5 py-3 shadow-sm">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const headerStyles = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  color: "#007bff",
  fontSize: "2.5rem",
  fontWeight: "600",
  textShadow: "2px 2px 6px rgba(0, 123, 255, 0.5)",
};

export default Settings;
