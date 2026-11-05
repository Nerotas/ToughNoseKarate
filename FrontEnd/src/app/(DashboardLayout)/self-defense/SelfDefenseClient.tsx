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
import { CardGridSkeleton } from 'components/loading/PageLoadingSkeleton';
import SelfDefenseCard from '../components/self-defense/SelfDefenseCard';
import SelfDefenseCreateModule from '../components/self-defense/selfDefenseCreateModule';
import { useAuth } from 'hooks/useAuth';
import orderByBeltRank from 'utils/helpers/orderByBeltRank';

const SelfDefenseContent = ({
  children,
  onCreate,
}: {
  children: React.ReactNode;
  onCreate?: () => void;
}) => (
  <Box>
    <Box display='flex' alignItems='center' justifyContent='space-between' mb={1}>
      <Typography variant='h4' component='h1'>
        Self-Defense & Ground Work
      </Typography>
      {onCreate && (
        <Button variant='contained' color='primary' onClick={onCreate}>
          Add Technique
        </Button>
      )}
    </Box>
    <Typography variant='body1' paragraph color='text.secondary'>
      Learn essential self-defense techniques, escapes, and ground work for real-world situations.
      These techniques are taught progressively through the Tang Soo Do beltRank system.
    </Typography>
    <Alert severity='error' sx={{ mb: 3 }}>
      <Typography variant='body2' fontWeight='bold'>
        ⚠️ SAFETY WARNING: These techniques can cause serious injury. Practice only under qualified
        supervision with proper safety equipment. Never attempt advanced techniques without
        instructor guidance.
      </Typography>
    </Alert>
    {children}
  </Box>
);

export const SelfDefenseLoading = () => (
  <SelfDefenseContent>
    <Box display='flex' gap={2} mb={3} flexWrap='wrap'>
      {['Category', 'Belt Level', 'Difficulty'].map((label) => (
        <FormControl key={label} size='small' sx={{ minWidth: 120 }} disabled>
          <InputLabel>{label}</InputLabel>
          <Select value='All' label={label}>
            <MenuItem value='All'>All</MenuItem>
          </Select>
        </FormControl>
      ))}
      <TextField size='small' label='Search techniques...' sx={{ minWidth: 200 }} disabled />
    </Box>
    <Typography variant='body2' color='text.secondary' mb={2}>
      Loading techniques...
    </Typography>
    <CardGridSkeleton label='Loading self-defense techniques' columns={{ xs: 12, sm: 6, lg: 4 }} />
  </SelfDefenseContent>
);

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
    isError,
    refetch,
  } = useGet<SelfDefenseDefinition[]>({
    apiLabel: 'self-defense-definitions',
    url: '/self-defense-definitions',
    id: 'getAll',
    options: {
      placeholderData: undefined,
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  });

  const displaySelfDefense = orderByBeltRank(selfDefenseDefinitions || [], (item) => item.beltRank);
  // Get unique values for filters
  const categories = [
    'All',
    ...Array.from(new Set(displaySelfDefense.map((technique) => technique.category))),
  ];
  const belts = [
    'All',
    ...Array.from(new Set(displaySelfDefense.map((technique) => technique.beltRank))),
  ];
  const difficulties = [
    'All',
    ...Array.from(new Set(displaySelfDefense.map((technique) => technique.difficulty))),
  ];

  // Filter techniques based on selected criteria
  const filteredTechniques = displaySelfDefense.filter((technique) => {
    const matchesCategory = selectedCategory === 'All' || technique.category === selectedCategory;
    const matchesBelt = selectedBelt === 'All' || technique.beltRank === selectedBelt;
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
    <SelfDefenseContent onCreate={canCreate ? () => setIsCreateOpen(true) : undefined}>
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
            {belts.map((beltRank) => (
              <MenuItem key={beltRank} value={beltRank}>
                {beltRank}
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
        {isPending
          ? 'Loading techniques...'
          : `Showing ${filteredTechniques.length} of ${displaySelfDefense.length} techniques`}
      </Typography>

      {isError && (
        <Alert severity='error' sx={{ mb: 3 }}>
          Unable to load self-defense techniques. Please try again.
          <Button color='inherit' onClick={refetchSelfDefense}>
            Retry
          </Button>
        </Alert>
      )}
      {/* Techniques Grid */}
      {isPending ? (
        <CardGridSkeleton
          label='Loading self-defense techniques'
          columns={{ xs: 12, sm: 6, lg: 4 }}
        />
      ) : (
        <Grid container spacing={3}>
          {filteredTechniques.map((technique) => (
            <SelfDefenseCard
              key={technique.id}
              selfDefense={technique}
              refetchSelfDefense={refetchSelfDefense}
            />
          ))}
        </Grid>
      )}

      {!isPending && !isError && filteredTechniques.length === 0 && (
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
    </SelfDefenseContent>
  );
};

export default SelfDefenseClient;
