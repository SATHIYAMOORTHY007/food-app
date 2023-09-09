import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
export default function Posts() {
  const [APIData, setAPIData] = useState([])
  const [filteredResults, setFilteredResults] = useState([])

  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      await axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`,
        )
        .then((response) => {
          setAPIData(response.data.meals)
        })
    } catch (err) {
      console.log(err)
    }
  }
  const search = (searchValue) => {
    try {
      setSearchInput(searchValue)
      if (searchInput !== '') {
        const filteredData = APIData.filter((item) => {
          return Object.values(item)
            .join('')
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        })

        if (
          filteredData[0].strMeal.toLowerCase() !== searchValue.toLowerCase()
        ) {
          alert('“no food found”')
        } else {
          setFilteredResults(filteredData)
        }
      } else if (searchInput == '') {
        alert('Enter value')
      } else {
        setFilteredResults(APIData)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <>
        <input
          placeholder="Search..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button onClick={() => search(searchInput)}>submit</button>

        <div
          className="d-flex justify-content-center"
          itemsPerRow={3}
          style={{ marginTop: 20 }}
        >
          {searchInput && searchInput.length > 1
            ? filteredResults.map((item) => {
                return (
                  <div className="col">
                    <div className="card">
                      <img
                        className="card-img-top"
                        src={item.strMealThumb}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.strMeal}</h5>

                        <a href={item.strYoutube} className="btn btn-primary">
                          Video
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
            : APIData &&
              APIData.map((item) => {
                return (
                  <div className="col">
                    <div className="card">
                      <img
                        className="card-img-top"
                        src={item.strMealThumb}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.strMeal}</h5>

                        <a
                          href={item.strYoutube}
                          target="_blank"
                          className="btn btn-primary"
                        >
                          Video
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
        </div>
      </>
    </div>
  )
}
