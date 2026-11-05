import Loading from 'app/(DashboardLayout)/loading';
import RootLoading from 'app/loading';

describe('Dashboard loading fallback', () => {
  it('reuses the shared root skeleton fallback', () => {
    expect(Loading).toBe(RootLoading);
  });
});
