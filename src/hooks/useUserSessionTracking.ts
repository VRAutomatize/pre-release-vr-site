
import { useCallback, useEffect, useState } from 'react';

export const useUserSessionTracking = () => {
  const [isReturningUser, setIsReturningUser] = useState<boolean>(false);

  const checkReturningUser = useCallback(() => {
    const visitKey = 'vr_user_visits';
    const firstVisitKey = 'vr_first_visit';
    
    try {
      const visitData = localStorage.getItem(visitKey);
      const firstVisit = localStorage.getItem(firstVisitKey);
      
      if (!firstVisit) {
        // First time visitor
        localStorage.setItem(firstVisitKey, Date.now().toString());
        localStorage.setItem(visitKey, JSON.stringify({
          count: 1,
          lastVisit: Date.now(),
          sessions: [Date.now()]
        }));
        setIsReturningUser(false);
      } else {
        // Returning visitor
        const visits = visitData ? JSON.parse(visitData) : { count: 0, sessions: [] };
        visits.count += 1;
        visits.lastVisit = Date.now();
        visits.sessions.push(Date.now());
        
        localStorage.setItem(visitKey, JSON.stringify(visits));
        setIsReturningUser(visits.count > 1);
      }
    } catch (error) {
      console.warn('Error tracking user session:', error);
      setIsReturningUser(false);
    }
  }, []);

  const getUserSessionData = useCallback(() => {
    try {
      const visitData = localStorage.getItem('vr_user_visits');
      const firstVisit = localStorage.getItem('vr_first_visit');
      
      if (visitData && firstVisit) {
        const visits = JSON.parse(visitData);
        return {
          is_returning_user: isReturningUser,
          visit_count: visits.count,
          first_visit: new Date(parseInt(firstVisit)),
          last_visit: new Date(visits.lastVisit),
          days_since_first_visit: Math.floor((Date.now() - parseInt(firstVisit)) / (1000 * 60 * 60 * 24))
        };
      }
    } catch (error) {
      console.warn('Error getting user session data:', error);
    }
    
    return {
      is_returning_user: false,
      visit_count: 1,
      first_visit: new Date(),
      last_visit: new Date(),
      days_since_first_visit: 0
    };
  }, [isReturningUser]);

  useEffect(() => {
    checkReturningUser();
  }, [checkReturningUser]);

  return {
    isReturningUser,
    getUserSessionData
  };
};
