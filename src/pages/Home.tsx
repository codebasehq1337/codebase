import { Suspense, lazy, useRef, useState } from 'react'
import CodeBlock from '../components/CodeBlock'

const HeroScene = lazy(() => import('../components/HeroScene'))
import { languages } from '../data/languages'
import { wikiArticles } from '../data/wiki'

interface Props {
  onStartLearning: (languageId?: string) => void
  onOpenWiki: () => void
}

const features = [
  {
    title: 'Read real code first',
    body: 'Every concept is taught through complete, runnable programs. No pseudo-code, no hand-waving, just the exact syntax you will type in the editor.',
    icon: '{ }',
  },
  {
    title: 'From zero to systems',
    body: 'Start with Python or JavaScript, then move down the stack to C, C++ and Rust when you are ready to understand memory and performance.',
    icon: '==>',
  },
  {
    title: 'Progress that persists',
    body: 'Mark lessons complete as you go. Your progress is saved in the browser so you can pick up exactly where you left off.',
    icon: '[x]',
  },
  {
    title: 'One mental model',
    body: 'The same ideas, variables, control flow, data structures and functions, shown side by side in eight languages so the patterns click.',
    icon: '<~>',
  },
  {
    title: 'Copy and run anything',
    body: 'Every snippet has a one-click copy button. Paste it into your editor, compiler or playground and watch it work.',
    icon: '::',
  },
  {
    title: 'No setup required',
    body: 'Read the lessons here, then run the code on any online compiler. Install a toolchain only when a project demands it.',
    icon: '( )',
  },
]

const steps = [
  { n: '01', title: 'Pick a first language', body: 'Python for readability, JavaScript for the web, Go for servers. One is enough to start.' },
  { n: '02', title: 'Work through the lessons', body: 'Short lessons, real programs, key takeaways after each one. Type the code out yourself.' },
  { n: '03', title: 'Build something small', body: 'A CLI tool, a scraper, a tiny game. Finishing one project teaches more than ten tutorials.' },
  { n: '04', title: 'Add a second language', body: 'Compare how C or Rust express what you already know. The second language is always easier.' },
]

export default function Home({ onStartLearning, onOpenWiki }: Props) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = tiltRef.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 12 })
  }

  return (
    <div className="bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px]" />
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              8 languages · 45 lessons · 18 wiki articles · free forever
            </div>
            <h1 className="text-balance text-5xl font-medium tracking-tighter sm:text-6xl md:text-7xl">
              Learn to code,
              <br />
              <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                language by language.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-zinc-400">
              Codebase teaches programming the way engineers actually learn it: real code, short lessons, and the same ideas across Python, C, C++, C# and more.
            </p>
            <div className="mt-9 flex items-center justify-center gap-3">
              <button
                onClick={() => onStartLearning()}
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Start learning
              </button>
              <button
                onClick={() => onStartLearning('python')}
                className="rounded-full border border-white/15 px-6 py-2.5 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
              >
                Try Python first
              </button>
            </div>
          </div>
          <div
            ref={tiltRef}
            onMouseMove={onTiltMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative mx-auto mt-20 max-w-2xl [perspective:1200px]"
          >
            <div className="pointer-events-none absolute -inset-x-8 -top-8 h-40 bg-gradient-to-b from-blue-500/10 to-transparent blur-2xl" />
            <div
              className="transition-transform duration-200 ease-out will-change-transform"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              <CodeBlock code={languages[0].heroCode} filename="hello.py" />
            </div>
          </div>
        </div>
      </section>

      <section id="languages" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Languages</p>
          <h2 className="mt-3 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
            One curriculum, eight runtimes.
          </h2>
          <p className="mt-4 max-w-xl text-zinc-400">
            Each track covers fundamentals through complete programs, with the key ideas called out after every lesson.
          </p>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onStartLearning(lang.id)}
                className="group relative bg-black p-6 text-left transition-colors hover:bg-zinc-950"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 font-mono text-sm"
                  style={{ color: lang.color }}
                >
                  {lang.glyph}
                </div>
                <div className="mt-5 text-lg font-medium">{lang.name}</div>
                <div className="mt-1 text-sm text-zinc-500">{lang.tagline}</div>
                <div className="mt-4 font-mono text-[11px] text-zinc-600">
                  {lang.lessons.length} lessons · {lang.level.toLowerCase()}
                </div>
                <span className="absolute right-5 top-6 text-zinc-700 transition-all group-hover:translate-x-1 group-hover:text-zinc-300">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Why it works</p>
          <h2 className="mt-3 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
            Built for people who learn by reading code.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-black p-7">
                <div className="font-mono text-sm text-zinc-500">{f.icon}</div>
                <h3 className="mt-4 font-medium">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="path" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Roadmap</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                From first print statement to polyglot.
              </h2>
              <p className="mt-4 text-zinc-400">
                A simple path that has worked for generations of self-taught engineers. No gates, no certificates, just momentum.
              </p>
              <button
                onClick={() => onStartLearning()}
                className="mt-8 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Begin step 01
              </button>
            </div>
            <div className="space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-6 bg-black p-6">
                  <span className="font-mono text-sm text-zinc-600">{s.n}</span>
                  <div>
                    <h3 className="font-medium">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Wiki</p>
              <h2 className="mt-3 max-w-lg text-3xl font-medium tracking-tight sm:text-4xl">
                The concepts behind every language.
              </h2>
            </div>
            <button
              onClick={onOpenWiki}
              className="rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
            >
              Browse all {wikiArticles.length} articles →
            </button>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {wikiArticles.slice(0, 6).map((a) => (
              <button key={a.id} onClick={onOpenWiki} className="group bg-black p-7 text-left transition-colors hover:bg-zinc-950">
                <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-600">{a.category}</div>
                <h3 className="mt-3 font-medium group-hover:text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{a.summary}</p>
                <span className="mt-4 inline-block font-mono text-[11px] text-zinc-600">{a.minutes} min read</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="relative mx-auto max-w-6xl px-6 py-28 text-center">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-medium tracking-tighter sm:text-5xl">
            The best time to start was yesterday.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            The second best time is after you close this tab and open the first lesson.
          </p>
          <button
            onClick={() => onStartLearning()}
            className="mt-9 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Start learning now
          </button>
        </div>
      </section>
    </div>
  )
}
