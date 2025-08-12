'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Alert,
  Button,
} from '@mui/material';

import { SelfDefenseDefinition } from '../../../models/SelfDefense/SelfDefense';
import useGet from '../../../hooks/useGet';
import Loading from '../../../app/loading';
import SelfDefenseCard from '../components/self-defense/SelfDefenseCard';
import SelfDefenseCreateModule from '../components/self-defense/selfDefenseCreateModule';
import { useAuth } from 'hooks/useAuth';

const SelfDefenseClient: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBelt, setSelectedBelt] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  const { isAuthenticated, instructor } = useAuth();
  const canCreate = isAuthenticated && instructor?.role === 'admin';

  const {
    data: selfDefenseDefinitions,
    isPending,
    refetch,
  } = useGet<SelfDefenseDefinition[]>({
    apiLabel: 'self-defense-definitions',
    url: '/self-defense-definitions',
    id: 'getAll',
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
    selfDefenseDefinitions && selfDefenseDefinitions?.length > 0 ? selfDefenseDefinitions : [];

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

  const refetchSelfDefense = async () => {
    await refetch();
  };

  return (
    <Box>
      {isPending && <Loading />}

      <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
        <Typography variant='h4' component='h1'>
          Self-Defense & Ground Work
        </Typography>
        {canCreate && (
          <Button variant='contained' color='primary' onClick={() => setIsCreateOpen(true)}>
            Add Technique
          </Button>
        )}
      </Box>

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
        Showing {filteredTechniques?.length} of {displaySelfDefense?.length} techniques
      </Typography>

      {/* Techniques Grid */}
      <Grid container spacing={3}>
        {filteredTechniques.map((technique) => (
          <SelfDefenseCard
            key={technique.id}
            selfDefense={technique}
            refetchSelfDefense={refetchSelfDefense}
          />
        ))}
      </Grid>

      {filteredTechniques?.length === 0 && (
        <Box textAlign='center' py={4}>
          <Typography variant='h6' color='text.secondary'>
            No techniques found matching your criteria
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Try adjusting your filters or search term
          </Typography>
        </Box>
      )}

      {/* Create Modal (Admins only) */}
      {canCreate && (
        <SelfDefenseCreateModule
          open={isCreateOpen}
          handleCloseCreate={() => setIsCreateOpen(false)}
          refetchSelfDefense={refetchSelfDefense}
        />
      )}
    </Box>
  );
};

export default SelfDefenseClient;
