import { ApiResponse } from "../../redux/stateTypes";
import { User } from "../Welcome/Types";

export const createUserAsync = async (user: User, token: string): Promise<ApiResponse> => {
  const apiUrl = `${process.env.BACKEND_URL}/User/create`;

  const userDTO = {
    Username: user.name,
    UserEmail: user.email
  }

  const res = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userDTO)
  });

  const data = await res.json();

  // message, code and body should come from 'data'
  const response: ApiResponse = {
    message: "User created!",
    code: 200,
    body: ""
  };

  return response;
}