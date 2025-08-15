import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getLocalFeatures, setLocalFeatures } from '@/utils/localStorage';

const AppContext = createContext(undefined);

const initialState = {
  areas: [],
  channels: [],
  customDefinitions: [],
  plans: [],
  features: getLocalFeatures(),
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_AREA':
      return { ...state, areas: [...state.areas, action.payload] };
    case 'ADD_CHANNEL':
      return { ...state, channels: [...state.channels, action.payload] };
    case "SET_FEATURES":
      setLocalFeatures(action.payload);
      return { ...state, features: action.payload };
    case "ADD_FEATURE":
      const updatedFeatures = [...state.features, action.payload];
      setLocalFeatures(updatedFeatures);
      return { ...state, features: updatedFeatures };
    // case 'ADD_FEATURE':
    //   return { ...state, features: [...state.features, action.payload] };
    case 'ADD_CUSTOM_DEFINITION':
      return { ...state, customDefinitions: [...state.customDefinitions, action.payload] };
    case 'ADD_PLAN':
      return { ...state, plans: [...state.plans, action.payload] };
    case 'UPDATE_PLAN':
      return {
        ...state,
        plans: state.plans.map(plan =>
          plan.id === action.payload.planId
            ? { ...plan, ...action.payload.updates }
            : plan
        ),
      };
    case 'ADD_PLAN_RECORD':
      return {
        ...state,
        plans: state.plans.map(plan =>
          plan.id === action.payload.planId
            ? { ...plan, records: [...plan.records, action.payload.record] }
            : plan
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Ensure features in localStorage at first render
    if (!localStorage.getItem("features")) {
      setLocalFeatures(state.features);
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'SET_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error parsing saved state:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  const addArea = (areaData) => {
    const area = {
      ...areaData,
      id: `area_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      areaInSqm: areaData.length * areaData.breadth,
    };
    dispatch({ type: 'ADD_AREA', payload: area });
  };

  const addChannel = (channelData) => {
    const channel = {
      ...channelData,
      id: `channel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    dispatch({ type: 'ADD_CHANNEL', payload: channel });
  };

    const addFeature = (featureData) => {
      console.log(featureData)
    const feature = {
      ...featureData,
      id: `feature_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      areaInSqm: featureData.length * featureData.breadth,
    };
    dispatch({ type: 'ADD_FEATURE', payload: feature });
  };

  const addCustomDefinition = (definitionData) => {
    const definition = {
      ...definitionData,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    dispatch({ type: 'ADD_CUSTOM_DEFINITION', payload: definition });
  };

  const addPlan = (planData) => {
    const plan = {
      ...planData,
      id: `plan_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    dispatch({ type: 'ADD_PLAN', payload: plan });
  };

  const updatePlan = (planId, updates) => {
    dispatch({ type: 'UPDATE_PLAN', payload: { planId, updates } });
  };

  const addPlanRecord = (planId, recordData) => {
    const record = {
      ...recordData,
      id: `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    dispatch({ type: 'ADD_PLAN_RECORD', payload: { planId, record } });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addArea,
        addFeature,
        addChannel,
        addCustomDefinition,
        addPlan,
        updatePlan,
        addPlanRecord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
