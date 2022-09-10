import { createNavigationContainerRef } from '@react-navigation/native';

interface NavigationInterface {
  navigationRef: {
    navigate: (screen: string, params?: any) => void
    isReady: Boolean
  }
}

export const navigationRef = createNavigationContainerRef<NavigationInterface>()

export function useNavigate(screen: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screen, params);
  }
}