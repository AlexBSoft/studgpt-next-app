export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-100 flex w-full h-full items-center py-16 dark:bg-neutral-800">
      {children}
    </section>
  );
}
