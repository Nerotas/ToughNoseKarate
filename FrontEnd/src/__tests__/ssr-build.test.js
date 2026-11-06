const mockReadFileSync = jest.fn();

jest.mock('node:fs', () => ({
  readFileSync: mockReadFileSync,
}));

const runStyleGuard = () => {
  jest.isolateModules(() => {
    require('../../scripts/check-ssr');
  });
};

describe('Production SSR style guard', () => {
  let log;

  beforeEach(() => {
    mockReadFileSync.mockReset();
    log = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    log.mockRestore();
  });

  it('accepts component CSS in the head on every public/utility route', () => {
    mockReadFileSync.mockReturnValue(
      '<html><head><style data-emotion="mui-style icon">.icon{width:1em}</style></head><body></body></html>'
    );

    expect(runStyleGuard).not.toThrow();
    expect(mockReadFileSync).toHaveBeenCalledTimes(12);
  });

  it('rejects a document containing only global Emotion styles', () => {
    mockReadFileSync.mockReturnValue(
      '<html><head><style data-emotion="mui-style-global baseline">body{margin:0}</style></head><body></body></html>'
    );

    expect(runStyleGuard).toThrow('component CSS must reach the document head before hydration');
  });

  it('rejects component CSS delivered only in the body', () => {
    mockReadFileSync.mockReturnValue(
      '<html><head></head><body><style data-emotion="mui-style icon">.icon{width:1em}</style></body></html>'
    );

    expect(runStyleGuard).toThrow('component CSS must reach the document head before hydration');
  });

  it('rejects empty component style tags', () => {
    mockReadFileSync.mockReturnValue(
      '<html><head><style data-emotion="mui-style icon"></style></head><body></body></html>'
    );

    expect(runStyleGuard).toThrow('component CSS must reach the document head before hydration');
  });
});
