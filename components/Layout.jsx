import Head from 'next/head';
import { Box } from '@chakra-ui/react';
// import "./Navbar.css"

import Footer from './Footer';
import Navbar from './Navbar';
import { useRouter } from 'next/router';

export default function Layout({ children }) {

  const router = useRouter();

  // Check if the current page is the index page
  const isIndexPage = router.pathname === '/';


  return (
    <>
      <Head>
        <title>Real Estate</title>
      </Head>
      <Box maxWidth='1280px' m='auto'>
        <header>
          {isIndexPage ? null : <Navbar />} {/* Hide navbar on index page */}
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}
