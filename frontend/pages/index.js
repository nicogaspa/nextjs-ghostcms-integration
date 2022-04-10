import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>YourWebsite | Homepage</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          YourWebsite.com!
        </h1>

        <p>
          This will be the homepage of your website, customize it as you wish then visit the{' '}
          <Link href="/blog">
            <a href={"/blog"}>
              blog
            </a>
          </Link>
        </p>

      </main>

      <footer className={styles.footer}>
        <a href="https://github.com/nicogaspa/nextjs-ghostcms-integration">GitHub</a>
      </footer>
    </div>
  )
}
