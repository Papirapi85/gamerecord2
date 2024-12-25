import { del } from '@vercel/blob';
import {NextResponse} from "next/server";

// https://youtu.be/kQfwNwpDiPQ 35:20
export const dynamic = 'force-dynamic';
export async function DELETE(request: Request, context : any) {
    const {params} = context;
    let { url } = params;

    url = decodeURIComponent(url);

    if (!url) {
        return NextResponse.json({ error: "URL doesn't exist" }, { status: 400 });
    }

    await del(url);
    return NextResponse.json({success: true});
}