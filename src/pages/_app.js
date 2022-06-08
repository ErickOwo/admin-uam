import Head from 'next/head';
import '@styles/tailwind.css';
import { ProviderAuth } from '@hooks/use-auth';
import Header from '@containers/Header';

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <Head>
        <title>Admin UAM</title>
        <meta name="description" content="Administración de página UAM" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <div className='bg-[url("../assets/images/wallpaper.jpg")] md:bg-[length:100%_100%] bg-[length:220%_100%] bg-right md:bg-center bg-fixed w-full max-w-none'>
        <Header />
        <main className="w-full min-h-screen pt-20">
          <Component {...pageProps} />
        </main>
      </div>
    </ProviderAuth>
  );
}

export default MyApp;
