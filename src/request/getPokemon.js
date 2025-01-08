import { request } from "./request";

export const getPokeListService = (num) => request.get(`/?limit=${num}&offset=0`)