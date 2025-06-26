import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="p-4 sm:p-6 border-t border-border bg-background text-center text-sm text-muted-foreground">
      <p>&copy; {new Date().getFullYear()} Project Dashboard. Discover and Innovate.</p>
    </footer>
  );
};