'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import dayjs from 'dayjs';
import { BeltRequirements } from '../../../../models/BeltRequirements/BeltRequirements';
import { BeltProgression } from '../../../../models/BeltProgression/BeltProgression';

interface EditCurrentBeltProgressFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: BeltProgressionFormData) => void;
  currentBelt?: BeltProgression;
  beltRequirements: BeltRequirements[];
  studentId: string;
  loading?: boolean;
}

export interface BeltProgressionFormData {
  belt_rank: string;
  promoted_date: string;
  promoted_by: string;
  ceremony_date?: string;
  belt_certificate_number?: string;
  notes?: string;
  is_current?: boolean;
}

// Helper function to get belt color
const getBeltColor = (beltRank: string, beltRequirements: BeltRequirements[]): string => {
  const beltReq = beltRequirements.find(
    (req) => req.beltRank.toLowerCase() === beltRank.toLowerCase()
  );
  return beltReq?.color || '#757575';
};

// Helper function to get belt text color
const getBeltTextColor = (beltRank: string, beltRequirements: BeltRequirements[]): string => {
  const beltReq = beltRequirements.find(
    (req) => req.beltRank.toLowerCase() === beltRank.toLowerCase()
  );
  return beltReq?.textColor || '#FFFFFF';
};

const EditCurrentBeltProgressForm: React.FC<EditCurrentBeltProgressFormProps> = ({
  open,
  onClose,
  onSave,
  currentBelt,
  beltRequirements,
  studentId,
  loading = false,
}) => {
  const [formData, setFormData] = useState<BeltProgressionFormData>({
    belt_rank: currentBelt?.belt_rank || '',
    promoted_date: currentBelt?.promoted_date || dayjs().format('YYYY-MM-DD'),
    promoted_by: currentBelt?.promoted_by || '',
    ceremony_date: currentBelt?.ceremony_date || '',
    belt_certificate_number: currentBelt?.belt_certificate_number || '',
    notes: currentBelt?.notes || '',
    is_current: currentBelt?.is_current === 1 || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.belt_rank) {
      newErrors.belt_rank = 'Belt rank is required';
    }

    if (!formData.promoted_date) {
      newErrors.promoted_date = 'Promoted date is required';
    }

    if (!formData.promoted_by.trim()) {
      newErrors.promoted_by = 'Promoted by is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const dataToSave = {
      ...formData,
    };

    onSave(dataToSave);
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const handleFieldChange = (field: keyof BeltProgressionFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const selectedBeltColor = getBeltColor(formData.belt_rank, beltRequirements);
  const selectedBeltTextColor = getBeltTextColor(formData.belt_rank, beltRequirements);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
      <DialogTitle>
        {currentBelt ? 'Edit Current Belt Progression' : 'Add Belt Progression'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Belt Rank Selection */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.belt_rank}>
                <InputLabel>Belt Rank</InputLabel>
                <Select
                  value={formData.belt_rank}
                  label='Belt Rank'
                  onChange={(e) => handleFieldChange('belt_rank', e.target.value)}
                >
                  {beltRequirements
                    .sort((a, b) => (a.beltOrder || 0) - (b.beltOrder || 0))
                    .map((belt) => (
                      <MenuItem key={belt.beltRank} value={belt.beltRank}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={belt.beltRank}
                            size='small'
                            sx={{
                              backgroundColor: belt.color,
                              color: belt.textColor,
                              fontWeight: 'bold',
                              minWidth: 80,
                            }}
                          />
                          <Typography>{belt.beltRank}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                </Select>
                {errors.belt_rank && (
                  <Typography variant='caption' color='error' sx={{ mt: 1 }}>
                    {errors.belt_rank}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            {/* Belt Preview */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='subtitle2' color='text.secondary' sx={{ mb: 1 }}>
                  Selected Belt
                </Typography>
                {formData.belt_rank && (
                  <Chip
                    label={`${formData.belt_rank} Belt`}
                    sx={{
                      backgroundColor: selectedBeltColor,
                      color: selectedBeltTextColor,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      p: 2,
                      border: selectedBeltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                    }}
                  />
                )}
              </Box>
            </Grid>

            {/* Promoted Date */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type='date'
                label='Promoted Date'
                value={formData.promoted_date}
                onChange={(e) => handleFieldChange('promoted_date', e.target.value)}
                error={!!errors.promoted_date}
                helperText={errors.promoted_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Promoted By */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Promoted By'
                value={formData.promoted_by}
                onChange={(e) => handleFieldChange('promoted_by', e.target.value)}
                error={!!errors.promoted_by}
                helperText={errors.promoted_by}
                placeholder='Enter instructor name'
              />
            </Grid>

            {/* Ceremony Date (Optional) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type='date'
                label='Ceremony Date (Optional)'
                value={formData.ceremony_date}
                onChange={(e) => handleFieldChange('ceremony_date', e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Certificate Number (Optional) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label='Belt Certificate Number (Optional)'
                value={formData.belt_certificate_number}
                onChange={(e) => handleFieldChange('belt_certificate_number', e.target.value)}
                placeholder='Enter certificate number'
              />
            </Grid>

            {/* Notes */}
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Notes (Optional)'
                value={formData.notes}
                onChange={(e) => handleFieldChange('notes', e.target.value)}
                placeholder='Add any additional notes about this promotion...'
              />
            </Grid>

            {/* Current Belt Status */}
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_current || false}
                    onChange={(e) => handleFieldChange('is_current', e.target.checked)}
                  />
                }
                label='Set as current/active belt'
              />
            </Grid>

            {/* Information Alert */}
            <Grid size={{ xs: 12 }}>
              <Alert severity='info'>
                {currentBelt
                  ? "Editing the current belt progression will update the student's active belt rank."
                  : "This will become the student's current active belt rank."}
              </Alert>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant='contained' disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCurrentBeltProgressForm;
