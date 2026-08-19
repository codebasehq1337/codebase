import { useState } from 'react'

const KEYWORDS = new Set([
  'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
  'import', 'from', 'include', 'int', 'float', 'char', 'void', 'struct', 'auto',
  'const', 'let', 'var', 'fn', 'mut', 'pub', 'impl', 'match', 'use', 'package',
  'func', 'go', 'chan', 'range', 'type', 'interface', 'class', 'public', 'private',
  'override', 'new', 'using', 'namespace', 'static', 'async', 'await', 'string',
  'double', 'bool', 'true', 'false', 'True', 'False', 'None', 'nil', 'null',
  'record', 'get', 'set', 'extends', 'as', 'of', 'lambda', 'with', 'is',
  'case', 'switch', 'break', 'continue', 'do', 'try', 'except', 'catch', 'throw',
  'this', 'base', 'readonly', 'enum', 'where', 'select', 'loop', 'ref',
])

const TOKEN_RE =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|f"(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?f?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)|(#include[^\n]*)/g

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function highlight(code: string): string {
  const tokens: { start: number; end: number; cls: string }[] = []
  let m: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((m = TOKEN_RE.exec(code)) !== null) {
    let cls = ''
    if (m[1]) cls = 'text-emerald-300'
    else if (m[2]) cls = 'text-orange-300'
    else if (m[3] && KEYWORDS.has(m[0])) cls = 'text-violet-300'
    else if (m[4]) cls = 'text-sky-300'
    if (cls) tokens.push({ start: m.index, end: m.index + m[0].length, cls })
  }
  let html = ''
  let cursor = 0
  for (const t of tokens) {
    html += esc(code.slice(cursor, t.start))
    html += `<span class="${t.cls}">${esc(code.slice(t.start, t.end))}</span>`
    cursor = t.end
  }
  return html + esc(code.slice(cursor))
}

interface Props {
  code: string
  filename?: string
  className?: string
}

export default function CodeBlock({ code, filename = 'main', className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className={`overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3f3f46]" />
        <span className="ml-3 font-mono text-xs text-zinc-500">{filename}</span>
        <button
          onClick={copy}
          className="ml-auto rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-zinc-400 transition-colors hover:border-white/25 hover:text-zinc-200"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <div className="flex overflow-x-auto p-4 text-[13px] leading-6">
        <div className="select-none pr-4 text-right font-mono text-zinc-700">
          {code.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="font-mono text-zinc-200" dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </div>
    </div>
  )
}
