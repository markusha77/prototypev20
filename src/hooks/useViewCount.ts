import { useState, useEffect } from 'react';
import { 
  getProjectViewCount, 
  recordProjectView 
} from '../utils/viewCountUtils';

/**
 * Hook to manage project view counts
 * @param projectId - The ID of the project
 * @param initialCount - Optional initial count to use
 * @param trackView - Whether to automatically track a view when the hook is used
 */
export const useViewCount = (
  projectId: string, 
  initialCount?: number,
  trackView: boolean = true
) => {
  const [viewCount, setViewCount] = useState<number>(
    initialCount !== undefined ? initialCount : getProjectViewCount(projectId)
  );

  useEffect(() => {
    // If we should track the view, record it
    if (trackView) {
      const newCount = recordProjectView(projectId);
      if (newCount !== null) {
        setViewCount(newCount);
      }
    }
  }, [projectId, trackView]);

  return viewCount;
};

export default useViewCount;
