
'use client';

import { useState, useEffect } from 'react';

interface ClientRenderedDateProps {
  dateString: string | null | undefined;
  fallback?: React.ReactNode;
}

export function ClientRenderedDate({ dateString, fallback = 'N/A' }: ClientRenderedDateProps) {
  const [mounted, setMounted] = useState(false);
  const [formattedDate, setFormattedDate] = useState<string | React.ReactNode>(fallback);

  useEffect(() => {
    setMounted(true);
    if (dateString) {
      setFormattedDate(new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }));
    } else {
      setFormattedDate(fallback);
    }
  }, [dateString, fallback]);

  if (!mounted) {
    return <>{fallback}</>; // Render fallback on server and initial client render
  }

  return <>{formattedDate}</>;
}
