/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't auto-generate AGENTS.md / CLAUDE.md at the project root on `next dev`.
  // This project's instructions live in .claude/CLAUDE.md, so the generated
  // files were just confusing clutter.
  agentRules: false,

  // Security headers, applied to every page.
  // These are safe defaults - you shouldn't need to change them.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Stops other sites putting your app in a hidden frame
          // and tricking people into clicking things.
          { key: 'X-Frame-Options', value: 'DENY' },
          // Stops the browser guessing a file's type and running it as script.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Don't leak the full URL of your page to other sites you link to.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // Content-Security-Policy is left off on purpose. It's the strongest
          // protection here, but it has to be tuned to the exact scripts, fonts
          // and images your project loads - a wrong one silently breaks your app.
          // Uncomment and adjust when you're getting ready for real users.
          // {
          //   key: 'Content-Security-Policy',
          //   value: [
          //     "default-src 'self'",
          //     "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          //     "style-src 'self' 'unsafe-inline'",
          //     "img-src 'self' data: blob:",
          //     "font-src 'self' data:",
          //     "connect-src 'self'",
          //     "frame-ancestors 'none'",
          //   ].join('; '),
          // },
        ],
      },
    ]
  },
}

module.exports = nextConfig
