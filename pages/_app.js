import '../styles/globals.css'
import Link from 'next/link'
import styles from "../styles/components/Header.module.scss"; // Component styles


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className={styles.header}>
      <div className={styles.header__logo}>
          <Link href="https://pupnifty.com">
            <a>
              <img src="./puppy.svg" alt="Puppy NFT" />
            </a>
          </Link>&nbsp;&nbsp;<h1><b>Puppy NFT | A Decentralize NFT Marketplace Running on BSC [BETA] </b> </h1>
        </div>

        <div className={styles.header__menu}>
          <Link href="/">
          <a className={styles.header__menu_button_blue}>Home</a>
          </Link>
          <Link href="/my-nfts">
          <a className={styles.header__menu_button_blue}>My NFT Assets</a>
          </Link>
          <Link href="/create">
          <a className={styles.header__menu_button_blue}>Create NFT</a>
          </Link>
          <Link href="/">
          <a className={styles.header__menu_button_blue}>History</a>
          </Link>
          <Link href="/">
          <a className={styles.header__menu_button_blue}>Cross-Chain</a>
          </Link>
          <Link href="https://t.me/puppynft" target ="_blank">
          <a className={styles.header__menu_button_blue}>Community</a>
          </Link>
          <Link href="https://twitter.com/pupnifty" target ="_blank">
          <a className={styles.header__menu_button_blue}>Twitter</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} /> <br /><hr /><br /><br />

    </div>
  )
}

export default MyApp
