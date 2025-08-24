import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNotesResponse {
  data: Note[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export async function fetchNotes(
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;

  const response: AxiosResponse<FetchNotesResponse> = await api.get(
    "/notes",
    { params }
  );
  return response.data;
}

export async function createNote(note: Omit<Note, "id">): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post("/notes", note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}