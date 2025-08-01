'use client';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { IconMan, IconChevronDown, IconPlayerPlay, IconBook } from '@tabler/icons-react';
import PageContainer from '../components/container/PageContainer';
import useGet from '../../../hooks/useGet';

// API interface for forms
interface FormAPI {
  id: number;
  form_name: string;
  form_description: string;
  sequence_number: number;
  belt_requirement: string;
  active_indicator: number;
  video_link: string;
  createdAt: string;
  updatedAt: string;
}

const forms = [
  {
    id: 1,
    name: 'Kicho Hyung Il Bu',
    korean: '기초형 일부',
    translation: 'Basic Form #1',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    difficulty: 1,
    moves: 18,
    description:
      'The first form taught in Tang Soo Do, focusing on basic stances, blocks, and punches.',
    techniques: [
      'Ready stance',
      'Left front stance with high block',
      'Step forward with right front stance and middle punch',
      'Turn left 180° with left front stance and high block',
      'Step forward with right front stance and middle punch',
      'Turn left 90° with left front stance and low block',
      'Step forward with right front stance and middle punch',
      'Turn left 180° with right front stance and low block',
      'Step forward with left front stance and middle punch',
      'Turn right 90° with left front stance and high block',
      'Step forward with right front stance and middle punch',
      'Turn left 180° with right front stance and high block',
      'Step forward with left front stance and middle punch',
    ],
    keyPoints: [
      'Maintain proper stance throughout',
      'Sharp, decisive movements',
      'Proper timing and rhythm',
      'Eye contact in direction of technique',
    ],
  },
  {
    id: 2,
    name: 'Kicho Hyung E Bu',
    korean: '기초형 이부',
    translation: 'Basic Form #2',
    belt: 'Yellow Belt',
    beltColor: '#FFD700',
    difficulty: 2,
    moves: 20,
    description: 'Second basic form introducing knife hand blocks and strikes.',
    techniques: [
      'Ready stance',
      'Turn left with left front stance and knife hand block',
      'Step forward with right front stance and spear hand',
      'Turn right 180° with right front stance and knife hand block',
      'Step forward with left front stance and spear hand',
      'Turn left 90° with left front stance and low block',
      'Right front kick, land in right front stance with middle punch',
      'Turn left 180° with right front stance and low block',
      'Left front kick, land in left front stance with middle punch',
    ],
    keyPoints: [
      'Proper knife hand technique',
      'Balance during kicks',
      'Fluid transitions',
      'Power generation from hips',
    ],
  },
  {
    id: 3,
    name: 'Kicho Hyung Sam Bu',
    korean: '기초형 삼부',
    translation: 'Basic Form #3',
    belt: 'Orange Belt',
    beltColor: '#FFA500',
    difficulty: 3,
    moves: 20,
    description: 'Third basic form combining kicks with hand techniques.',
    techniques: [
      'Ready stance',
      'Turn left with left front stance and high block',
      'Right front kick, land with right reverse punch',
      'Turn right 180° with right front stance and high block',
      'Left front kick, land with left reverse punch',
      'Turn left 90° with left front stance and knife hand block',
      'Right side kick, land with right ridge hand strike',
      'Turn left 180° with right front stance and knife hand block',
      'Left side kick, land with left ridge hand strike',
    ],
    keyPoints: [
      'Kick-punch combinations',
      'Proper chamber and execution',
      'Balance and control',
      'Speed and power coordination',
    ],
  },
  {
    id: 4,
    name: 'Pyung Ahn Cho Dan',
    korean: '평안 초단',
    translation: 'Peace and Confidence #1',
    belt: 'Green Belt',
    beltColor: '#008000',
    difficulty: 4,
    moves: 27,
    description: 'First of the classical Pyung Ahn forms, introducing more complex techniques.',
    techniques: [
      'Ready stance in horse stance',
      'Step left into left front stance with double knife hand block',
      'Step forward with right front stance and high punch',
      'Turn right 180° with right front stance and double knife hand block',
      'Step forward with left front stance and high punch',
      'Turn left 90° with left front stance and low block',
      'Step forward with right front stance and middle punch',
      'Step forward with left front stance and high block',
      'Right reverse punch',
    ],
    keyPoints: [
      'Double hand techniques',
      'Horse stance stability',
      'Advanced footwork',
      'Precise timing',
    ],
  },
];

const getBeltTextColor = (beltColor: string) => {
  return beltColor === '#FFFFFF' || beltColor === '#FFD700' ? '#000000' : '#FFFFFF';
};

const Forms = () => {
  return (
    <PageContainer title='Forms (Kata)' description='Tang Soo Do Forms and Patterns'>
      <Box>
        <Typography variant='h2' gutterBottom sx={{ mb: 3 }}>
          Tang Soo Do Forms (Hyung)
        </Typography>

        <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
          Forms are choreographed sequences of martial arts techniques. They help develop proper
          technique, balance, timing, and mental discipline while preserving traditional martial
          arts knowledge. Every form is a simulation of real combat situations, allowing
          practitioners to refine their skills in a controlled environment. A master of forms can
          put their own personality into the movements, making each performance unique and telling
          an individual story.
        </Typography>

        <Grid container spacing={3}>
          {forms.map((form) => (
            <Grid size={{ xs: 12, md: 6, lg: 6 }} key={form.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant='h5' gutterBottom>
                        {form.name}
                      </Typography>
                      <Typography variant='h6' color='text.secondary' gutterBottom>
                        {form.korean}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' gutterBottom>
                        {form.translation}
                      </Typography>
                    </Box>
                    <Chip
                      icon={<IconMan />}
                      label={form.belt}
                      sx={{
                        backgroundColor: form.beltColor,
                        color: getBeltTextColor(form.beltColor),
                        fontWeight: 'bold',
                        border: form.beltColor === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Chip label={`${form.moves} moves`} size='small' variant='outlined' />
                    <Chip
                      label={`Level ${form.difficulty}`}
                      size='small'
                      variant='outlined'
                      color='primary'
                    />
                  </Box>

                  <Typography variant='body2' paragraph>
                    {form.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant='outlined'
                      startIcon={<IconPlayerPlay />}
                      size='small'
                      sx={{ mr: 1 }}
                    >
                      Watch Video
                    </Button>
                    <Button variant='outlined' startIcon={<IconBook />} size='small'>
                      Print Guide
                    </Button>
                  </Box>

                  <Accordion>
                    <AccordionSummary expandIcon={<IconChevronDown />}>
                      <Typography variant='subtitle2'>Technique Sequence</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {form.techniques.map((technique, index) => (
                          <ListItem key={index} sx={{ pl: 0 }}>
                            <ListItemText
                              primary={`${index + 1}. ${technique}`}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<IconChevronDown />}>
                      <Typography variant='subtitle2'>Key Points</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {form.keyPoints.map((point, index) => (
                          <ListItem key={index} sx={{ pl: 0 }}>
                            <ListItemText
                              primary={`• ${point}`}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Form Training Tips
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant='subtitle2' gutterBottom>
                    Practice Guidelines:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Start slowly and focus on correct technique' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Practice in front of a mirror when possible' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Count movements out loud initially' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Visualize opponents during practice' />
                    </ListItem>
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant='subtitle2' gutterBottom>
                    Common Mistakes:
                  </Typography>
                  <List dense>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Rushing through movements' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Inconsistent stances' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Lack of focus and intensity' />
                    </ListItem>
                    <ListItem sx={{ pl: 0 }}>
                      <ListItemText primary='Poor breathing coordination' />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default Forms;
