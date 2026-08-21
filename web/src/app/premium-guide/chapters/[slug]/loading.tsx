export default function PremiumGuideChapterLoading() {
  return (
    <main aria-label="Opening chapter" className="min-h-screen bg-inverse-surface pt-20">
      <div className="mx-auto flex min-h-[76svh] max-w-7xl flex-col justify-end px-6 py-24 sm:px-10">
        <div className="h-3 w-28 animate-pulse rounded-sm bg-inverse/15" />
        <div className="mt-10 h-16 w-full max-w-4xl animate-pulse rounded-sm bg-inverse/15 sm:h-24" />
        <div className="mt-8 h-6 w-full max-w-2xl animate-pulse rounded-sm bg-inverse/15" />
      </div>
    </main>
  )
}
