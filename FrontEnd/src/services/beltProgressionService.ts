import { BeltProgression, BeltHistory } from '../models/BeltProgression/BeltProgression';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

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
  private baseUrl = `${API_BASE_URL}/belt-progression`;

  async getAllProgressions(): Promise<BeltProgression[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch belt progressions');
    }
    return response.json();
  }

  async getProgressionsByStudent(studentId: number): Promise<BeltProgression[]> {
    const response = await fetch(`${this.baseUrl}/student/${studentId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch student belt progressions');
    }
    return response.json();
  }

  async getCurrentBelt(studentId: number): Promise<BeltProgression | null> {
    const response = await fetch(`${this.baseUrl}/student/${studentId}/current`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch current belt');
    }
    return response.json();
  }

  async getBeltHistory(studentId: number): Promise<BeltHistory> {
    const response = await fetch(`${this.baseUrl}/student/${studentId}/history`);
    if (!response.ok) {
      throw new Error('Failed to fetch belt history');
    }
    return response.json();
  }

  async getProgression(id: number): Promise<BeltProgression> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch belt progression');
    }
    return response.json();
  }

  async createProgression(data: CreateBeltProgressionDto): Promise<BeltProgression> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create belt progression');
    }
    return response.json();
  }

  async updateProgression(id: number, data: UpdateBeltProgressionDto): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update belt progression');
    }
    return response.json();
  }

  async deleteProgression(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete belt progression');
    }
  }
}

export const beltProgressionService = new BeltProgressionService();
