interface Props {
  title: string;
  children?: React.ReactNode;
}

export const SectionHeader = ({ title, children }: Props) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <h2 className="scroll-m-20 text-lg font-semibold tracking-tight text-gray-900">{title}</h2>

      {children}
    </div>
  );
};
