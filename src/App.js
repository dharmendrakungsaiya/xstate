import {useState, useEffect} from "react";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("https://crio-location-selector.onrender.com/countries");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.log("No countries found", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchStates = async () => {
        try {
          const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
          const data = await res.json();
          setStates(data);
        } catch (error) {
          console.log("No states found", error);
        }
      };
      fetchStates();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchCities = async () => {
        try {
          const res = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
          const data = await res.json();
          setCities(data);
        } catch (error) {
          console.log("No cities found", error);
        }
      };
      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    setMessage("");
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setMessage("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setMessage(`${e.target.value}, ${selectedState}, ${selectedCountry}`);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>
      <select style={{ margin: "5px" }} value={selectedCountry} onChange={handleCountryChange}>
        <option>Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select style={{ margin: "5px" }} value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        <option>Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <select style={{ margin: "5px" }} value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
        <option>Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      {message && (
        <p>
          <span style={{ fontWeight: "bold"}}>You selected</span>{" "}
          <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>{selectedCountry},</span>
          <span style={{color: "grey"}}>{` ${selectedState}, ${selectedCity}`}</span>
        </p>
      )}

    </div>
  );
}

export default App;
