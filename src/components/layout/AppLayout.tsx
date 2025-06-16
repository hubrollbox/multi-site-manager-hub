
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </>
  );
};
