import { User } from "./Types"

export const mapUsersResponse = (res: Array<any>): Array<User> => {
  let mappedResponse: Array<User> = []
  if (!res) {
    return mappedResponse
  }
  res.map(item => {
    let orderSourceItem: User = {
      name: item.Name,
      email: item.Email
    }
    mappedResponse.push(orderSourceItem)
  })
  return mappedResponse
}