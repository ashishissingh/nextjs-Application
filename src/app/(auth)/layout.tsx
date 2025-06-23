
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-4xl">
        {children}
      </div>
      <footer className="py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Axcess.io. All rights reserved.
      </footer>
    </div>
  );
}

