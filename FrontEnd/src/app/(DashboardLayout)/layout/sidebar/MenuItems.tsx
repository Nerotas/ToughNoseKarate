import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconAward,
  IconUsers,
  IconSwords,
  IconMan,
  IconTarget,
  IconBrandTorchain,
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'HOME',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
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
    title: 'Students',
    icon: IconUsers,
    href: '/students',
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
  {
    id: uniqueId(),
    title: 'One Steps',
    icon: IconTarget,
    href: '/one-steps',
  },
  {
    id: uniqueId(),
    title: 'Combinations',
    icon: IconSwords,
    href: '/combinations',
  },
  {
    navlabel: true,
    subheader: 'UTILITIES',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/utilities/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/utilities/shadow',
  },
  {
    navlabel: true,
    subheader: 'AUTH',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/authentication/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/authentication/register',
  },
  {
    navlabel: true,
    subheader: ' EXTRA',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
