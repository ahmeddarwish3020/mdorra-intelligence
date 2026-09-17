'use client';

import type { ProjectVideo } from '@/content/projects/schema';

type ProjectVideoProps = {
  video: ProjectVideo;
  className?: string;
};

export function ProjectVideo({ video, className = '' }: ProjectVideoProps) {
  const poster = video.poster ?? video.src.replace(/\.mp4$/, '.jpg');

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <video
        src={video.src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-auto object-cover"
        aria-label={video.alt}
      />
    </div>
  );
}

export default ProjectVideo;