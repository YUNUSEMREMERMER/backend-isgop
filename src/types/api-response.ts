export type ApiErrorDetail = {
  field?: string;
  message: string;
};

export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiErrorDetail[];
};
