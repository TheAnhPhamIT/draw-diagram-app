import { useEffect, useState } from "react";
import { calcScale } from "../utils/helper";

export function useScaleUnit(ref: React.RefObject<SVGSVGElement>) {
  const [scaleUnit, setScaleUnit] = useState(1);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // if (!e.ctrlKey) return;
      e.preventDefault();
      setScaleUnit((prev) => calcScale(prev, e.deltaY));
    };
    ref.current?.addEventListener("wheel", onWheel);

    return () => ref.current?.removeEventListener("wheel", onWheel);
  }, [ref]);

  return scaleUnit;
}
