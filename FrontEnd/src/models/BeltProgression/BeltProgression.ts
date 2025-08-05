export interface BeltProgression {
  progression_id: number;
  studentid: number;
  belt_rank: string;
  promoted_date: string;
  promoted_by?: string;
  testid?: number;
  is_current: number;
  ceremony_date?: string;
  belt_certificate_number?: string;
  notes?: string;
  created_at?: string;
  test?: any; // Reference to student test if linked
}

export interface BeltHistory {
  currentBelt?: BeltProgression;
  progression: BeltProgression[];
  totalPromotions: number;
  timeAsCurrentBelt?: number;
}
