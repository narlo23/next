'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    /* react-query 사용을 위한 provider */
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
