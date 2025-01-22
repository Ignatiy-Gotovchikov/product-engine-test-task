export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface GetUserResponse {
  data: UserData;
}


export interface UpdateUserRequest {
  id: number;
  email: string;
}

export interface UpdateUserResponse {
  email: string;
  updatedAt: string;
}

