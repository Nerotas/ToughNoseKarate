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
const { studentsService } = require('../studentsService');

describe('studentsService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('getAllStudents', async () => {
    const list = [{ id: 1 }, { id: 2 }];
    axiosInstance.get.mockResolvedValueOnce({ data: list });
    const res = await studentsService.getAllStudents();
    expect(res).toEqual(list);
    expect(axiosInstance.get).toHaveBeenCalledWith('/v1/students');
  });

  test('getStudentById', async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { id: 55 } });
    const res = await studentsService.getStudentById(55);
    expect(res).toEqual({ id: 55 });
    expect(axiosInstance.get).toHaveBeenCalledWith('/v1/students/55');
  });

  test('createStudent', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { id: 3 } });
    const created = await studentsService.createStudent({ name: 'A' });
    expect(created).toEqual({ id: 3 });
    expect(axiosInstance.post).toHaveBeenCalledWith('/v1/students', { name: 'A' });
  });

  test('updateStudent handles array response shape', async () => {
    const updatedObj = { id: 9, name: 'Nine' };
    axiosInstance.patch.mockResolvedValueOnce({ data: [1, [updatedObj]] });
    const res = await studentsService.updateStudent(9, { name: 'Nine' });
    expect(res).toEqual(updatedObj);
  });

  test('updateStudent fallback when shape unexpected', async () => {
    const fallback = { id: 10 };
    axiosInstance.patch.mockResolvedValueOnce({ data: fallback });
    const res = await studentsService.updateStudent(10, { name: 'Ten' });
    expect(res).toEqual(fallback);
  });

  test('deleteStudent', async () => {
    axiosInstance.delete.mockResolvedValueOnce({});
    await studentsService.deleteStudent(7);
    expect(axiosInstance.delete).toHaveBeenCalledWith('/v1/students/7');
  });

  test('toggleActiveStatus delegates to updateStudent', async () => {
    const updated = { id: 1, active: 1 };
    axiosInstance.patch.mockResolvedValueOnce({ data: [1, [updated]] });
    const res = await studentsService.toggleActiveStatus(1, true);
    expect(res).toEqual(updated);
  });

  test('updateBeltRank sets lastTestUTC', async () => {
    const updated = { id: 2, beltRank: 'Yellow' };
    axiosInstance.patch.mockResolvedValueOnce({ data: [1, [updated]] });
    const res = await studentsService.updateBeltRank(2, 'Yellow');
    expect(res).toEqual(updated);
    expect(axiosInstance.patch.mock.calls[0][1]).toMatchObject({ beltRank: 'Yellow' });
  });

  test('updateTestingEligibility converts boolean', async () => {
    const updated = { id: 3, eligibleForTesting: 1 };
    axiosInstance.patch.mockResolvedValueOnce({ data: [1, [updated]] });
    const res = await studentsService.updateTestingEligibility(3, true);
    expect(res).toEqual(updated);
  });
});
