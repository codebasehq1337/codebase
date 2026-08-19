import { useEffect, useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { languages } from '../data/languages'

const STORAGE_KEY = 'codebase-progress'

function loadProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

interface Props {
  initialLanguage?: string
}

export default function Learn({ initialLanguage }: Props) {
  const [langId, setLangId] = useState(initialLanguage ?? 'python')
  const [lessonId, setLessonId] = useState<string | null>(null)
  const [progress, setProgress] = useState<Record<string, boolean>>(loadProgress)

  const lang = languages.find((l) => l.id === langId) ?? languages[0]
  const lesson = lang.lessons.find((l) => l.id === lessonId) ?? lang.lessons[0]
  const lessonIndex = lang.lessons.indexOf(lesson)

  const totals = useMemo(() => {
    const all = languages.flatMap((l) => l.lessons)
    const done = all.filter((l) => progress[l.id]).length
    return { all: all.length, done }
  }, [progress])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const selectLanguage = (id: string) => {
    setLangId(id)
    setLessonId(null)
    window.scrollTo({ top: 0 })
  }

  const markDone = () => {
    setProgress((p) => ({ ...p, [lesson.id]: true }))
    const next = lang.lessons[lessonIndex + 1]
    if (next) {
      setLessonId(next.id)
      window.scrollTo({ top: 0 })
    }
  }

  const isDone = !!progress[lesson.id]

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Learn</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">The curriculum</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${totals.all ? (totals.done / totals.all) * 100 : 0}%` }}
            />
          </div>
          <span className="font-mono text-xs text-zinc-500">
            {totals.done}/{totals.all} lessons
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-zinc-600">Language</p>
            <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
              {languages.map((l) => (
                <button
                  key={l.id}
                  onClick={() => selectLanguage(l.id)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    l.id === lang.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono text-[11px]" style={{ color: l.color }}>
                    {l.glyph}
                  </span>
                  {l.name}
                  <span className="ml-auto font-mono text-[10px] text-zinc-600">
                    {l.lessons.filter((x) => progress[x.id]).length}/{l.lessons.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-zinc-600">Lessons</p>
            <div className="flex flex-col gap-1">
              {lang.lessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => {
                    setLessonId(l.id)
                    window.scrollTo({ top: 0 })
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    l.id === lesson.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border text-[9px] ${
                      progress[l.id] ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-zinc-700 text-zinc-600'
                    }`}
                  >
                    {progress[l.id] ? '✓' : i + 1}
                  </span>
                  {l.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <article>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-zinc-500">
              <span style={{ color: lang.color }}>{lang.name}</span>
              <span>·</span>
              <span>lesson {lessonIndex + 1} of {lang.lessons.length}</span>
              <span>·</span>
              <span>{lesson.minutes} min</span>
              {isDone && <span className="text-emerald-400">completed</span>}
            </div>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{lesson.title}</h2>
            <p className="mt-4 leading-relaxed text-zinc-400">{lesson.intro}</p>
            <CodeBlock code={lesson.code} filename={lesson.filename} className="mt-6" />
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-600">Key takeaways</p>
              <ul className="mt-4 space-y-2.5">
                {lesson.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
              <button
                onClick={() => lessonIndex > 0 && setLessonId(lang.lessons[lessonIndex - 1].id)}
                disabled={lessonIndex === 0}
                className="rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                ← Previous
              </button>
              {isDone ? (
                lessonIndex < lang.lessons.length - 1 ? (
                  <button
                    onClick={() => {
                      setLessonId(lang.lessons[lessonIndex + 1].id)
                      window.scrollTo({ top: 0 })
                    }}
                    className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                  >
                    Next lesson →
                  </button>
                ) : (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-5 py-2 text-sm text-emerald-300">
                    Track complete
                  </span>
                )
              ) : (
                <button
                  onClick={markDone}
                  className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  Mark complete{lessonIndex < lang.lessons.length - 1 ? ' & continue' : ''}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: lang.color }}>
                {lang.glyph}
              </span>
              <h3 className="text-lg font-medium">About {lang.name}</h3>
              <span className="ml-auto rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-500">
                {lang.level}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{lang.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {lang.usedFor.map((u) => (
                <span key={u} className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                  {u}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
