import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../utilities/constants";
import UserData from "../components/UserData";
import { UserContext, SelectedUserContext } from "../utilities/UserContext";
import Pagination from "../components/Pagination";
import { MdDeleteForever } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const Home = () => {
  const { allData, setAllData } = useContext(UserContext);
  const { selectedUser, setSelectedUser } = useContext(SelectedUserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);

  //fetching data
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, { method: "GET" });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setAllData(data);
        // setFilteredItems(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setFilteredItems(allData);
    }
  }, [searchQuery]);

  useEffect(() => {
    setFilteredItems(allData);
  }, [allData]);

  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    const filteredData = allData.filter((item) => {
      const searchTerms = searchQuery.toLowerCase().split(" ");
      return searchTerms.every((term) =>
        [item.name, item.email, item.role].some((attribute) =>
          attribute.toLowerCase().includes(term)
        )
      );
    });

    setFilteredItems(filteredData);
  };
  //handle Input
  const handleInput = (e) => {
    setSearchQuery(e.target.value);
    // handleSearch();
  };

  const handleSelectedDelete = () => {
    if (selectedUser.length > 0) {
      const updatedItems = allData.filter(
        (item) => !selectedUser.includes(item.id)
      );
      if (confirm(`Are you sure you want to delete the selected items?`)) {
        setAllData(updatedItems);
        setSelectedUser([]);
      }
    } else {
      alert("Nothing to delete... \nSelect something to delete!");
    }
  };

  //Pagination
  const lastUserIndex = currentPage * dataPerPage;
  const firstUserIndex = lastUserIndex - dataPerPage;
  const currentPosts = allData.slice(firstUserIndex, lastUserIndex);
  const filteredPost = filteredItems.slice(firstUserIndex, lastUserIndex);

  return (
    <div className="my-3">
      <div className="flex  my-4 gap-3">
        <form
          onSubmit={handleSearch}
          className="w-full py-2 px-4 border-2 gap-2 rounded-lg flex justify-between"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleInput}
            placeholder="Search by name, value or role..."
            className="w-full focus:outline-none rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="w-fit border-2 p-1 rounded-lg search-icon"
          >
            <IoMdSearch />
          </button>
        </form>
        <button
          className={`px-5 py-2 rounded-xl text-white font-semibold text-md w-[fit-content] ${
            selectedUser.length > 0
              ? "bg-red-500"
              : "bg-red-300 cursor-not-allowed"
          }`}
          onClick={handleSelectedDelete}
          disabled={selectedUser.length > 0 ? false : true}
        >
          <MdDeleteForever />
        </button>
      </div>
      <div className="flex justify-center items-center text-center flex-col">
        {searchQuery ? (
          filteredItems.length == 0 ? (
            <h1>No Data matches your search query</h1>
          ) : (
            <>
              <UserData data={filteredPost} />
              <div className="flex mt-4 flex-1 justify-between lg:w-[90%] items-center flex-wrap">
                <p className="text-gray-400">
                  {selectedUser.length} of {filteredItems.length} row(s)
                  selected.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Pagination
                    totalData={filteredItems.length}
                    dataPerPage={dataPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <UserData data={currentPosts} />
            <div className="flex mt-4 flex-1 justify-between lg:w-[90%] items-center flex-wrap">
              <p className="text-gray-400">
                {selectedUser.length} of {allData.length} rows(s) selected.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Pagination
                  totalData={allData.length}
                  dataPerPage={dataPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
