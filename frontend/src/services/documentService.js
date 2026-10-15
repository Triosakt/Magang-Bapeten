import { apiGet } from "./api";
import { mockDocuments } from "../data/mockData";

export async function getDocuments() {
  try {
    const result = await apiGet("/documents");

    // Mendukung respons berupa array atau objek { data: [...] }.
    const documents = Array.isArray(result) ? result : result?.data;

    if (Array.isArray(documents)) {
      return documents;
    }

    return mockDocuments;
  } catch (error) {
    console.warn("Katalog menggunakan data contoh:", error.message);
    return mockDocuments;
  }
}