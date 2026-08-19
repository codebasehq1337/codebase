import { useState } from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Wiki from './pages/Wiki'
import './data/extra-lessons'

type View = 'home' | 'learn' | 'wiki'

export default function App() {
  const [view, setView] = useState<View>('home')
  const [learnLang, setLearnLang] = useState<string | undefined>(undefined)

  const startLearning = (lang?: string) => {
    setLearnLang(lang)
    setView('learn')
    window.scrollTo({ top: 0 })
  }

  const navigate = (v: View) => {
    if (v === 'learn') setLearnLang(undefined)
    setView(v)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <Nav view={view} onNavigate={navigate} />
      {view === 'home' && <Home onStartLearning={startLearning} onOpenWiki={() => navigate('wiki')} />}
      {view === 'learn' && <Learn key={learnLang} initialLanguage={learnLang} />}
      {view === 'wiki' && <Wiki />}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <div className="flex items-center gap-2.5 text-sm text-zinc-400">
            <span className="flex h-5 w-5 items-center justify-center rounded border border-white/20 font-mono text-[9px] text-zinc-400">
              &gt;_
            </span>
            codebase · learn to program
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <button onClick={() => navigate('learn')} className="transition-colors hover:text-white">
              Curriculum
            </button>
            <button onClick={() => navigate('wiki')} className="transition-colors hover:text-white">
              Wiki
            </button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
              GitHub
            </a>
            <span className="font-mono text-xs text-zinc-700">MIT licensed</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
