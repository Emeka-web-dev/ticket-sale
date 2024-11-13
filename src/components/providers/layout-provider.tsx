import { NavigationItems } from "../navigation";

type Props = {
  children: React.ReactNode;
};
export const LayoutProvider = ({ children }: Props) => {
  return (
    <main className="h-screen flex flex-col">
      <NavigationItems />
      <div>{children}</div>
    </main>
  );
};
