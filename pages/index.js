import Link from 'next/link'

export default function Page() {
  return (
    <div>
      <ul>
        <li>
          <Link href='/test'>
            <a>Test page</a>
          </Link>
        </li>
        <li>
          <Link href='/rauchg'>
            <a>rauchg</a>
          </Link>
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
    </div>
  )
}
