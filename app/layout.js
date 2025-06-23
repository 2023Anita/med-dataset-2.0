import './globals.css';
import ThemeRegistry from '@/components/ThemeRegistry';
import I18nProvider from '@/components/I18nProvider';
import CopyrightFooter from '@/components/common/CopyrightFooter';
import { Toaster } from 'sonner';
import { Provider } from 'jotai';

export const metadata = {
  title: 'MED-Dataset',
  description: '专业的医疗数据集生成与管理平台',
  icons: {
    icon: '/imgs/logo.ico' // 更新为正确的文件名
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <ThemeRegistry>
            <I18nProvider>
              {children}
              <CopyrightFooter />
              <Toaster richColors position="top-center" />
            </I18nProvider>
          </ThemeRegistry>
        </Provider>
      </body>
    </html>
  );
}
