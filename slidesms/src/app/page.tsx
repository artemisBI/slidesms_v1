import Hero from './components/Hero';
import Features from './components/Features';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';
import styles from './page.module.css';

export default function MarketingPage() {
  return (
    <main className={styles.main}>
      <Hero />
      <Features />
      <EmailCapture />
      <Footer />
    </main>
  );
}
