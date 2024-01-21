import styles from "./page.module.css";
import "./globals.css";
import ConversionView from "./ConversionView";

export default function Home() {
  return (
    <main className={styles.main}>
      <ConversionView />
    </main>
  );
}
