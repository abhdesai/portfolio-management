import axios, { AxiosRequestConfig } from 'axios';
import { clientTechDebug, clientTechError } from './debug';

const getApiBaseUrl = () => {
  // In development, use relative URLs to work with HTTPS proxy
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  // In production, use the configured API URL
  return process.env.REACT_APP_API_URL || '';
};

const apiCall = async (
  path: string,
  options?: AxiosRequestConfig
) => {
  const baseUrl = getApiBaseUrl();
  const url = baseUrl + path;
  
  clientTechDebug('API Call:', {
    path,
    baseUrl,
    fullUrl: url,
    options,
    nodeEnv: process.env.NODE_ENV
  });
  
  try {
    const response = await axios({ url, ...options });
    clientTechDebug('API Response:', response.data);
    return { data: response.data };
  } catch (error: any) {
    clientTechError('API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    return { error: error.response ? error.response.data : { message: error.message } };
  }
};

export default apiCall; 