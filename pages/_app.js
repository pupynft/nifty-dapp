import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b px-12 py-6">
  <div  className="mr-4 text-black-500">
      <img src="./puppy.svg" width="96" height = "96" />
      Puppy NFT | A Decentralize NFT Marketplace Running on BSC [BETA]</div>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-blue-500">
              Home
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-4 text-blue-500">
              My NFT Assets
            </a>
          </Link>
          <Link href="/create-item">
            <a className="mr-4 text-blue-500">
              Create NFT
            </a>
          </Link>
          <Link href="#">
            <a className="mr-4 text-blue-500">
              History
            </a>
          </Link>
          <Link href="#">
            <a className="mr-4 text-blue-500">
              Cross-Chain
            </a>
          </Link>
          <Link href="https://t.me/puppynft" target ="_blank">
            <a className="mr-4 text-blue-500">
              Community
            </a>
          </Link>
          <Link href="https://twitter.com/pupnifty" target ="_blank">
            <a className="mr-4 text-blue-500">
              Twitter
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
