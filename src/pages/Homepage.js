import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";
import home from "assets/banner.jpg";
import { motion } from "framer-motion";
import { homeAnimation, homeInfoAnimation } from "animation";
import Navbar from './../components/Navbar';
import Footer from './../components/Footer';

function App() {
  const [data, setData] = useState([]);
  const [searchdata, setSearchData] = useState("");
  const [type, setType] = useState("");
  const [modaldata, setModaldata] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  var maxLength = 35;

  useEffect(() => {
    loadUsersData();
  }, []);

  const loadUsersData = async () => {
    return await axios.get('https://api.spacexdata.com/v3/history')
      .then((response) => setData(response.data))
      .catch((err) => { console.log(err) })
  }

  const handleReset = () => {
    loadUsersData();
  };
  const searchFlightNumber = async (value) => {
    return await axios.get(`https://api.spacexdata.com/v3/history?flight_number=${value}`)
      .then((response) => {
        setData(response.data);
        setSearchData("");
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
  const searchId = async (value) => {
    return await axios.get(`https://api.spacexdata.com/v3/history?id=${value}`)
      .then((response) => {
        setData(response.data);
        setType("");
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(records.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)

  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1)
    }
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1)
    }
  }

  const showDetail = (id) => {
    axios.get(`https://api.spacexdata.com/v3/history/${id}`)
      .then((response) => {
        setModaldata(response.data)
        console.log(response.data)
      })
      .catch((err) => { console.log(err) })
  }

  function handleSort() {
    const sortedData = [...data].sort((a, b) => {
      return a.first > b.first ? 1 : -1
    })
    setData(sortedData)
  }

  return (
    <div>
      <Section id="home" className="pb-20">
        <Navbar />
        <motion.div className="home"
          variants={homeAnimation}
          transition={{ delay: 0.3, duration: 0.6, type: "tween" }}>
          <div className="content text-left">
            <div className="title">
              <h2 className='text-white text-left'>COMPLETED MISSION</h2>
              <h1 className='text-white text-left'>AX-2 MISSION</h1>
            </div>
            <div>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 text-left'>REWATCH</button>
            </div>
          </div>
        </motion.div>

        <motion.div className="info"
          variants={homeInfoAnimation}
          transition={{ delay: 0.3, duration: 0.6, type: "tween" }}>
          <div className="grid justify-between">
            <div className="col">
              <p>RECENT LAUNCH</p>
              <strong>STARLINK MISSION</strong>
            </div>
            <div className="col">
              <p>RECENT LAUNCH</p>
              <strong>ARABSAT BADR-8 MISSION</strong>
            </div>
            <div className="col">
              <p>RECENT</p>
              <strong>STARSHIP FLIGHT TEST</strong>
            </div>
            <div className="col">
              <div className='text-6xl'>235 </div>
              <p className='text-1xl mt-1'>TOTAL LAUNCHES</p>
            </div>
            <div className="col">
              <div className='text-6xl'>196</div>
              <p className='text-1xl mt-1'>TOTAL LANDINGS</p>
            </div>
            <div className="col">
              <div className='text-6xl'>169</div>
              <p className='text-1xl mt-1'>TOTAL REFLIGHTS</p>
            </div>
          </div>
        </motion.div>
      </Section>

      <div className="md:container md:mx-auto pt-20">
        <div className='flex flex-col xl:flex-row 2xl:flex-row justify-start my-1 mt-5 border-solid border-1 border-black-600 pt-3 pb-2 pl-3 border-opacity-5'>
          <div className='w-[42rem] sm:mb-3 md:mb-3'>
            <h5 className="text-black text-left">1.Filter By Flight Number</h5>
            <div className='flex justify-left'><input type="search" className='form-input' placeholder='Search Flight Number...' value={searchdata} onChange={(e) => setSearchData(e.target.value)} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => searchFlightNumber(searchdata)}>Search</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleReset()}>Reset</button>
            </div>
          </div>
          <div className='w-[42rem] sm:mb-3 md:mb-3'>
            <h5 className="text-black text-left">2.Filter By Id</h5>
            <div className='flex justify-left'><input type="search" className='form-input' placeholder='Search id...' value={type} onChange={(e) => setType(e.target.value)} />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => searchId(type)}>Search</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleReset()}>Reset</button>
            </div>
          </div>
          <div className='w-[15rem] sm:mb-3 md:mb-2'>
            <h5 className="text-black text-left">3.Sort</h5>
            <div className='flex justify-left'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-1" onClick={handleSort} id="sort-a-z">Sort</button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleReset()}>Reset</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                    <tr className="border-b bg-black">
                      <th scope="col" className="text-white px-6 py-4">Id</th>
                      <th scope="col" className="text-white px-6 py-4">Flight Number</th>
                      <th scope="col" className="text-white px-6 py-4">Event Date Unix</th>
                      <th scope="col" className="text-white px-6 py-4">Event Date Utc</th>
                      <th scope="col" className="text-white px-6 py-4">Title</th>
                      <th scope="col" className="text-white px-6 py-4">Details</th>
                      <th scope="col" className="text-white px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.length === 0 ?
                      (
                        <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                          <td colSpan={8} className='text-black whitespace-nowrap px-6 py-4 font-medium text-center'>No Data Found</td>
                        </tr>
                      ) : (
                        records.map((item) =>
                          <>
                            (
                            <tr className="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600">
                              <td className="text-black whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                              <td className="text-black whitespace-nowrap px-6 py-4">{item.flight_number}</td>
                              <td className="text-black whitespace-nowrap px-6 py-4">{item.event_date_unix} </td>
                              <td className="text-black whitespace-nowrap px-6 py-4">{item.event_date_utc}</td>
                              <td className="text-black whitespace-nowrap px-6 py-4">{item.title}</td>
                              <td className="text-black whitespace-nowrap px-6 py-4">{item.details.substring(0, maxLength) + '...'}</td>
                              <td className="text-black whitespace-nowrap px-6 py-4"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => showDetail(item.id)} data-toggle="modal" data-target="#myModal">View</button></td>
                            </tr>
                            )
                          </>

                        )
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-2 mb-4 flex justify-center'>
          <nav>
            <ul className='pagination'>
              <li className='page-item'>
                <button className='page-link' onClick={prePage}>Previous</button>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <button className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                  </li>
                ))
              }
              <li className='page-item'>
                <button className='page-link' onClick={nextPage}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="modal" id="myModal">
          <div className="modal-dialog grid place-items-center h-screen sm:max-[100%]" style={{ maxWidth: '90%' }} >
            <div className="modal-content">
              <div className="modal-header bg-blue-500">
                <h4 className="modal-title text-white">Row No : {modaldata.id}</h4>
                <button type="button" className="close text-white" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <table className="table table-striped table-sm">
                  <thead className="thead-light">
                    <tr>
                      <th>Id</th>
                      <th>Flight Number</th>
                      <th>Event Date Unix</th>
                      <th>Event Date Utc</th>
                      <th>Title</th>
                      <th>Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{modaldata.id}</td>
                      <td>{modaldata.flight_number}</td>
                      <td>{modaldata.event_date_unix}</td>
                      <td>{modaldata.event_date_utc}</td>
                      <td>{modaldata.title}</td>
                      <td>{modaldata.details}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
const Section = styled.section`
  background: url(${home}) no-repeat center;
  min-height: 100vh;
  background-size: cover;
  position: relative;
  .home{
    height: 100%;
    .content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 60%;
      color: #fff;
      gap: 1.2rem;
      margin-top: 8rem;
      padding-left: 18rem;
      .title {
        h1 {
          font-size: 5rem;
          line-height: 5.3rem;
        }
      }
      .subTitle {
        p {
          width: 70%;
          margin-bottom: 2rem;
        }
      }
    }
  }
  .info {
    position: absolute;
    bottom: -6rem;
    right: 0;
    background-color: var(--secondary-color);
    padding: 4rem;
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4rem;
      color: #fff;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    .home {
      .content {
        padding-left: 2rem;
        width: 100%;
        margin-bottom: 2rem;
        .title {
          h1 {
            font-size: 4rem;
            line-height: 4rem;
          }
        }
      }
    }
    .info {
      position: initial;
      .grid {
        grid-template-columns: 1fr;
      }
    }
  }
`;

export default App;




