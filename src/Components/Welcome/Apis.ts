import { User } from "./Types";
import { mapUsersResponse } from "./Mappers";

export const fetchUsersAsync = async (token: string): Promise<Array<User>> => {
  const apiUrl = `${process.env.BACKEND_URL}/User/get`;

  let mappedData: Array<User> = []
  await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => {
      mappedData = mapUsersResponse(data);
    });
  return mappedData
}