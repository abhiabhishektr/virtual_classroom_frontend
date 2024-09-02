import { useQuery } from '@tanstack/react-query';

export const useApiQuery = <T, ErrorType = Error>(
  apiFunction: () => Promise<T>,
  queryKey: string[],
  options?: {
    staleTime?: number;
  }
) => {
  return useQuery<T, ErrorType>({
    queryKey,
    queryFn: apiFunction,
    staleTime: options?.staleTime || 5 * 60 * 1000, // Default staleTime to 5 minutes
  });
};


// using useApiQuery
//     const { data: purchaseHistory, error, isLoading } = useApiQuery<Purchase[]>(
//       coursesPurchased,
//       ['purchaseHistory'],
//       { staleTime: 10 * 60 * 1000 } // Override default to 10 minutes
//     );
  


// Aditional Options

// import { useQuery } from '@tanstack/react-query';

// export const useApiQuery = <T, ErrorType = Error>(
//   apiFunction: () => Promise<T>,
//   queryKey: string[],
//   options?: {
//     staleTime?: number;
//     cacheTime?: number;
//     enabled?: boolean;
//     refetchOnWindowFocus?: boolean;
//     refetchInterval?: number;
//     refetchIntervalInBackground?: boolean;
//     onError?: (error: ErrorType) => void;
//     onSuccess?: (data: T) => void;
//   }
// ) => {
//   return useQuery<T, ErrorType>({
//     queryKey,
//     queryFn: apiFunction,
//     staleTime: options?.staleTime || 5 * 60 * 1000, // Default staleTime to 5 minutes
//     cacheTime: options?.cacheTime,
//     enabled: options?.enabled,
//     refetchOnWindowFocus: options?.refetchOnWindowFocus,
//     refetchInterval: options?.refetchInterval,
//     refetchIntervalInBackground: options?.refetchIntervalInBackground,
//     onError: options?.onError,
//     onSuccess: options?.onSuccess,
//   });
// };