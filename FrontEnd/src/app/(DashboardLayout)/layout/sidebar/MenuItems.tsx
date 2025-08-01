import {
  IconLayoutDashboard,
  IconLogin,
  IconUserPlus,
  IconAward,
  IconUsers,
  IconMan,
  IconBrandTorchain,
  IconClipboardCheck,
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
    title: 'Forms (Kata)',
    icon: IconMan,
    href: '/forms',
  },
  {
    id: uniqueId(),
    title: 'Stances',
    icon: IconBrandTorchain,
    href: '/stances',
  },
];

export const AuthMenuItems = [
  {
    navlabel: true,
    subheader: 'AUTH',
  },
  {
    id: uniqueId(),
    title: 'Students',
    icon: IconUsers,
    href: '/students',
  },
  {
    id: uniqueId(),
    title: 'Assessments',
    icon: IconClipboardCheck,
    href: '/authentication/assessments', //TODO: create assessments page
  },
];
