export interface StudentTest {
  testid: number;
  studentid: number;
  test_date: string;
  belt_from: string;
  belt_to: string;
  overall_score?: number;
  passed: number;
  instructor_name?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  test_results?: TestResult[];
}

export interface TestResult {
  result_id: number;
  testid: number;
  category:
    | 'blocks'
    | 'kicks'
    | 'punches'
    | 'forms'
    | 'stances'
    | 'combinations'
    | 'falling'
    | 'one_steps';
  technique_name: string;
  score?: number;
  passed: number;
  notes?: string;
  created_at?: string;
}

export interface TestHistory {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  averageScore: number;
  lastTestDate?: string;
  lastTestScore?: number;
  tests: StudentTest[];
}
