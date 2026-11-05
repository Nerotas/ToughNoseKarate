import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import BlockCreateForm from 'app/(DashboardLayout)/components/blocks/blockCreateForm';
import axiosInstance from 'utils/helpers/AxiosInstance';

jest.mock('utils/helpers/AxiosInstance');

const refetchBlocks = jest.fn();
const handleCloseCreate = jest.fn();

function renderForm() {
  return render(
    <BlockCreateForm refetchBlocks={refetchBlocks} handleCloseCreate={handleCloseCreate} />
  );
}

async function fillRequiredFields() {
  await act(async () => {
    for (const [label, value] of [
      ['Block Name', 'High Block'],
      ['Technique', 'Upward block'],
      ['Stance', 'Front stance'],
      ['Belt Rank', 'White'],
    ]) {
      fireEvent.change(screen.getByRole('textbox', { name: label }), { target: { value } });
    }
  });
}

beforeEach(() => {
  jest.clearAllMocks();
  jest.mocked(axiosInstance.post).mockResolvedValue({ data: { id: 1 } });
  refetchBlocks.mockResolvedValue(undefined);
});

it('validates all required fields before making a request', async () => {
  renderForm();
  fireEvent.submit(screen.getByRole('button', { name: 'Create Block' }).closest('form')!);

  for (const error of [
    'Block name is required',
    'Technique is required',
    'Stance is required',
    'Belt is required',
  ]) {
    expect(await screen.findByText(error)).toBeInTheDocument();
  }
  expect(axiosInstance.post).not.toHaveBeenCalled();
  expect(refetchBlocks).not.toHaveBeenCalled();
  expect(handleCloseCreate).not.toHaveBeenCalled();
});

it.each([
  ['Add Execution Step', 'Step'],
  ['Add Key Point', 'Key Point'],
  ['Add Common Mistake', 'Common Mistake'],
  ['Add Application', 'Application'],
])('adds and removes entries with %s while preserving the last entry', async (button, label) => {
  renderForm();
  const first = screen.getByRole('textbox', { name: `${label} 1` });
  const firstDelete = first.closest('.MuiBox-root')!.querySelector('button')!;
  expect(firstDelete).toBeDisabled();

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: button }));
  });
  const second = screen.getByRole('textbox', { name: `${label} 2` });
  await act(async () => {
    fireEvent.change(second, { target: { value: 'Temporary entry' } });
  });
  expect(firstDelete).toBeEnabled();
  await act(async () => {
    fireEvent.click(second.closest('.MuiBox-root')!.querySelector('button')!);
  });

  expect(screen.queryByRole('textbox', { name: `${label} 2` })).not.toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: `${label} 1` })).toHaveValue('');
  expect(firstDelete).toBeDisabled();
});

it('posts cleaned data and waits for saving and refetching before closing', async () => {
  let resolveSave!: (value: { data: { id: number } }) => void;
  let resolveRefetch!: () => void;
  jest.mocked(axiosInstance.post).mockImplementationOnce(
    () =>
      new Promise((resolve) => {
        resolveSave = resolve;
      })
  );
  refetchBlocks.mockImplementationOnce(
    () =>
      new Promise<void>((resolve) => {
        resolveRefetch = resolve;
      })
  );
  renderForm();
  await fillRequiredFields();
  await act(async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Step 1' }), {
      target: { value: 'Raise forearm' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add Execution Step' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Key Point 1' }), {
      target: { value: 'Stay balanced' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Common Mistake 1' }), {
      target: { value: '   ' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Application 1' }), {
      target: { value: 'Overhead defense' },
    });
  });
  fireEvent.click(screen.getByRole('button', { name: 'Create Block' }));

  await waitFor(() =>
    expect(axiosInstance.post).toHaveBeenCalledWith('/blocks-definitions', {
      blockName: 'High Block',
      technique: 'Upward block',
      stance: 'Front stance',
      beltRank: 'White',
      beltColor: '#FFFFFF',
      execution: ['Raise forearm'],
      keyPoints: ['Stay balanced'],
      commonMistakes: [],
      applications: ['Overhead defense'],
    })
  );
  expect(screen.getByRole('button', { name: 'Creating...' })).toBeDisabled();
  expect(refetchBlocks).not.toHaveBeenCalled();
  expect(handleCloseCreate).not.toHaveBeenCalled();

  await act(async () => resolveSave({ data: { id: 1 } }));
  expect(refetchBlocks).toHaveBeenCalledTimes(1);
  expect(handleCloseCreate).not.toHaveBeenCalled();
  await act(async () => resolveRefetch());
  expect(handleCloseCreate).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('button', { name: 'Create Block' })).toBeEnabled();
});

it('cancels without saving or refetching', () => {
  renderForm();
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(handleCloseCreate).toHaveBeenCalledTimes(1);
  expect(axiosInstance.post).not.toHaveBeenCalled();
  expect(refetchBlocks).not.toHaveBeenCalled();
});
