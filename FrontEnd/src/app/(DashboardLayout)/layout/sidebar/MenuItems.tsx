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
];

export default Menuitems;
