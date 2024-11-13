import Logo from "../logo";

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-1">
      <Logo />
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
