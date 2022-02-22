import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const mainClasses = `${styles.aVariant} ${styles.main}`;
  console.log('props', props);
  return (
    <div className={styles.container}>
      <Head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Head>
        <title>AB test page</title>
      </Head>

      <main className={mainClasses}>
        <h1 className={styles.title}>
          This is <span style={{ fontSize: '90px' }}>A</span> variant
        </h1>
        <h1 className={styles.title}>
          This is <span style={{ fontSize: '90px' }}>B</span> variant
        </h1>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { experiment, variant } = context.query;
  return {
    props: {
      experiment,
      variant,
    },
  };
}
