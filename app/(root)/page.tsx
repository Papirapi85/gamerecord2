import {Container} from '@/components/container';
import {TopBar} from "@/components/top-bar";
import GameRecords_SERVER from "@/components/gameRecords_SERVER";

export const dynamic = 'force-dynamic'
export default async function Home({ searchParams }: { searchParams: Promise<{ page: string }> }) {
    const resolvedSearchParams = await searchParams; // Ждём Promise
    const page = parseInt(resolvedSearchParams.page ?? '1', 30);
    return (
        <div>
            <Container className="mt-10 pb-14">
                <GameRecords_SERVER page={page} />
            </Container>
        </div>
    );
}
