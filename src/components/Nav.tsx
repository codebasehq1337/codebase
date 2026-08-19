import { useEffect, useState } from 'react'

type View = 'home' | 'learn' | 'wiki'

interface Props {
  view: View
  onNavigate: (view: View) => void
}

export default function Nav({ view, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const link = (v: View, label: string) => (
    <button
      onClick={() => onNavigate(v)}
      className={`transition-colors hover:text-white ${view === v ? 'text-white' : ''}`}
    >
      {label}
    </button>
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/10 bg-black/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-white"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-white/20 font-mono text-[11px] text-white">
            &gt;_
          </span>
          codebase
        </button>
        <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          {link('home', 'Overview')}
          {link('learn', 'Learn')}
          {link('wiki', 'Wiki')}
          <a href="#languages" onClick={() => view !== 'home' && onNavigate('home')} className="transition-colors hover:text-white">
            Languages
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white sm:flex"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            GitHub
          </a>
          <button
            onClick={() => onNavigate('learn')}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Start learning
          </button>
        </div>
      </div>
    </header>
  )
}
