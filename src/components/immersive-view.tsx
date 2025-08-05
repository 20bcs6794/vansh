
"use client";

import { useRef, useEffect, type ReactNode, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function ImmersiveView({ children }: { children?: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const tiltRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isGyroPermissionGranted, setGyroPermissionGranted] = useState(false);
  
  const lightImage = "/images/light_theme_bg.jpg";
  const darkImage = "/images/dark_theme_bg.jpg";
  
  const requestDeviceOrientationPermission = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setGyroPermissionGranted(true);
        }
      } catch (error) {
        console.error("Permission request for device orientation failed:", error);
      }
    } else {
      // For non-iOS 13+ devices, permission is granted by default
      setGyroPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    // For non-iOS devices, we can try to enable it by default
    if (isMobile && typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
       setGyroPermissionGranted(true);
    }
  }, [isMobile]);
  
  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
        const element = tiltRef.current;
        if (!element) return;

        const { beta, gamma } = event; // beta: front-back tilt, gamma: left-right tilt
        
        const yPos = (beta ? beta - 45 : 0) / 45; // Normalize beta (adjust 45 for neutral position)
        const xPos = (gamma ?? 0) / 45; // Normalize gamma
        
        const horizontalMoveStrength = 60;
        const verticalMoveStrength = 30;

        element.style.transform = `translate3d(${-xPos * horizontalMoveStrength}px, ${-yPos * verticalMoveStrength}px, 0) scale(1.1)`;
    };
    
    if (isMobile && isGyroPermissionGranted) {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (isMobile) return;
      const { clientX, clientY } = event;
      const element = tiltRef.current;
      if (!element) return;
      
      const { offsetWidth, offsetHeight } = document.body;
      const xPos = (clientX / offsetWidth - 0.5) * 2;
      const yPos = (clientY / offsetHeight - 0.5) * 2;
      
      const horizontalMoveStrength = 80;
      const verticalMoveStrength = 20;

      element.style.transform = `translate3d(${-xPos * horizontalMoveStrength}px, ${-yPos * verticalMoveStrength}px, 0) scale(1.1)`;
    };

    const handleMouseLeave = () => {
       if (isMobile) return;
      const element = tiltRef.current;
      if (element) {
        element.style.transform = 'translate3d(0, 0, 0) scale(1.1)';
      }
    };
    
    if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        handleMouseLeave();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }
  }, [isMobile, isGyroPermissionGranted]);
  
  const vignetteStyle = {
    dark: 'inset 0 0 120px 40px hsl(var(--background))',
    light: 'none',
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-background"
      onClick={isMobile && !isGyroPermissionGranted ? requestDeviceOrientationPermission : undefined}
    >
      <div 
        ref={tiltRef} 
        className="absolute inset-[-4%]"
        style={{ 
          transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          transform: 'scale(1.3)',
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 transition-opacity duration-500 ease-in-out" 
            style={{ 
              opacity: theme === 'light' ? 1 : 0,
            }}
          >
            <Image
              src={lightImage}
              alt="A futuristic landscape with a planet in the sky"
              data-ai-hint="futuristic landscape forest"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div 
            className="absolute inset-0 transition-opacity duration-500 ease-in-out" 
            style={{ 
              opacity: theme === 'dark' ? 1 : 0,
            }}
          >
            <Image
              src={darkImage}
              alt="A futuristic city with flying vehicles at night"
              data-ai-hint="futuristic city forest"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      
       {isMobile && !isGyroPermissionGranted && typeof (DeviceOrientationEvent as any).requestPermission === 'function' && (
         <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 pointer-events-none">
           <div className="bg-background p-6 rounded-lg text-center">
              <p className="mb-4">Tap to enable gyroscope for a better experience.</p>
           </div>
         </div>
       )}
      
      {children}
      
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ boxShadow: theme === 'dark' ? vignetteStyle.dark : vignetteStyle.light }}
      />
      
      <Button 
        variant="outline" 
        size="icon" 
        onClick={(e) => {
            e.stopPropagation();
            toggleTheme();
        }}
        className={cn(
          "absolute z-50",
          isMobile 
            ? "top-16 right-4" 
            : "top-4 right-4"
        )}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
