import { useQuery } from "@tanstack/react-query";
import { getHero } from "../actions/get-heroes.action";

export const useHeroProfile = (idSlug: string) => {
    return useQuery({
        queryKey: ['heroes', idSlug],
        queryFn: () => getHero(idSlug),
        // staleTime: 1000 * 60 * 5
        retry: false
    });
}