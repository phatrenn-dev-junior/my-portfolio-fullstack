function DevCharacter() {
  return (
    <svg viewBox="0 0 120 128" className="w-full h-auto block">
      {/* rising symbols */}
      <text className="dev-pop" x="6" y="76" fontSize="11" fontFamily="monospace" fill="#38bdf8">
        {'</>'}
      </text>
      <text className="dev-pop" x="92" y="74" fontSize="11" fontFamily="monospace" fill="#a78bfa" style={{ animationDelay: '1s' }}>
        {'{ }'}
      </text>
      <text className="dev-pop" x="100" y="48" fontSize="12" fill="#f472b6" style={{ animationDelay: '2s' }}>
        ♪
      </text>

      {/* torso (hoodie) */}
      <rect x="38" y="64" width="44" height="52" rx="16" fill="#0ea5e9" />

      {/* head */}
      <g className="dev-bob">
        <circle cx="60" cy="46" r="18" fill="#f5c9a0" />
        <circle className="dev-glow" cx="60" cy="48" r="17" fill="#38bdf8" opacity="0.1" />
        {/* hair */}
        <path d="M41 46 Q39 25 60 25 Q81 25 79 46 Q72 35 60 36 Q48 35 41 46Z" fill="#1e293b" />
        {/* headphones */}
        <path d="M40 44 Q40 22 60 22 Q80 22 80 44" fill="none" stroke="#f472b6" strokeWidth="3.5" />
        <rect x="36" y="40" width="7" height="13" rx="3.5" fill="#f472b6" />
        <rect x="77" y="40" width="7" height="13" rx="3.5" fill="#f472b6" />
        {/* glasses */}
        <circle cx="52" cy="49" r="6" fill="#38bdf8" fillOpacity="0.2" stroke="#1e293b" strokeWidth="1.5" />
        <circle cx="68" cy="49" r="6" fill="#38bdf8" fillOpacity="0.2" stroke="#1e293b" strokeWidth="1.5" />
        <line x1="58" y1="49" x2="62" y2="49" stroke="#1e293b" strokeWidth="1.5" />
        {/* eyes */}
        <ellipse className="dev-eye" cx="53" cy="50" rx="1.6" ry="2.2" fill="#1e293b" />
        <ellipse className="dev-eye" cx="69" cy="50" rx="1.6" ry="2.2" fill="#1e293b" />
        {/* smile */}
        <path d="M54 59 Q60 64 66 59" fill="none" stroke="#9a3412" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* crossed legs + sneakers */}
      <path
        d="M16 122 Q16 108 38 106 L82 106 Q104 108 104 122 Q104 126 98 126 L22 126 Q16 126 16 122Z"
        fill="#1e3a8a"
      />
      <ellipse cx="46" cy="122" rx="11" ry="4" fill="#f8fafc" />
      <ellipse cx="74" cy="122" rx="11" ry="4" fill="#f8fafc" />

      {/* laptop base + lid (back faces the viewer) */}
      <rect x="24" y="101" width="72" height="5" rx="2.5" fill="#94a3b8" />
      <rect x="30" y="74" width="60" height="28" rx="4" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
      <text x="60" y="92" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle" fill="#0369a1">
        {'</>'}
      </text>

      {/* arms + hands typing */}
      <g className="dev-type-left">
        <path d="M40 70 Q16 84 29 102" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="29" cy="103" r="4.5" fill="#f5c9a0" />
      </g>
      <g className="dev-type-right">
        <path d="M80 70 Q104 84 91 102" stroke="#0369a1" strokeWidth="8" strokeLinecap="round" fill="none" />
        <circle cx="91" cy="103" r="4.5" fill="#f5c9a0" />
      </g>
    </svg>
  )
}

export default DevCharacter