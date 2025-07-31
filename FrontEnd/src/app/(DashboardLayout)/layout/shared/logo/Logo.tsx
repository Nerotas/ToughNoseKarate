import Link from 'next/link';
import { styled, Typography } from '@mui/material';
import Image from 'next/image';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
}));

const Logo = () => {
  return (
    <LinkStyled href='/'>
      <div style={{ position: 'relative', width: '60px', height: '60px' }}>
        <Image
          src='/images/logos/ErotasIcon.png'
          alt='logo'
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      <Typography
        variant='h6'
        sx={{
          display: 'inline-block',
          verticalAlign: 'middle',
          marginLeft: 1,
          color: 'text.primary',
          fontFamily: '"Impact", "Arial Black", "Helvetica", sans-serif',
          fontWeight: 900,
          letterSpacing: '2px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Tough Nose
      </Typography>
    </LinkStyled>
  );
};

export default Logo;
