import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const ListUser = ({value}) => {
    console.log(value);
    
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const mainUrl = import.meta.env.VITE_MAIN_URL;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const isMounted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/getList/${value}`);
        setData(response.data);
        console.log(response);
        
        setFilteredData(response.data); // Set initial filtered data
      } catch (error) {
        toast.error("Can't load products");
      }
    };

    if (!isMounted.current) {
      fetchData();
      isMounted.current = true;
    }
  }, []);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item._id !== id));
    setFilteredData((prev) => prev.filter((item) => item._id !== id));
    toast.success("Product deleted successfully!");
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    setFilteredData(
      data.filter((item) =>
        item.Title.toLowerCase().includes(query) ||
        item.oprice.toString().includes(query) ||
        item.dprice.toString().includes(query)
      )
    );
    setCurrentPage(1); // Reset to first page on search
  };

  const paginate = (items, page, itemsPerPage) => {
    const start = (page - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = paginate(filteredData, currentPage, itemsPerPage);

  return (
    <div className="p-5">
      {/* Search Bar */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search by title, original price, or discount price"
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Title
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Created Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Original Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Discount Price
              </th>
              <th className="px-4 py-2 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-2 border border-gray-300">
                    {item.Title}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {moment(item.createdAt).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.oprice}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {item.dprice}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 flex justify-center gap-2">
                    <Link
                      to={`${mainUrl}/${item._id}`}
                      className="text-blue-500 hover:text-blue-700"
                      title="View"
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="text-green-500 hover:text-green-700"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(item._id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-2 border border-gray-300 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListUser;
