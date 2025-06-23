'use client';

import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CopyrightFooter() {
  const theme = useTheme();
  const { i18n } = useTranslation();
  
  // 根据语言显示不同的版权信息，添加默认值防止语言检测失败
  const copyrightText = (i18n.language === 'zh-CN' || i18n.language === 'zh' || !i18n.language)
    ? '版权所有 © 江阴市人民医院 - 睡眠魔法师团队 · 殷利鑫'
    : 'Copyright © Jiangyin People\'s Hospital - Sleep Magic Team · Yin Lixin';

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999, // 提高z-index确保显示在最上层
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(15, 20, 25, 0.95) 0%, rgba(26, 31, 46, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(0, 102, 204, 0.95) 0%, rgba(0, 168, 107, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
        boxShadow: theme.palette.mode === 'dark'
          ? '0 -4px 20px rgba(0, 0, 0, 0.3)'
          : '0 -4px 20px rgba(0, 102, 204, 0.2)',
        py: 1.5, // 增加内边距
        px: 2,
        minHeight: '48px', // 确保最小高度
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'center',
          color: 'white',
          fontFamily: '"JetBrains Mono", "SF Mono", "Monaco", "Inconsolata", "Fira Code", "Droid Sans Mono", "Source Code Pro", monospace',
          fontSize: '0.8rem', // 稍微增大字体
          fontWeight: 500,
          letterSpacing: '0.5px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)', // 增强文字阴影
          opacity: 1, // 确保完全不透明
          whiteSpace: 'nowrap', // 防止文字换行
          '&:hover': {
            opacity: 1,
            transform: 'scale(1.02)',
            transition: 'all 0.2s ease-in-out'
          }
        }}
      >
        {copyrightText}
      </Typography>
    </Box>
  );
}
