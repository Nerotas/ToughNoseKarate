import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CustomTextField from '../../../../../../app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CustomTextField Component', () => {
  it('renders the custom text field', () => {
    renderWithTheme(<CustomTextField label='Test Field' value='' onChange={() => {}} />);

    const textField = screen.getByLabelText('Test Field');
    expect(textField).toBeInTheDocument();
  });

  it('passes props to the underlying TextField', () => {
    renderWithTheme(
      <CustomTextField
        label='Test Field'
        value='Test Value'
        onChange={() => {}}
        placeholder='Enter text'
        disabled
      />
    );

    const textField = screen.getByLabelText('Test Field');
    expect(textField).toHaveValue('Test Value');
    expect(textField).toBeDisabled();
    expect(textField).toHaveAttribute('placeholder', 'Enter text');
  });

  it('renders with custom variant', () => {
    renderWithTheme(
      <CustomTextField label='Outlined Field' variant='outlined' value='' onChange={() => {}} />
    );

    const textField = screen.getByLabelText('Outlined Field');
    expect(textField).toBeInTheDocument();
  });

  it('handles multiline text field', () => {
    renderWithTheme(
      <CustomTextField label='Multiline Field' multiline rows={4} value='' onChange={() => {}} />
    );

    const textField = screen.getByLabelText('Multiline Field');
    expect(textField).toBeInTheDocument();
    expect(textField.tagName).toBe('TEXTAREA');
  });

  it('applies custom styling', () => {
    const { container } = renderWithTheme(
      <CustomTextField label='Styled Field' value='' onChange={() => {}} />
    );

    // Check that the styled component is applied (should have MUI classes)
    const textFieldContainer = container.querySelector('.MuiTextField-root');
    expect(textFieldContainer).toBeInTheDocument();
  });

  it('handles focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    renderWithTheme(
      <CustomTextField
        label='Focus Field'
        value=''
        onChange={() => {}}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const textField = screen.getByLabelText('Focus Field');

    textField.focus();
    expect(handleFocus).toHaveBeenCalledTimes(1);

    textField.blur();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('renders with error state', () => {
    renderWithTheme(
      <CustomTextField
        label='Error Field'
        value=''
        onChange={() => {}}
        error
        helperText='This field has an error'
      />
    );

    const textField = screen.getByLabelText('Error Field');
    expect(textField).toBeInTheDocument();

    const errorText = screen.getByText('This field has an error');
    expect(errorText).toBeInTheDocument();
  });
});
