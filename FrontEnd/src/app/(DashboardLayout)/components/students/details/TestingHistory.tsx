import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material';
import { IconClipboardData } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { getBeltColor, getBeltTextColor } from 'helpers/BeltColors';
import { BeltRequirements } from 'models/BeltRequirements/BeltRequirements';
import { TestHistory } from 'models/StudentTests/StudentTests';

interface TestingHistoryProps {
  testHistory: TestHistory;
  testHistoryLoading: boolean;
  beltRequirements: BeltRequirements[];
  testHistoryError: AxiosError<unknown, any> | null;
}

const TestingHistory: React.FC<TestingHistoryProps> = ({
  testHistory,
  testHistoryLoading,
  beltRequirements,
  testHistoryError,
}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Card>
        <CardContent>
          <Typography variant='h6' sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <IconClipboardData size={20} />
            <Box sx={{ ml: 1 }}>Test History</Box>
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {testHistoryLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress />
            </Box>
          ) : testHistoryError ? (
            <Alert severity='error'>Failed to load test history</Alert>
          ) : testHistory && testHistory.tests.length > 0 ? (
            <Box>
              {/* Test Summary */}
              <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 1 }}>
                  Test Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant='h4' color='primary'>
                      {testHistory.totalTests}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Total Tests
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant='h4' color='success.main'>
                      {testHistory.passedTests}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Passed Tests
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant='h4' color='error.main'>
                      {testHistory.failedTests}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Failed Tests
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 6, sm: 3 }}>
                    <Typography variant='h4' color='info.main'>
                      {testHistory.averageScore?.toFixed(1)}%
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Average Score
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              {/* Test Details */}
              <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mb: 2 }}>
                Test History Details
              </Typography>
              <TableContainer component={Paper} variant='outlined'>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Test Date</TableCell>
                      <TableCell>Belt From</TableCell>
                      <TableCell>Belt To</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Result</TableCell>
                      <TableCell>Instructor</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {testHistory.tests.map((test) => (
                      <TableRow key={test.testid}>
                        <TableCell>{new Date(test.test_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={test.belt_from}
                            size='small'
                            sx={{
                              backgroundColor: getBeltColor(test.belt_from, beltRequirements || []),
                              color: getBeltTextColor(test.belt_from, beltRequirements || []),
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={test.belt_to}
                            size='small'
                            sx={{
                              backgroundColor: getBeltColor(test.belt_to, beltRequirements || []),
                              color: getBeltTextColor(test.belt_to, beltRequirements || []),
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='body2'
                            color={
                              test.overall_score && test.overall_score >= 70
                                ? 'success.main'
                                : 'error.main'
                            }
                          >
                            {test.overall_score?.toFixed(1)}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={test.passed ? 'Passed' : 'Failed'}
                            color={test.passed ? 'success' : 'error'}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>{test.instructor_name || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Alert severity='info'>No test history found for this student.</Alert>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
export default TestingHistory;
