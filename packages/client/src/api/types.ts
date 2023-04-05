type StatusResponse = 'OK';

type ErrorResponse = {
  reason: string;
  error: string;
};

type SignUpResponseDTO = {
  id: number;
};

type IUserDTO = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  email: string;
  phone: string;
  avatar: string | null;
};

enum Status {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  UNEXPECTED_ERROR = 500,
}

type LeaderboardListDTO = {
  id: number;
  name: string;
  score: number;
}[];

export {
  type ErrorResponse,
  type StatusResponse,
  type SignUpResponseDTO,
  type IUserDTO,
  Status,
  type LeaderboardListDTO,
};
