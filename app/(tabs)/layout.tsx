import TabBar from "@/components/tab-bar";

export default function TabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white min-h-dvh pb-20">
      {children}
      <TabBar />
    </div>
  );
}
