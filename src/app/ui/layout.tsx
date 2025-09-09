
export default function UiLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </main>
  );
}

