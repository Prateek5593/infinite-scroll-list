import { useInfiniteQuery } from "react-query";
import { User, UserPage } from "../model";
import fetchData from "./requestHelper";

type UserResponse = {
  total: number;
  limit: number;
  data: User[];
}

export function useFetchUser() {
  const fn = async function getData({ pageParam = 0 }) {
    const response = await fetchData<UserResponse>(`${process.env.REACT_APP_API_BASE_URL}user?page=${pageParam}&limit=20`);
    const maxPage = Math.ceil(response.total/response.limit)
    const data: UserPage = {
      results: response.data,
      next: pageParam < maxPage ? pageParam + 1 : undefined,
    };
    return data;
  }

  return useInfiniteQuery<UserPage, Error>("users", fn, {
    getNextPageParam: (lastPage) => lastPage.next,
  });
}
