import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Home.module.css';

export default function Home(props) {
  const { experimentId = '', variantId = '' } = props;
  const mainClasses = `${
    variantId === '1' ? styles.bVariant : styles.aVariant
  } ${styles.main}`;
  const isAVariant = variantId === '0' || !variantId;
  const gaMeasurementID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? '';

  return (
    <div className={styles.container}>
      <Script
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'experiment_impression', {
              'experiment_id': '${experimentId}',
              'variant_id': '${variantId}',
              'send_to': '${gaMeasurementID}'
            });
            gtag('set', {'experiments': [{'id': '${experimentId}', 'variant': '${variantId}'}]});
          `,
        }}
      />

      <Head>
        <title>AB test page. Variant {isAVariant ? 'A' : 'B'}</title>
      </Head>

      <main className={mainClasses}>
        {isAVariant ? (
          <h1 className={styles.title}>
            This is <span style={{ fontSize: '90px' }}>A</span> variant
          </h1>
        ) : (
          <h1 className={styles.title}>
            This is <span style={{ fontSize: '90px' }}>B</span> variant
          </h1>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { experimentId, variantId } = context.query;
  return {
    props: {
      experimentId: experimentId ?? null,
      variantId: variantId ?? null,
    },
  };
}
