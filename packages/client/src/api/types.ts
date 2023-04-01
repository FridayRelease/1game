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

export { type ErrorResponse, type StatusResponse, type SignUpResponseDTO, type IUserDTO };
