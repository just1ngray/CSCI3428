
import Link from 'next/link'
import Head from 'next/head'

export default function Layout({
  children,
  title = 'Email App',
}) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/StudentHome">
            <a>Home</a>
          </Link>{' '}
          |
          <Link href="/Compose">
            <a>New Mail</a>
          </Link>{' '}
          |
          <Link href="/SentItems">
            <a>Sent Mail</a>
          </Link>
        </nav>
      </header>

      {children}

      <footer>{'IN DEVELOPMENT - PROTOTYPE BUILD 3'}</footer>
    </div>
  )
}