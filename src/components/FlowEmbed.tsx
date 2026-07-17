"use client";

import { useEffect, useRef, useState } from "react";

const SCENE_WIDTH = 1105;
const SCENE_HEIGHT = 780;

export default function FlowEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => setScale(el.offsetWidth / SCENE_WIDTH);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden"
      style={{ height: SCENE_HEIGHT * scale }}
    >
      <iframe
        src="/capitare-flow.html"
        width={SCENE_WIDTH}
        height={SCENE_HEIGHT}
        title="Capitare flow animation"
        style={{
          border: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
