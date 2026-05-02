import { axiosInstance } from './axios';

export interface CreateShortUrlResponse {
  shortUrl: string;
  originalUrl: string;
}

export const urlService = {
  async createShortUrl(originalUrl: string): Promise<CreateShortUrlResponse> {
    const response = await axiosInstance.post<CreateShortUrlResponse>('/urls', {
      originalUrl,
    });
    return response.data;
  },
};
