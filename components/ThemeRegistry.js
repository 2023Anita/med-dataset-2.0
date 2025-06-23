'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// 导入字体
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

// 创建医疗风格主题配置
const getTheme = mode => {
  // 医疗主色调
  const medicalBlue = '#0066CC';      // 医疗蓝
  const medicalGreen = '#00A86B';     // 医疗绿
  const medicalTeal = '#20B2AA';      // 医疗青
  const darkGray = '#2C3E50';         // 深蓝灰

  // 医疗辅助色 - 专业医疗色谱
  const medicalColors = [
    '#0066CC', // 医疗蓝
    '#00A86B', // 医疗绿
    '#20B2AA', // 医疗青
    '#4A90E2', // 天空蓝
    '#7ED321', // 健康绿
    '#F5A623'  // 温暖橙
  ];

  // 医疗状态色
  const successColor = '#00A86B'; // 医疗绿
  const warningColor = '#F5A623'; // 医疗橙
  const errorColor = '#D0021B';   // 医疗红
  const infoColor = '#4A90E2';    // 信息蓝

  // 医疗渐变色
  const gradientPrimary = 'linear-gradient(135deg, #0066CC 0%, #00A86B 100%)';
  const gradientSecondary = 'linear-gradient(135deg, #20B2AA 0%, #4A90E2 100%)';
  const gradientSoft = 'linear-gradient(135deg, rgba(0,102,204,0.1) 0%, rgba(0,168,107,0.1) 100%)';

  // 根据模式调整医疗风格颜色
  return createTheme({
    palette: {
      mode,
      primary: {
        main: medicalBlue,
        dark: '#004499',
        light: '#3385FF',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: medicalGreen,
        dark: '#007A5E',
        light: '#33C299',
        contrastText: '#FFFFFF'
      },
      tertiary: {
        main: medicalTeal,
        dark: '#1A9B94',
        light: '#4DC9C1',
        contrastText: '#FFFFFF'
      },

      error: {
        main: errorColor,
        dark: '#A0011A',
        light: '#FF4D6D'
      },
      warning: {
        main: warningColor,
        dark: '#CC8500',
        light: '#FFB84D'
      },
      success: {
        main: successColor,
        dark: '#007A5E',
        light: '#33C299'
      },
      info: {
        main: infoColor,
        dark: '#2E6BC7',
        light: '#7BB3FF'
      },
      background: {
        default: mode === 'dark' ? '#0F1419' : '#F8FAFB',
        paper: mode === 'dark' ? '#1A1F2E' : '#FFFFFF',
        subtle: mode === 'dark' ? '#252A3A' : '#F0F4F8',
        medical: mode === 'dark' ? '#1E2A3A' : '#F5F8FA'
      },
      text: {
        primary: mode === 'dark' ? '#E8F4FD' : darkGray,
        secondary: mode === 'dark' ? '#A0AEC0' : '#718096',
        disabled: mode === 'dark' ? '#4A5568' : '#A0AEC0',
        medical: mode === 'dark' ? '#B8E6FF' : '#2D3748'
      },
      divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
      // 医疗数据可视化色谱
      dataViz: medicalColors,
      // 医疗风格渐变调色板
      gradient: {
        primary: gradientPrimary,
        secondary: gradientSecondary,
        soft: gradientSoft,
        success: 'linear-gradient(135deg, #00A86B 0%, #7ED321 100%)',
        warning: 'linear-gradient(135deg, #F5A623 0%, #FF8C00 100%)',
        error: 'linear-gradient(135deg, #D0021B 0%, #FF4D6D 100%)',
        info: 'linear-gradient(135deg, #4A90E2 0%, #7BB3FF 100%)',
        medical: 'linear-gradient(135deg, #E8F4FD 0%, #F0F8FF 100%)'
      },
      // 医疗风格自定义颜色
      custom: {
        cardBorder: mode === 'dark' ? '#2D3748' : '#E2E8F0',
        divider: mode === 'dark' ? '#2D3748' : '#E2E8F0',
        hover: mode === 'dark' ? 'rgba(0,102,204, 0.08)' : 'rgba(0,102,204, 0.04)',
        selected: mode === 'dark' ? 'rgba(0,102,204, 0.12)' : 'rgba(0,102,204, 0.08)',
        backdrop: mode === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.5)',
        medical: {
          light: mode === 'dark' ? '#1A2332' : '#F7FAFC',
          medium: mode === 'dark' ? '#2D3748' : '#EDF2F7',
          accent: mode === 'dark' ? '#4A90E2' : '#0066CC'
        }
      }
    },
    typography: {
      fontFamily:
        '"Inter", "HarmonyOS Sans", "PingFang SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontSize: '2rem', // 32px
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.01em'
      },
      h2: {
        fontSize: '1.5rem', // 24px
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.005em'
      },
      h3: {
        fontSize: '1.25rem', // 20px
        fontWeight: 600,
        lineHeight: 1.4
      },
      h4: {
        fontSize: '1.125rem', // 18px
        fontWeight: 600,
        lineHeight: 1.4
      },
      h5: {
        fontSize: '1rem', // 16px
        fontWeight: 600,
        lineHeight: 1.5
      },
      h6: {
        fontSize: '0.875rem', // 14px
        fontWeight: 600,
        lineHeight: 1.5
      },
      body1: {
        fontSize: '1rem', // 16px
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem', // 14px
        lineHeight: 1.5
      },
      caption: {
        fontSize: '0.75rem', // 12px
        lineHeight: 1.5
      },
      code: {
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.875rem'
      }
    },
    shape: {
      borderRadius: 8
    },
    spacing: 8, // 基础间距单位为8px
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            scrollbarColor: mode === 'dark' ? '#4B5563 transparent' : '#9CA3AF transparent',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              background: mode === 'dark' ? '#4B5563' : '#9CA3AF',
              borderRadius: '4px'
            }
          },
          // 确保代码块使用 JetBrains Mono 字体
          'code, pre': {
            fontFamily: '"JetBrains Mono", monospace'
          },
          // 自定义渐变文本的通用样式
          '.gradient-text': {
            background: gradientPrimary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: '8px',
            padding: '6px 16px'
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }
          },
          containedPrimary: {
            background: medicalBlue,
            '&:hover': {
              backgroundColor: '#004499'
            }
          },
          containedSecondary: {
            background: medicalGreen,
            '&:hover': {
              backgroundColor: '#007A5E'
            }
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px'
            }
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            background: mode === 'dark' ? '#1A2332' : medicalBlue
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: mode === 'dark'
              ? '0px 8px 24px rgba(0, 0, 0, 0.4), 0px 2px 8px rgba(0, 102, 204, 0.1)'
              : '0px 8px 24px rgba(0, 0, 0, 0.06), 0px 2px 8px rgba(0, 102, 204, 0.08)',
            border: mode === 'dark' ? '1px solid #2D3748' : '1px solid #E2E8F0',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'dark'
                ? '0px 12px 32px rgba(0, 0, 0, 0.5), 0px 4px 12px rgba(0, 102, 204, 0.15)'
                : '0px 12px 32px rgba(0, 0, 0, 0.08), 0px 4px 12px rgba(0, 102, 204, 0.12)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px'
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            fontWeight: 500
          }
        }
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              backgroundColor: mode === 'dark' ? '#2A2A2A' : '#F3F4F6'
            }
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          indicator: {
            height: '3px',
            borderRadius: '3px 3px 0 0'
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            '&.Mui-selected': {
              fontWeight: 600
            }
          }
        }
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px'
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: '1.25rem',
            fontWeight: 600
          }
        }
      }
    }
  });
};

export default function ThemeRegistry({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <InnerThemeRegistry>{children}</InnerThemeRegistry>
    </NextThemeProvider>
  );
}

function InnerThemeRegistry({ children }) {
  const { resolvedTheme } = useTheme();
  const theme = getTheme(resolvedTheme === 'dark' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
