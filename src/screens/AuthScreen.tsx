import { useNavigate } from 'react-router-dom'

export default function AuthScreen() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen warm-gradient flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Decorative mandala SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <ellipse cx="200" cy="120" rx="18" ry="70" fill="none" stroke="#c17b45" strokeWidth="1" />
          </g>
        ))}
        {[0, 45, 90, 135].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 200 200)`}>
            <ellipse cx="200" cy="200" rx="80" ry="80" fill="none" stroke="#c17b45" strokeWidth="0.8" />
          </g>
        ))}
        <circle cx="200" cy="200" r="12" fill="none" stroke="#c17b45" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="4" fill="#c17b45" opacity="0.4" />
        {[60, 120, 180, 240, 300, 360].map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x = 200 + 100 * Math.cos(rad)
          const y = 200 + 100 * Math.sin(rad)
          return <circle key={deg} cx={x} cy={y} r="6" fill="none" stroke="#c17b45" strokeWidth="1" />
        })}
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center max-w-sm w-full">
        {/* Logo lotus */}
        <div className="mb-6 flex justify-center">
          <svg viewBox="0 0 64 64" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 52 C20 40 8 32 12 20 C16 10 28 8 32 16 C36 8 48 10 52 20 C56 32 44 40 32 52Z" fill="rgba(193,123,69,0.7)" />
            <path d="M32 52 C32 38 24 28 20 20 C26 14 32 16 32 24Z" fill="rgba(193,123,69,0.4)" />
            <path d="M32 52 C32 38 40 28 44 20 C38 14 32 16 32 24Z" fill="rgba(193,123,69,0.4)" />
            <path d="M32 52 C28 44 16 40 14 34 C18 26 26 28 32 38Z" fill="rgba(255,255,255,0.3)" />
            <path d="M32 52 C36 44 48 40 50 34 C46 26 38 28 32 38Z" fill="rgba(255,255,255,0.3)" />
            <circle cx="32" cy="22" r="4" fill="rgba(255,255,255,0.8)" />
          </svg>
        </div>

        <h1 className="font-playfair text-4xl font-bold text-amber-900 mb-3 leading-tight">
          Your Inner Map
        </h1>
        <p className="font-inter text-amber-800/70 text-base mb-12 leading-relaxed">
          Know your design.<br />Live your experiment.
        </p>

        <button
          onClick={() => navigate('/home')}
          className="w-full flex items-center justify-center gap-3 bg-white/90 hover:bg-white text-amber-900 font-inter font-medium text-base rounded-full px-6 py-4 shadow-lg shadow-amber-900/10 transition-all duration-200 hover:shadow-xl hover:shadow-amber-900/15 active:scale-[0.98]"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-8 font-inter text-xs text-amber-800/40 leading-relaxed">
          By continuing, you agree to our Terms of Service<br />and Privacy Policy
        </p>
      </div>
    </div>
  )
}
