// styles/home.js
export const styles = {
  heroSection: {
    pt: { xs: 6, md: 10 },
    pb: { xs: 6, md: 8 },
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out'
  },
  heroBackground: theme => ({
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(42, 92, 170, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)'
        : 'linear-gradient(135deg, rgba(42, 92, 170, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'url("/imgs/grid-pattern.png") repeat',
      opacity: theme.palette.mode === 'dark' ? 0.05 : 0.03,
      zIndex: 0
    }
  }),
  // 医疗风格背景
  medicalHeroBackground: theme => ({
    background:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(0, 102, 204, 0.2) 0%, rgba(0, 168, 107, 0.2) 50%, rgba(32, 178, 170, 0.2) 100%)'
        : 'linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 168, 107, 0.05) 50%, rgba(32, 178, 170, 0.05) 100%)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `
        radial-gradient(circle at 20% 20%, rgba(0, 102, 204, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(0, 168, 107, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 60%, rgba(32, 178, 170, 0.1) 0%, transparent 50%)
      `,
      opacity: theme.palette.mode === 'dark' ? 0.6 : 0.4,
      zIndex: 0
    }
  }),
  decorativeCircle: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(42, 92, 170, 0) 70%)',
    top: '-300px',
    right: '-200px',
    zIndex: 0,
    animation: 'pulse 15s infinite ease-in-out',
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' }
    }
  },
  decorativeCircleSecond: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(42, 92, 170, 0.1) 0%, rgba(139, 92, 246, 0) 70%)',
    bottom: '-200px',
    left: '-100px',
    zIndex: 0,
    animation: 'pulse2 20s infinite ease-in-out',
    '@keyframes pulse2': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.08)' },
      '100%': { transform: 'scale(1)' }
    }
  },
  // 医疗风格装饰圆圈
  medicalDecorativeCircle: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0, 102, 204, 0.12) 0%, rgba(0, 168, 107, 0.08) 50%, transparent 70%)',
    top: '-200px',
    right: '-150px',
    zIndex: 0,
    animation: 'medicalPulse 18s infinite ease-in-out',
    '@keyframes medicalPulse': {
      '0%': { transform: 'scale(1) rotate(0deg)' },
      '33%': { transform: 'scale(1.03) rotate(120deg)' },
      '66%': { transform: 'scale(1.06) rotate(240deg)' },
      '100%': { transform: 'scale(1) rotate(360deg)' }
    }
  },
  medicalDecorativeCircleSecond: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(32, 178, 170, 0.1) 0%, rgba(74, 144, 226, 0.06) 50%, transparent 70%)',
    bottom: '-150px',
    left: '-80px',
    zIndex: 0,
    animation: 'medicalPulse2 22s infinite ease-in-out',
    '@keyframes medicalPulse2': {
      '0%': { transform: 'scale(1) rotate(0deg)' },
      '50%': { transform: 'scale(1.08) rotate(180deg)' },
      '100%': { transform: 'scale(1) rotate(360deg)' }
    }
  },
  gradientTitle: theme => ({
    mb: 2,
    background: theme.palette.gradient.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent'
  }),
  createButton: theme => ({
    mt: 3,
    px: 4,
    py: 1.2,
    borderRadius: '12px',
    fontSize: '1rem',
    background: theme.palette.gradient.primary,
    '&:hover': {
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
    }
  }),
  // 医疗风格按钮
  medicalCreateButton: theme => ({
    mt: 3,
    px: 5,
    py: 1.5,
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: 600,
    background: theme.palette.gradient.primary,
    boxShadow: '0 8px 24px rgba(0, 102, 204, 0.25)',
    border: 'none',
    '&:hover': {
      background: theme.palette.gradient.primary,
      boxShadow: '0 12px 32px rgba(0, 102, 204, 0.35)',
      transform: 'translateY(-2px)'
    }
  }),
  medicalSecondaryButton: theme => ({
    mt: 3,
    px: 5,
    py: 1.5,
    borderRadius: '16px',
    fontSize: '1.1rem',
    fontWeight: 600,
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    borderWidth: '2px',
    backgroundColor: 'transparent',
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgba(0, 102, 204, 0.05)',
      borderWidth: '2px'
    }
  }),
  statsCard: theme => ({
    mt: 6,
    p: { xs: 2, md: 4 },
    borderRadius: '16px',
    boxShadow: theme.palette.mode === 'dark' ? '0 8px 24px rgba(0, 0, 0, 0.2)' : '0 8px 24px rgba(0, 0, 0, 0.05)',
    background: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(8px)'
  }),
  projectCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    position: 'relative'
  },
  // 医疗风格项目卡片
  medicalProjectCard: theme => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    position: 'relative',
    borderRadius: '20px',
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(145deg, #1A2332 0%, #1E2A3A 100%)'
      : 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFB 100%)',
    border: theme.palette.mode === 'dark'
      ? '1px solid #2D3748'
      : '1px solid #E2E8F0',
    boxShadow: theme.palette.mode === 'dark'
      ? '0px 8px 24px rgba(0, 0, 0, 0.4), 0px 2px 8px rgba(0, 102, 204, 0.1)'
      : '0px 8px 24px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 102, 204, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0px 16px 40px rgba(0, 0, 0, 0.5), 0px 4px 16px rgba(0, 102, 204, 0.2)'
        : '0px 16px 40px rgba(0, 0, 0, 0.08), 0px 4px 16px rgba(0, 102, 204, 0.15)',
      '& .medical-card-accent': {
        opacity: 1,
        transform: 'scaleX(1)'
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: theme.palette.gradient.primary,
      borderRadius: '20px 20px 0 0',
      opacity: 0.8,
      transition: 'all 0.3s ease'
    }
  }),
  projectAvatar: {
    position: 'absolute',
    top: -16,
    left: 24,
    zIndex: 1
  },
  projectDescription: {
    mb: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '40px'
  }
};
