export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:block w-1/2">
        <div
          className="flex items-center justify-center bg-cover h-full"
          style={{
            backgroundImage: "url('/noise.png'), url('/background3.png')",
            backgroundBlendMode: "overlay",

            backgroundSize: "cover",
          }}
        >
          <h1 className="w-[70%] font-bold text-8xl text-center text-secondary leading-tight">
            Bringing Stories to Life Together
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-12 w-full lg:w-1/2 dark:bg-[url('/noise.png')] bg-cover">
        <div className="mx-auto grid gap-6 max-w-sm">{children}</div>
      </div>
    </div>
  );
}
