import {
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (
  ref: MutableRefObject<HTMLDivElement | undefined>
) => {
  const [dimensions, setDimensions] =
    useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    const observeTarget = ref.current;

    if (observeTarget) {
      // チェックを追加
      const resizeObserver = new ResizeObserver(
        (entries) => {
          entries.forEach((entry) => {
            setDimensions(entry.contentRect);
          });
        }
      );
      resizeObserver.observe(observeTarget);

      return () => {
        resizeObserver.unobserve(observeTarget);
      };
    }
  }, [ref]);

  return dimensions;
};

export default useResizeObserver;
