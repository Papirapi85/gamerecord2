import React from "react";
import {Dialog} from "@/components/ui";
import {DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {FileVideo} from "lucide-react";

interface Props {
    video: string
}

export const VideoYouTube: React.FC<Props> = ({video}) => {

    let text = video.replace("watch?v=", "embed/");

    return (
        <Dialog>
            <DialogTrigger><FileVideo /></DialogTrigger>
            <DialogContent className="max-w-fit">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <iframe src={text} width='1000' height='700' allowFullScreen/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )

}

