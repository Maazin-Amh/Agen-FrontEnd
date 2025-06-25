import axios, { AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3800",
  headers: { "Content-Type": "application/json" },
});

export const axiosClientRefresh: AxiosInstance = axios.create({
  baseURL: "http://localhost:3800",
  headers: { "Content-Type": "application/json" },
});

console.log("lol", axiosClient)
export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total_page: number;
  };
}

export interface BaseResponseSuccess {
  status: string;
  message: string;
  data?: any;
}

export const testConnection = async () => {
  try {
    const res = await axiosClient.get("/ping");
    console.log("✅ Backend connected:", res.data);
  } catch (err) {
    console.error("❌ Gagal connect ke backend:", err);
  }
};
