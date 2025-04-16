// retrieve GPS coord
function getGPSCoordinates() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(`Error getting GPS location: ${error.message || error}`);
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
  
  // formatted address from OpenCage API
  async function getFormattedAddress(latitude, longitude) {
    const apiKey = 'z1aa8180ceaef4d26be004c84ac310d51'; 
    const url = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1&no_annotations=1`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch location data');
      const data = await response.json();
      const formattedAddress = data.results[0]?.formatted || 'Address not found';
      return formattedAddress;
    } catch (error) {
      log('Error fetching address:', error);
      return 'Address not found';
    }
  }
  
  (async () => {
    try {
      // Get GPS coordinates
      const { latitude, longitude } = await getGPSCoordinates();
      log('Retrieved GPS Coordinates:', { latitude, longitude });
  
      // formatted address
      const formattedAddress = await getFormattedAddress(latitude, longitude);
      log('Formatted Address:', formattedAddress);
  
      // Display on the webpage
      document.body.innerHTML += `
        <div style="font-family: Arial, sans-serif; margin: 20px;">
          <h3>GPS Coordinates</h3>
          <p><strong>Latitude:</strong> ${latitude}</p>
          <p><strong>Longitude:</strong> ${longitude}</p>
          <h3>Formatted Address</h3>
          <p>${formattedAddress}</p>
        </div>
      `;
    } catch (error) {
      log(error);
      document.body.innerHTML += `
        <div style="font-family: Arial, sans-serif; margin: 20px; color: red;">
          <h3>Error</h3>
          <p>${error}</p>
        </div>
      `;
    }
  })();
