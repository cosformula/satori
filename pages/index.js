import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <h1>Satori</h1>
      <ul>
        <li>
          <Link href='/test'>
            <a>test page</a>
          </Link>
        </li>
        <li>
          <Link href='/rauchg'>
            <a>rauchg</a>
          </Link>
          &nbsp;(
          <a href='/api/rauchg?title=there%20is%20no%20puppeteer%20behind%20this'>
            png
          </a>
          )
        </li>
        <li>
          <Link href='/vercel'>
            <a>vercel</a>
          </Link>
        </li>
        <li>
          <Link href='/conf'>
            <a>conf</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
        div {
          font-family: SF Mono, SFMono-Regular, ui-monospace, Menlo, Consolas,
            monospace;
          line-height: 1.5;
        }
        a {
          color: black;
        }
        ul {
          padding-left: 1.5em;
          list-style: '* ';
        }
      `}</style>
    </div>
  )
}
