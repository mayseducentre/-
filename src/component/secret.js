import React, { useEffect } from 'react';

const SecretIpPush = () => {
  useEffect(() => {
    // Fetch the user's IP address silently
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        saveIpToJsonServer(data.ip);  // Push the IP to the JSON server silently
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  const ipdb= process.env.REACT_APP_IP_DB;  

  const saveIpToJsonServer = async (ip) => {
    try {
      await fetch(`${ipdb}`, {  // Your JSON server endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ip }),
      });
    } catch (error) {
      console.error('Error saving IP address to JSON server:', error);
    }
  };

  return null;  // No UI is rendered to the user
};

export default SecretIpPush;