"use client";

import { Button } from "@/components/ui/button";
import { STORAGE_URL } from "@/utils/constants";
import { useState } from "react";

const GetAudioComponent = ({ filePath }: { filePath: string }) => {
  const [audio, setAudio] = useState("");

  const onSubmit = () => {
    if (!STORAGE_URL) {
      return;
    }

    const base = STORAGE_URL.replace(/\/$/, "");
    const path = filePath.replace(/^\//, "");
    setAudio(`${base}/${path}`);
  };

  return (
    <>
      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls>
            <track kind="captions" />
          </audio>
        </div>
      ) : (
        <Button className="h-5" disabled={!STORAGE_URL} onClick={onSubmit}>
          Get
        </Button>
      )}
    </>
  );
};

export default GetAudioComponent;
