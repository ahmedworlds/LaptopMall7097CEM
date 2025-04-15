import React, { useState, useEffect } from 'react';

const Dashboard = ({ user }) => {
  const [address, setAddress] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });

          try {
            const apiKey = '1aa8180ceaef4d26be004c84ac310d51';
            const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`;
            const response = await fetch(url);
            const data = await response.json();
            setAddress(data.results[0]?.formatted || 'Address not found');
          } catch (error) {
            setAddress('Address not found');
          }
        },
        () => {
        }
      );
    }
  }, []);

  if (!user) {
    return (
      <main className="container my-5">
        <h1 className="text-center mb-4">Dashboard</h1>
        <section className="card p-4">
          <p>Please log in to view your profile information.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      <section className="card p-4">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        
        <div className="mt-4 d-flex align-items-start">
          <div className="flex-grow-1">
            <h3>Your Location</h3>
            {coordinates ? (
              <>
                <p><strong>Latitude:</strong> {coordinates.latitude}</p>
                <p><strong>Longitude:</strong> {coordinates.longitude}</p>
                <p><strong>Address:</strong> {address || 'Fetching address...'}</p>
              </>
            ) : (
              <p>Retrieving location...</p>
            )}
          </div>
          <img
            src="/images/location.gif"
            alt="Location"
            className="ms-4"
            style={{ width: '150px', height: '150px' }}
          />
        </div>

        {coordinates && (
          <div className="mt-4">
            <iframe
              title="Dashboard Analytics"
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d${coordinates.longitude}!3d${coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2s!4v1633003487324!5m2!1sen!2s`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;