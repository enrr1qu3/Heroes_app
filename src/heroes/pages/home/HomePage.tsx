import { use, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
    Heart,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";


export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all', 'favorites', 'heroes', 'villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all'
    }, [activeTab]);

    const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)

    const { data: summary } = useHeroSummary();


    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title="Universo de SuperHéroes"
                    description="Descubre, explora y administra super héroes y villanos"
                />

                <CustomBreadcrumbs currenPage="Super Héroes" />
                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'all');
                            prev.set('category', 'all');
                            prev.set('page', '1');
                            return prev;
                        })} value="all">All Characters ({summary?.totalHeroes ?? 0})</TabsTrigger>
                        <TabsTrigger onClick={() => setSearchParams((prev) => { prev.set('tab', 'favorites'); return prev })} value="favorites" className="flex items-center gap-2">
                            <Heart className="h-4 w-4" />
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'heroes');
                            prev.set('category', 'hero');
                            prev.set('page', '1');
                            return prev;
                        })} value="heroes">Heroes ({summary?.totalHeroes ?? 0})</TabsTrigger>
                        <TabsTrigger onClick={() => setSearchParams((prev) => {
                            prev.set('tab', 'villains');
                            prev.set('category', 'villain');
                            prev.set('page', '1');
                            return prev;
                        })} value="villains">Villains ({summary?.villainCount ?? 0})</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all">
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="favorites">
                        {/* Mostrar todos los personajes favoritos */}
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value="heroes">
                        {/* Mostrar todos los personajes heroes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value="villains">
                        {/* Mostrar todos los personajes villanos */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>

                </Tabs>

                {/* Pagination */}
                {
                    selectedTab !== 'favorites' && <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
                }

            </>
        </>
    )
}