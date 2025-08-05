import { BeltProgression, BeltHistory } from '../models/BeltProgression/BeltProgression';
import axiosInstance from '../utils/helpers/AxiosInstance';

export interface CreateBeltProgressionDto {
  studentid: number;
  belt_rank: string;
  promoted_date: string;
  promoted_by?: string;
  testid?: number;
  is_current?: number;
  ceremony_date?: string;
  belt_certificate_number?: string;
  notes?: string;
}

export interface UpdateBeltProgressionDto {
  belt_rank?: string;
  promoted_date?: string;
  promoted_by?: string;
  testid?: number;
  is_current?: number;
  ceremony_date?: string;
  belt_certificate_number?: string;
  notes?: string;
}

class BeltProgressionService {
  private baseUrl = '/belt-progression';

  async getAllProgressions(): Promise<BeltProgression[]> {
    const response = await axiosInstance.get(this.baseUrl);
    return response.data;
  }

  async getProgressionsByStudent(studentId: number): Promise<BeltProgression[]> {
    const response = await axiosInstance.get(`${this.baseUrl}/student/${studentId}`);
    return response.data;
  }

  async getCurrentBelt(studentId: number): Promise<BeltProgression | null> {
    try {
      const response = await axiosInstance.get(`${this.baseUrl}/student/${studentId}/current`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch current belt');
    }
  }

  async getBeltHistory(studentId: number): Promise<BeltHistory> {
    const response = await axiosInstance.get(`${this.baseUrl}/student/${studentId}/history`);
    return response.data;
  }

  async getProgression(id: number): Promise<BeltProgression> {
    const response = await axiosInstance.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createProgression(data: CreateBeltProgressionDto): Promise<BeltProgression> {
    const response = await axiosInstance.post(this.baseUrl, data);
    return response.data;
  }

  async updateProgression(id: number, data: UpdateBeltProgressionDto): Promise<any> {
    const response = await axiosInstance.patch(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async deleteProgression(id: number): Promise<void> {
    await axiosInstance.delete(`${this.baseUrl}/${id}`);
  }
}

export const beltProgressionService = new BeltProgressionService();
