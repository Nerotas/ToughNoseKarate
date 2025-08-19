import {
  IconLayoutDashboard,
  IconAward,
  IconUsers,
  IconMan,
  IconBrandTorchain,
  IconHandStop,
  IconRun,
  IconSwords,
  IconShield,
  IconSchool,
  IconChalkboardTeacher,
  IconBlocks,
  IconClipboardTypographyFilled,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

export const Menuitems = [
  {
    id: uniqueId(),
    title: 'Home',
    icon: IconLayoutDashboard,
    href: '/',
  },
  {
    id: uniqueId(),
    title: 'Instructors',
    icon: IconSchool,
    href: '/instructors',
  },
  {
    navlabel: true,
    subheader: 'TRAINING',
  },
  {
    id: uniqueId(),
    title: 'Belt Requirements',
    icon: IconAward,
    href: '/belt-requirements',
  },

  {
    id: uniqueId(),
    title: 'Forms (Kata/Hyung)',
    icon: IconMan,
    href: '/forms',
  },
  {
    id: uniqueId(),
    title: 'Stances',
    icon: IconBrandTorchain,
    href: '/stances',
  },
  {
    id: uniqueId(),
    title: 'Blocks',
    icon: IconBlocks,
    href: '/blocks',
  },
  {
    id: uniqueId(),
    title: 'Punches',
    icon: IconHandStop,
    href: '/punches',
  },
  {
    id: uniqueId(),
    title: 'Kicks',
    icon: IconRun,
    href: '/kicks',
  },
  {
    id: uniqueId(),
    title: 'One-Step Sparring',
    icon: IconSwords,
    href: '/one-steps',
  },
  {
    id: uniqueId(),
    title: 'Self-Defense',
    icon: IconShield,
    href: '/self-defense',
  },
];

export const AuthMenuItems = [
  {
    navlabel: true,
    subheader: 'MANAGEMENT',
  },
  {
    id: uniqueId(),
    title: 'Students',
    icon: IconUsers,
    href: '/students',
  },
  {
    id: uniqueId(),
    title: 'Documents',
    icon: IconClipboardTypographyFilled,
    href: '/documents',
  },
];

export const LoginMenuItems = [
  {
    navlabel: true,
    subheader: 'MANAGEMENT',
  },
  {
    id: uniqueId(),
    title: 'Instructor Login',
    icon: IconChalkboardTeacher,
    href: '/auth/login',
  },
];
