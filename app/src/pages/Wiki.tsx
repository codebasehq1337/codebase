import { useMemo, useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import { wikiArticles, wikiCategories } from '../data/wiki'

export default function Wiki() {
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState(wikiArticles[0].id)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return wikiArticles
    return wikiArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    )
  }, [query])

  const article = wikiArticles.find((a) => a.id === activeId) ?? wikiArticles[0]
  const articleIndex = wikiArticles.indexOf(article)
  const prev = wikiArticles[articleIndex - 1]
  const next = wikiArticles[articleIndex + 1]

  const open = (id: string) => {
    setActiveId(id)
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">Wiki</p>
          <h1 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">The knowledge base</h1>
          <p className="mt-3 max-w-lg text-zinc-400">
            Concepts that apply to every language: data structures, algorithms, systems and tools.
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-64 rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-white/40"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          {query ? (
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-zinc-600">
                {filtered.length} result{filtered.length === 1 ? '' : 's'}
              </p>
              <div className="flex flex-col gap-1">
                {filtered.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => open(a.id)}
                    className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      a.id === article.id ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                    }`}
                  >
                    {a.title}
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="px-3 py-2 text-sm text-zinc-600">Nothing matches that search.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {wikiCategories.map((cat) => (
                <div key={cat}>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-zinc-600">{cat}</p>
                  <div className="flex flex-col gap-1">
                    {wikiArticles
                      .filter((a) => a.category === cat)
                      .map((a) => (
                        <button
                          key={a.id}
                          onClick={() => open(a.id)}
                          className={`flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            a.id === article.id
                              ? 'bg-white/10 text-white'
                              : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                          }`}
                        >
                          {a.title}
                          <span className="font-mono text-[10px] text-zinc-700">{a.minutes}m</span>
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        <article>
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-zinc-500">
              <span className="text-sky-400">{article.category}</span>
              <span>·</span>
              <span>{article.minutes} min read</span>
            </div>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{article.title}</h2>
            <p className="mt-3 border-l-2 border-white/15 pl-4 text-zinc-400">{article.summary}</p>
            <div className="mt-6 space-y-4 leading-relaxed text-zinc-300">
              {article.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {article.code && (
              <CodeBlock code={article.code} filename={article.filename ?? 'example'} className="mt-6" />
            )}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
              {prev ? (
                <button
                  onClick={() => open(prev.id)}
                  className="max-w-[45%] truncate rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  ← {prev.title}
                </button>
              ) : (
                <span />
              )}
              {next ? (
                <button
                  onClick={() => open(next.id)}
                  className="max-w-[45%] truncate rounded-full border border-white/15 px-5 py-2 text-sm text-zinc-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  {next.title} →
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
