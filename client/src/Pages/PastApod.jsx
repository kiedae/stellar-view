import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './SearchNasa.css';

export default function PastApod() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [apodData, setApodData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make API call to NASA APOD API
    const apiKey = 'C9mVvyOk2bsKleMhZo6sVh5zsfZuhGisrKufTdxA';
    const startDate = formatDate(dateRange[0]);
    const endDate = formatDate(dateRange[1]);
    const apiUrl = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setApodData(data);
      console.log('Received Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCalendarChange = (dates) => {
    setDateRange(dates);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h1>Past Astronomy Picture of the Day (APOD)</h1>
      
      {/* Calendar form */}
      <form onSubmit={handleSubmit}>
        <label>
          Date Range:
          <Calendar
            onChange={handleCalendarChange}
            selectRange
            value={dateRange}
            className="custom-calendar"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* APOD result display */}
      {apodData ? (
        <div className='card-container'>
          {apodData.map((dayData) => (
            <div className='card' key={dayData.date}>
              {dayData.media_type === 'image' ? (
                <img src={dayData.url} alt={dayData.title} />
              ) : dayData.media_type === 'video' ? (
                <iframe
                  title={dayData.title}
                  src={dayData.url}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Unsupported media type</p>
              )}
              <h2>{dayData.title}</h2>
              <p>{dayData.date}</p>
              <p>{dayData.explanation}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No data available. Please submit the form.</p>
      )}
    </div>
  );
}

