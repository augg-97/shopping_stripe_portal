export interface MediaDto {
  id: string;
  code: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserDto {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  profile: MediaDto | null;
  cover: MediaDto | null;
}
