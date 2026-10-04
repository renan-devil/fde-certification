import { Logos } from './Logos';

/** The ink band alone, for pages without navigation (password, exam runner). */
export function Band({ small = false, children }: { small?: boolean; children?: React.ReactNode }) {
  return (
    <header className="band bg-ink text-white">
      <div className={`mx-auto flex max-w-[960px] items-center justify-between gap-4 px-4 sm:px-6 ${small ? 'min-h-12 py-2' : 'min-h-16 py-3'}`}>
        <Logos small={small} />
        {children}
      </div>
    </header>
  );
}
