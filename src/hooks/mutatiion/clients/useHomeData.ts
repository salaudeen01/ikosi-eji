import { useHomeStore } from "@/store/clients/useHomeStore";
import { useQuery } from "@tanstack/react-query";
import { HomeResponse } from "../../../../type";
import { fetchHomeData } from "@/api/clients";
import { useEffect } from "react";

// export const useHomeData = () => {
//   const setHomeData = useHomeStore((state) => state.setHomeData);

//   return useQuery<HomeResponse>({
//     queryKey: ["homeData"],
//     queryFn: fetchHomeData,
//     staleTime: 60_000, // 1 minute
//     onSuccess: (data: HomeResponse) => {
//       setHomeData({
//         categories: data.categories,
//         breakingNews: data.breakingNews,
//         banners: data.banners,
//       });
//     },
//   });
// };
export const useHomeData = () => {
    const setHomeData = useHomeStore((state) => state.setHomeData);
  
    const query = useQuery<HomeResponse>({
      queryKey: ["homeData"],
      queryFn: fetchHomeData,
      staleTime: 60_000, // 1 min
    });
  
    useEffect(() => {
      if (query.data) {
        setHomeData({
          categories: query.data.categories,
          breakingNews: query.data.breakingNews,
          newsData: query.data.newsData,
          projects: query.data.projects,
          banners: query.data.banners,
        });
      }
    }, [query.data, setHomeData]);
  
    return query;
  };