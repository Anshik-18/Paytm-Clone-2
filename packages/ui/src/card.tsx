export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border border-slate-100 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h1 className="text-xl font-semibold border-b border-slate-100 pb-3 mb-4 text-slate-800">
        {title}
      </h1>
      <div className="text-slate-600">
        {children}
      </div>
    </div>
  );
}