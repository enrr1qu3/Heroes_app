import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { searchHeroesAction } from "@/heroes/actions/search-hero.action";

export const SearchPage = () => {

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;
  // const name = searchParams.get('name') ?? undefined;

  // TODO: useQuery
  const { data: heroes = [] } = useQuery({
    queryKey: ['heroes', 'search', { name, strength }],
    queryFn: () => searchHeroesAction({ name, strength }),
    staleTime: 1000 * 60 * 5 //5 minutos
  })

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      {/*  */}
      <CustomBreadcrumbs currenPage="Buscador de héroes"
      // breadcrumbs={[
      //   { label: 'Home', to: '/' },
      //   { label: 'Home2', to: '/' },
      //   { label: 'Home3', to: '/' },
      // ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Controls */}
      <SearchControls />
      {/*  */}
      <HeroGrid heroes={heroes} />
    </>
  )
}

export default SearchPage;