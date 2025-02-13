import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CountryDetails = ({ countries }) => {
  const [country, setCountry] = useState(null);
  const { countryId } = useParams();

  useEffect(() => {
    const selectedCountry = countries.find((country) => {
      return country.alpha3Code === countryId;
    });
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  }, [countryId, countries]);

  const getName = (code) => {
    const foundCountry = countries.find((country) => {
      return country.alpha3Code === code;
    });
    return foundCountry ? foundCountry.name.official : '';
  };
  return (
    <>
      {country && (
        <div className="col-7">
          <h1>{country.name.official}</h1>
          <table className="table">
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: ' 30%' }}>Capital</td>
                <td>{country.capital[0]}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {country.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  {!country.borders.length && <p>No borders.</p>}
                  <ul>
                    {country.borders.map((border) => {
                      return (
                        <li key={border}>
                          <Link to={`/countries/${border}`}>
                            {getName(border)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CountryDetails;
