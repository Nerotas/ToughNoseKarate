'use client';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  LinearProgress,
  Button,
  IconButton,
} from '@mui/material';
import { IconUser, IconAward, IconEdit, IconEye, IconPlus } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';

const students = [
  {
    id: 1,
    name: 'Sarah Johnson',
    currentBelt: 'Green Belt',
    beltColor: '#008000',
    nextBelt: 'Blue Belt',
    progress: 75,
    classesAttended: 28,
    classesRequired: 35,
    age: 12,
    parentName: 'Mike Johnson',
    phone: '(555) 123-4567',
    email: 'mike.johnson@email.com',
    joinDate: '2024-01-15',
    lastTest: '2024-09-15',
    nextTestEligible: '2024-12-15',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    currentBelt: 'Yellow Belt',
    beltColor: '#FFD700',
    nextBelt: 'Orange Belt',
    progress: 60,
    classesAttended: 15,
    classesRequired: 25,
    age: 8,
    parentName: 'Lisa Chen',
    phone: '(555) 987-6543',
    email: 'lisa.chen@email.com',
    joinDate: '2024-03-20',
    lastTest: '2024-10-20',
    nextTestEligible: '2025-01-20',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    currentBelt: 'Brown Belt',
    beltColor: '#8B4513',
    nextBelt: 'Black Belt',
    progress: 85,
    classesAttended: 42,
    classesRequired: 50,
    age: 16,
    parentName: 'Carlos Rodriguez',
    phone: '(555) 456-7890',
    email: 'carlos.rodriguez@email.com',
    joinDate: '2023-05-10',
    lastTest: '2024-08-10',
    nextTestEligible: '2025-02-10',
  },
  {
    id: 4,
    name: 'Tyler Anderson',
    currentBelt: 'White Belt',
    beltColor: '#FFFFFF',
    nextBelt: 'Yellow Belt',
    progress: 40,
    classesAttended: 8,
    classesRequired: 20,
    age: 10,
    parentName: 'Jennifer Anderson',
    phone: '(555) 321-0987',
    email: 'jennifer.anderson@email.com',
    joinDate: '2024-10-01',
    lastTest: null,
    nextTestEligible: '2025-01-01',
  },
  {
    id: 5,
    name: 'Aisha Patel',
    currentBelt: 'Blue Belt',
    beltColor: '#0000FF',
    nextBelt: 'Brown Belt',
    progress: 55,
    classesAttended: 22,
    classesRequired: 40,
    age: 14,
    parentName: 'Raj Patel',
    phone: '(555) 654-3210',
    email: 'raj.patel@email.com',
    joinDate: '2023-08-15',
    lastTest: '2024-07-15',
    nextTestEligible: '2025-01-15',
  },
];

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

const Students = () => {
  return (
    <PageContainer title='Students' description='Student Management and Progress Tracking'>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant='h2'>Student Management</Typography>
          <Button variant='contained' startIcon={<IconPlus />} sx={{ height: 'fit-content' }}>
            Add New Student
          </Button>
        </Box>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Track student progress, belt advancement, and attendance records.
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconUser size={24} />
                  <Typography variant='h6' sx={{ ml: 1 }}>
                    Total Students
                  </Typography>
                </Box>
                <Typography variant='h3' color='primary'>
                  {students.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconAward size={24} />
                  <Typography variant='h6' sx={{ ml: 1 }}>
                    Ready for Testing
                  </Typography>
                </Box>
                <Typography variant='h3' color='success.main'>
                  {students.filter((student) => student.progress >= 80).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconUser size={24} />
                  <Typography variant='h6' sx={{ ml: 1 }}>
                    Active This Month
                  </Typography>
                </Box>
                <Typography variant='h3' color='info.main'>
                  {students.filter((student) => student.classesAttended > 0).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <IconAward size={24} />
                  <Typography variant='h6' sx={{ ml: 1 }}>
                    Black Belts
                  </Typography>
                </Box>
                <Typography variant='h3' color='warning.main'>
                  0
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Student Table */}
        <DashboardCard title='Student Roster'>
          <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Current Belt</TableCell>
                  <TableCell>Progress to Next Belt</TableCell>
                  <TableCell>Classes</TableCell>
                  <TableCell>Next Test Eligible</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {student.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </Avatar>
                        <Box>
                          <Typography variant='subtitle2' fontWeight='bold'>
                            {student.name}
                          </Typography>
                          <Typography variant='caption' color='text.secondary'>
                            Age: {student.age} | Parent: {student.parentName}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={student.currentBelt}
                        sx={{
                          backgroundColor: student.beltColor,
                          color: getBeltTextColor(student.beltColor),
                          fontWeight: 'bold',
                          border: student.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ minWidth: 120 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                          }}
                        >
                          <Typography variant='caption'>{student.progress}%</Typography>
                          <Typography variant='caption' color='text.secondary'>
                            {student.nextBelt}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant='determinate'
                          value={student.progress}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2'>
                        {student.classesAttended} / {student.classesRequired}
                      </Typography>
                      <Typography variant='caption' color='text.secondary'>
                        classes completed
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant='body2'>
                        {new Date(student.nextTestEligible).toLocaleDateString()}
                      </Typography>
                      <Chip
                        label={
                          new Date(student.nextTestEligible) <= new Date()
                            ? 'Eligible Now'
                            : 'Not Ready'
                        }
                        size='small'
                        color={
                          new Date(student.nextTestEligible) <= new Date() ? 'success' : 'default'
                        }
                        sx={{ mt: 0.5 }}
                      />
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size='small' color='primary'>
                          <IconEye size={16} />
                        </IconButton>
                        <IconButton size='small' color='secondary'>
                          <IconEdit size={16} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>
      </Box>
    </PageContainer>
  );
};

export default Students;
