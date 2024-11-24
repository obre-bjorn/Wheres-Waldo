
// const API_BASE_URL = "https://wheres-waldo-backend-8pec.onrender.com";


export const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const { body, ...restOptions } = options;

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...restOptions.headers, // Merge additional headers if provided
      },
      body: body ? JSON.stringify(body) : undefined, // Ensure body is stringified
      ...restOptions, // Include other fetch options like method
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error.message);
    throw error;
  }
};