'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SecurityIcon from '@mui/icons-material/Security';
import FitnessCenter from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WarningIcon from '@mui/icons-material/Warning';
import { selfDefense } from '../../../constants/data/selfDefense';
import { SelfDefenseDefinition } from '../../../models/SelfDefense/SelfDefense';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';

const SelfDefenseClient: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBelt, setSelectedBelt] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const {
    data: selfDefenseDefinitions,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGet<SelfDefenseDefinition[]>({
    apiLabel: 'self-defense-definitions',
    url: '/self-defense-definitions',
    fallbackData: [],
    options: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  // Use API data if available, otherwise use static data
  const displaySelfDefense =
    selfDefenseDefinitions && selfDefenseDefinitions.length > 0
      ? selfDefenseDefinitions
      : selfDefense;

  // Get unique values for filters
  const categories = [
    'All',
    ...Array.from(new Set(displaySelfDefense.map((technique) => technique.category))),
  ];
  const belts = [
    'All',
    ...Array.from(new Set(displaySelfDefense.map((technique) => technique.belt))),
  ];
  const difficulties = [
    'All',
    ...Array.from(new Set(displaySelfDefense.map((technique) => technique.difficulty))),
  ];

  // Filter techniques based on selected criteria
  const filteredTechniques = displaySelfDefense.filter((technique) => {
    const matchesCategory = selectedCategory === 'All' || technique.category === selectedCategory;
    const matchesBelt = selectedBelt === 'All' || technique.belt === selectedBelt;
    const matchesDifficulty =
      selectedDifficulty === 'All' || technique.difficulty === selectedDifficulty;
    const matchesSearch =
      searchTerm === '' ||
      technique.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      technique.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (technique.korean && technique.korean.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesBelt && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Releases':
      case 'Escapes':
        return <SecurityIcon />;
      case 'Submissions':
      case 'Ground Control':
        return <FitnessCenter />;
      case 'Standing':
        return <PsychologyIcon />;
      default:
        return <SecurityIcon />;
    }
  };

  const renderTechniqueCard = (technique: SelfDefenseDefinition) => (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={technique.id}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box display='flex' alignItems='center' gap={1} mb={2}>
            {getCategoryIcon(technique.category)}
            <Typography variant='h6' component='h3'>
              {technique.name}
            </Typography>
          </Box>

          {technique.korean && (
            <Typography variant='body2' color='text.secondary' mb={1}>
              {technique.korean}
            </Typography>
          )}

          <Typography variant='body2' paragraph>
            {technique.description}
          </Typography>

          <Box display='flex' gap={1} mb={2} flexWrap='wrap'>
            <Chip
              label={technique.belt}
              sx={{
                backgroundColor: technique.beltColor,
                color:
                  technique.beltColor === '#FFFFFF' ||
                  technique.beltColor === '#FFD700' ||
                  technique.beltColor === '#FFA500'
                    ? '#000000'
                    : '#FFFFFF',
              }}
              size='small'
            />
            <Chip label={technique.category} color='primary' size='small' />
            <Chip
              label={technique.difficulty}
              color={getDifficultyColor(technique.difficulty) as any}
              size='small'
            />
          </Box>

          <Typography variant='body2' color='text.secondary' mb={1}>
            <strong>Scenario:</strong> {technique.scenario}
          </Typography>

          <Typography variant='body2' color='text.secondary' mb={2}>
            <strong>Technique:</strong> {technique.technique}
          </Typography>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='subtitle2'>Setup & Execution</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box mb={2}>
                <Typography variant='subtitle2' gutterBottom>
                  Setup:
                </Typography>
                <List dense>
                  {technique.setup.map((step, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`${index + 1}. ${step}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box mb={2}>
                <Typography variant='subtitle2' gutterBottom>
                  Execution:
                </Typography>
                <List dense>
                  {technique.execution.map((step, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`${index + 1}. ${step}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='subtitle2'>Key Points & Mistakes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box mb={2}>
                <Typography variant='subtitle2' gutterBottom>
                  Key Points:
                </Typography>
                <List dense>
                  {technique.keyPoints.map((point, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`• ${point}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box mb={2}>
                <Typography variant='subtitle2' gutterBottom>
                  Common Mistakes:
                </Typography>
                <List dense>
                  {technique.commonMistakes.map((mistake, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`• ${mistake}`} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </AccordionDetails>
          </Accordion>

          {technique.safetyNotes.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display='flex' alignItems='center' gap={1}>
                  <WarningIcon color='warning' />
                  <Typography variant='subtitle2' color='warning.main'>
                    Safety Notes
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Alert severity='warning' sx={{ mb: 1 }}>
                  <Typography variant='body2' fontWeight='bold'>
                    IMPORTANT SAFETY INFORMATION
                  </Typography>
                </Alert>
                <List dense>
                  {technique.safetyNotes.map((note, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`• ${note}`} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant='subtitle2'>Applications</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {technique.applications.map((application, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={`• ${application}`} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {technique.counters && technique.counters.length > 0 && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant='subtitle2'>Counters</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {technique.counters.map((counter, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText primary={`• ${counter}`} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Box>
      {isLoading || (isFetching && <Loading />)}

      <Typography variant='h4' component='h1' gutterBottom>
        Self-Defense & Ground Work
      </Typography>

      <Typography variant='body1' paragraph color='text.secondary'>
        Learn essential self-defense techniques, escapes, and ground work for real-world situations.
        These techniques are taught progressively through the Tang Soo Do belt system.
      </Typography>

      <Alert severity='error' sx={{ mb: 3 }}>
        <Typography variant='body2' fontWeight='bold'>
          ⚠️ SAFETY WARNING: These techniques can cause serious injury. Practice only under
          qualified supervision with proper safety equipment. Never attempt advanced techniques
          without instructor guidance.
        </Typography>
      </Alert>

      {/* Filters */}
      <Box display='flex' gap={2} mb={3} flexWrap='wrap'>
        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label='Category'
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Belt Level</InputLabel>
          <Select
            value={selectedBelt}
            onChange={(e) => setSelectedBelt(e.target.value)}
            label='Belt Level'
          >
            {belts.map((belt) => (
              <MenuItem key={belt} value={belt}>
                {belt}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size='small' sx={{ minWidth: 120 }}>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            label='Difficulty'
          >
            {difficulties.map((difficulty) => (
              <MenuItem key={difficulty} value={difficulty}>
                {difficulty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size='small'
          label='Search techniques...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ minWidth: 200 }}
        />
      </Box>

      {/* Results Summary */}
      <Typography variant='body2' color='text.secondary' mb={2}>
        Showing {filteredTechniques.length} of {selfDefense.length} techniques
      </Typography>

      {/* Techniques Grid */}
      <Grid container spacing={3}>
        {filteredTechniques.map(renderTechniqueCard)}
      </Grid>

      {filteredTechniques.length === 0 && (
        <Box textAlign='center' py={4}>
          <Typography variant='h6' color='text.secondary'>
            No techniques found matching your criteria
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Try adjusting your filters or search term
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SelfDefenseClient;
