import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/resume`,
  withCredentials: true,
});

export const generateinterview = async ({ resume, jobDescription }) => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("jobDescription", jobDescription);

  const response = await api.post(
    "/uploadresume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};