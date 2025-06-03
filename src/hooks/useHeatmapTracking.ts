
import { useEffect, useCallback, useRef } from 'react';
import { useConversionAnalytics } from './useConversionAnalytics';

interface HeatmapData {
  x: number;
  y: number;
  elementId?: string;
  elementClass?: string;
  timestamp: number;
  viewport: {
    width: number;
    height: number;
  };
  scroll: {
    x: number;
    y: number;
  };
}

interface ClickData extends HeatmapData {
  type: 'click';
  buttonText?: string;
  linkHref?: string;
}

interface HoverData extends HeatmapData {
  type: 'hover';
  duration: number;
}

export const useHeatmapTracking = () => {
  const { trackEvent } = useConversionAnalytics();
  const clickBuffer = useRef<ClickData[]>([]);
  const hoverBuffer = useRef<HoverData[]>([]);
  const hoverStart = useRef<number>(0);
  const lastHoveredElement = useRef<Element | null>(null);

  // Track clicks with detailed position data
  const trackClick = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    const rect = target.getBoundingClientRect();
    
    const clickData: ClickData = {
      type: 'click',
      x: event.clientX,
      y: event.clientY,
      elementId: target.id || undefined,
      elementClass: target.className || undefined,
      timestamp: Date.now(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      scroll: {
        x: window.scrollX,
        y: window.scrollY
      },
      buttonText: target.textContent?.trim().substring(0, 100) || undefined,
      linkHref: target.getAttribute('href') || undefined
    };

    clickBuffer.current.push(clickData);

    // Send click data immediately for critical elements
    if (target.matches('button, a, [role="button"]')) {
      trackEvent('heatmap_click', 'click', target.id || 'unknown', 'heatmap', {
        position: { x: clickData.x, y: clickData.y },
        element: {
          id: clickData.elementId,
          class: clickData.elementClass,
          text: clickData.buttonText
        },
        viewport: clickData.viewport,
        scroll: clickData.scroll
      });
    }
  }, [trackEvent]);

  // Track hover events
  const trackHover = useCallback((event: MouseEvent) => {
    const target = event.target as Element;
    
    if (lastHoveredElement.current !== target) {
      // End previous hover if exists
      if (lastHoveredElement.current && hoverStart.current) {
        const duration = Date.now() - hoverStart.current;
        if (duration > 500) { // Only track hovers longer than 500ms
          const hoverData: HoverData = {
            type: 'hover',
            x: event.clientX,
            y: event.clientY,
            elementId: lastHoveredElement.current.id || undefined,
            elementClass: lastHoveredElement.current.className || undefined,
            timestamp: hoverStart.current,
            duration,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight
            },
            scroll: {
              x: window.scrollX,
              y: window.scrollY
            }
          };

          hoverBuffer.current.push(hoverData);
        }
      }

      // Start new hover
      lastHoveredElement.current = target;
      hoverStart.current = Date.now();
    }
  }, []);

  // Batch send heatmap data
  const sendHeatmapData = useCallback(() => {
    if (clickBuffer.current.length > 0 || hoverBuffer.current.length > 0) {
      trackEvent('heatmap_batch', 'batch', 'page', 'heatmap', {
        clicks: clickBuffer.current.splice(0),
        hovers: hoverBuffer.current.splice(0),
        sessionId: sessionStorage.getItem('session_id') || 'unknown'
      });
    }
  }, [trackEvent]);

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('click', trackClick);
    document.addEventListener('mousemove', trackHover);

    // Send data periodically
    const interval = setInterval(sendHeatmapData, 30000); // Every 30 seconds

    // Send data on page unload
    const handleUnload = () => sendHeatmapData();
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      document.removeEventListener('click', trackClick);
      document.removeEventListener('mousemove', trackHover);
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
      sendHeatmapData(); // Send final batch
    };
  }, [trackClick, trackHover, sendHeatmapData]);

  return {
    sendHeatmapData,
    getClickData: () => [...clickBuffer.current],
    getHoverData: () => [...hoverBuffer.current]
  };
};
