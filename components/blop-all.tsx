"use client"
import {useEffect} from "react";
import {DeleteButton} from "@/components/deleteButton";
import Image from "next/image";
import {ListBlobResult} from "@vercel/blob";

export function BlopAll({blops}: { blops: ListBlobResult }) {


    // useEffect(()=>{
    //
    //
    // },[blops])

    return (
        <div>

            {/*<div className="flex-1">*/}
            {/*    <div className="flex flex-col gap-16">*/}
            {/*        {blops.blobs.map((blop, i) => (*/}
            {/*            <div key={blop.pathname + i}>*/}
            {/*                <a href={blop.url} target="_blank">*/}
            {/*                    <Image*/}
            {/*                        src={blop.url}*/}
            {/*                        alt={blop.pathname}*/}
            {/*                        width={700}*/}
            {/*                        height={500}*/}
            {/*                    />*/}
            {/*                </a>*/}

            {/*                <DeleteButton url={blop.url}/>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}