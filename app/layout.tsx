import './globals.css';
import { Josefin_Sans, Noto_Sans } from 'next/font/google';
import { ConfigModel } from '@/models/config';
import { getConfig } from '@/helpers/firebaseHelpers';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { DataFetcher } from '@/components/DataFetcher';

export async function generateMetadata() {
  const config = (await getConfig()) as ConfigModel;
  return {
    title: config.store.name,
    description: config.store.description,
  };
}

const josefinSans = Josefin_Sans({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
});

const notoSans = Noto_Sans({
  weight: ['500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-notoSans',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${josefinSans.variable} ${notoSans.variable}`}>
        <DataFetcher />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
