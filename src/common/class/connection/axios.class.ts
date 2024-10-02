import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AxiosClass {
  constructor(private readonly httpService: HttpService) {}

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await firstValueFrom(this.httpService.get<T>(url, config));
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.post<T>(url, data, config),
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.put<T>(url, data, config),
    );
    return response.data;
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.patch<T>(url, data, config),
    );
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.delete<T>(url, config),
    );
    return response.data;
  }

  public async head<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.head<T>(url, config),
    );
    return response.data;
  }
}
