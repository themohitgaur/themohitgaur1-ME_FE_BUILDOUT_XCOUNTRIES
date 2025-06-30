import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setCountries(data))
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const filteredCountries = countries.filter(
    (country) =>
      country.common &&
      country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="appContainer">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <div className="countryGrid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.common} className="countryCard">
              <img
                src={country.png}
                alt={`${country.common} flag`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <p>{country.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
