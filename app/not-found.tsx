import Link from 'next/link'
import { Button } from '@/components/ui/button'
 
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center p-4 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 glass-panel p-8 md:p-12 rounded-3xl max-w-lg mx-auto shadow-2xl border border-white/10">
            <div className="mb-6 flex justify-center">
                <div className="gradient-brand flex size-16 items-center justify-center rounded-2xl font-bold text-white text-2xl shadow-lg shadow-brand-500/20">
                    QF
                </div>
            </div>
            
            <h1 className="heading-1 mb-2">Page Not Found</h1>
            <h2 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-brand-600 to-brand-900 dark:from-white dark:to-white/20 mb-6 font-display leading-none">
                404
            </h2>
            
            <p className="body-base text-muted-foreground mb-8 text-balance">
                Oops! The quantum realm seems to have swallowed this page. It might have been moved, deleted, or never existed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="shadow-lg shadow-brand-500/20">
                    <Link href="/dashboard">
                        Return to Dashboard
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                    <Link href="/">
                        Go Home
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}
