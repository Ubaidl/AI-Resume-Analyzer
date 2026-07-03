import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/resume",
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