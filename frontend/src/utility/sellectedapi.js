import apiClient from './apiSetup';

export const fetchRoundtransport = async () => {
  try {
    const response = await apiClient.get('/sellected/roundtransport'); // Send the GET request to the server

    // Check the response's 'success' field to determine if the request was successful
    if (response.data.success) {
      // If successful, return the 'data' part of the response
      return response.data; // Assuming 'data' contains the users
    } else {
      // If success is false, throw an error with the server message
      throw new Error(response.data.msg);
    }
  } catch (error) {
    // Catch and rethrow the error with a message from the server or a generic one
    throw new Error(error.response?.data?.msg);
  }
};
export const fetchDepartment = async () => {
  try {
    const response = await apiClient.get('/sellected/department'); // Send the GET request to the server

    // Check the response's 'success' field to determine if the request was successful
    if (response.data.success) {
      // If successful, return the 'data' part of the response
      return response.data; // Assuming 'data' contains the users
    } else {
      // If success is false, throw an error with the server message
      throw new Error(response.data.msg);
    }
  } catch (error) {
    // Catch and rethrow the error with a message from the server or a generic one
    throw new Error(error.response?.data?.msg);
  }
};
export const fetchType = async () => {
  try {
    const response = await apiClient.get('/sellected/type'); // Send the GET request to the server

    // Check the response's 'success' field to determine if the request was successful
    if (response.data.success) {
      // If successful, return the 'data' part of the response
      return response.data; // Assuming 'data' contains the users
    } else {
      // If success is false, throw an error with the server message
      throw new Error(response.data.msg);
    }
  } catch (error) {
    // Catch and rethrow the error with a message from the server or a generic one
    throw new Error(error.response?.data?.msg);
  }
};
export const fetchCurentweight = async (Round_ID) => {
  try {
    const response = await apiClient.get(`/sellected/curentweight/${Round_ID}`); // Send the GET request to the server

    // Check the response's 'success' field to determine if the request was successful
    if (response.data.success) {
      // If successful, return the 'data' part of the response
      return response.data; // Assuming 'data' contains the users
    } else {
      // If success is false, throw an error with the server message
      throw new Error(response.data.msg);
    }
  } catch (error) {
    // Catch and rethrow the error with a message from the server or a generic one
    throw new Error(error.response?.data?.msg);
  }
};
export const fetchMaxid = async () => {
  try {
    const response = await apiClient.get(`/sellected/maxid`); // Send the GET request to the server

    // Check the response's 'success' field to determine if the request was successful
    if (response.data.success) {
      // If successful, return the 'data' part of the response
      return response.data; // Assuming 'data' contains the users
    } else {
      // If success is false, throw an error with the server message
      throw new Error(response.data.msg);
    }
  } catch (error) {
    // Catch and rethrow the error with a message from the server or a generic one
    throw new Error(error.response?.data?.msg);
  }
};