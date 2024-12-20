import {Container} from '@/components/container';
import {TopBar} from "@/components/top-bar";
import GameRecords_SERVER from "@/components/gameRecords_SERVER";
export const dynamic = 'force-dynamic'
export default async function Home() {

    return (
        <div>
            <TopBar />

            <Container className="mt-10 pb-14">
                <GameRecords_SERVER/>
            </Container>
        </div>
    );
}
