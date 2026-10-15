import { apiGet } from "./api";

export async function getStatistics() {
  try {
    const result = await apiGet("/statistics");
    return result?.data ?? result;
  } catch (error) {
    console.warn("Statistik API belum tersedia:", error.message);
    return null;
  }
}