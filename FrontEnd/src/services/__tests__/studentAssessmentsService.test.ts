import '@testing-library/jest-dom';

jest.mock('utils/helpers/AxiosInstance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const axiosInstance = require('utils/helpers/AxiosInstance').default;
const { studentAssessmentsService } = require('../studentAssessmentsService');

describe('studentAssessmentsService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getAssessmentsByStudent', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const res = await studentAssessmentsService.getAssessmentsByStudent(5);
    expect(res).toEqual([{ id: 1 }]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/student-assessments/student/5');
  });

  test('getAssessmentSummary', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { total: 3 } });
    const res = await studentAssessmentsService.getAssessmentSummary(5);
    expect(res).toEqual({ total: 3 });
  });

  test('getCurrentAssessment success', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { id: 10 } });
    const res = await studentAssessmentsService.getCurrentAssessment(9);
    expect(res).toEqual({ id: 10 });
  });

  test('getCurrentAssessment 404 returns null', async () => {
    const err = { response: { status: 404 } };
    axiosInstance.get.mockRejectedValueOnce(err);
    const res = await studentAssessmentsService.getCurrentAssessment(9);
    expect(res).toBeNull();
  });

  test('getCurrentAssessment rethrows non-404', async () => {
    const err = { response: { status: 500 } };
    axiosInstance.get.mockRejectedValueOnce(err);
    await expect(studentAssessmentsService.getCurrentAssessment(9)).rejects.toEqual(err);
  });

  test('getAssessment', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { id: 77 } });
    const res = await studentAssessmentsService.getAssessment(77);
    expect(res).toEqual({ id: 77 });
  });

  test('createAssessment', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { id: 12 } });
    const res = await studentAssessmentsService.createAssessment({ student_id: 1 } as any);
    expect(res).toEqual({ id: 12 });
  });

  test('updateAssessment', async () => {
    axiosInstance.patch.mockResolvedValueOnce({ data: { id: 13 } });
    const res = await studentAssessmentsService.updateAssessment(13, { notes: 'n' } as any);
    expect(res).toEqual({ id: 13 });
  });

  test('completeAssessment', async () => {
    axiosInstance.patch.mockResolvedValueOnce({ data: { id: 14, passed: true } });
    const res = await studentAssessmentsService.completeAssessment(14, { passed: true });
    expect(res).toEqual({ id: 14, passed: true });
  });

  test('cancelAssessment', async () => {
    axiosInstance.patch.mockResolvedValueOnce({ data: { id: 15, cancelled: true } });
    const res = await studentAssessmentsService.cancelAssessment(15, 'reason');
    expect(res).toEqual({ id: 15, cancelled: true });
  });

  test('deleteAssessment', async () => {
    axiosInstance.delete.mockResolvedValueOnce({});
    await studentAssessmentsService.deleteAssessment(16);
    expect(axiosInstance.delete).toHaveBeenCalledWith('/student-assessments/16');
  });

  test('getAssessmentsByStatus', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: [{ id: 1 }] });
    const res = await studentAssessmentsService.getAssessmentsByStatus('completed');
    expect(res).toEqual([{ id: 1 }]);
  });

  test('getAssessmentsByBeltRank', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: [{ id: 2 }] });
    const res = await studentAssessmentsService.getAssessmentsByBeltRank('Green');
    expect(res).toEqual([{ id: 2 }]);
  });
});
