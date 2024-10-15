import axiosApi from '../../app/axiosApi';
import { api } from '../../app/constants';

export const getWeather = async () => {
  const response = await axiosApi.get(
    `/weather?q=Bishkek&units=metric&appid=${api.key}`,
  );
  return response.data;
};

export const getAllWeather = async () => {
  const response = await axiosApi.get(
    `/forecast?q=Bishkek&units=metric&appid=${api.key}`,
  );
  return response.data;
};
