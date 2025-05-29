
import { useCallback, useRef } from 'react';
import { FormInteractionData } from '@/types/analytics';

export const useAdvancedFormTracking = () => {
  const formInteractions = useRef<Map<string, FormInteractionData>>(new Map());
  const fieldStartTimes = useRef<Map<string, number>>(new Map());

  const trackFieldFocus = useCallback((fieldName: string) => {
    fieldStartTimes.current.set(fieldName, Date.now());
    
    if (!formInteractions.current.has(fieldName)) {
      formInteractions.current.set(fieldName, {
        field_name: fieldName,
        filled: false,
        time_spent: 0,
        attempts: 0
      });
    }
    
    const interaction = formInteractions.current.get(fieldName)!;
    interaction.attempts += 1;
  }, []);

  const trackFieldBlur = useCallback((fieldName: string, value: string) => {
    const startTime = fieldStartTimes.current.get(fieldName);
    if (!startTime) return;

    const timeSpent = Date.now() - startTime;
    const interaction = formInteractions.current.get(fieldName);
    
    if (interaction) {
      interaction.time_spent += timeSpent;
      interaction.filled = value.trim().length > 0;
    }
    
    fieldStartTimes.current.delete(fieldName);
  }, []);

  const getFormAnalytics = useCallback(() => {
    const interactions = Array.from(formInteractions.current.values());
    
    return {
      form_fields_filled: interactions.filter(i => i.filled).map(i => i.field_name),
      form_fields_left_blank: interactions.filter(i => !i.filled).map(i => i.field_name),
      field_completion_rate: interactions.length > 0 
        ? interactions.filter(i => i.filled).length / interactions.length 
        : 0,
      total_form_time: interactions.reduce((sum, i) => sum + i.time_spent, 0),
      field_interactions: interactions
    };
  }, []);

  const resetFormTracking = useCallback(() => {
    formInteractions.current.clear();
    fieldStartTimes.current.clear();
  }, []);

  return {
    trackFieldFocus,
    trackFieldBlur,
    getFormAnalytics,
    resetFormTracking
  };
};
