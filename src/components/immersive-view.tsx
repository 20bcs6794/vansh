
"use client";

import React, { useRef, useEffect, type ReactNode, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Code, Database, BrainCircuit, Bot, Atom, Cog, GitBranch, Terminal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { GlassPanelLayout } from '@/components/glass-panel-layout';

const FloatingIcons = ({ orientation }: { orientation: { beta: number | null, gamma: number | null } }) => {
    const icons = [
        { id: 'code', icon: Code, initialPos: { top: '20%', left: '10%' }, speed: { x: 0.1, y: 0.08 } },
        { id: 'db', icon: Database, initialPos: { top: '80%', left: '20%' }, speed: { x: -0.08, y: -0.12 } },
        { id: 'brain', icon: BrainCircuit, initialPos: { top: '15%', left: '80%' }, speed: { x: -0.12, y: 0.08 } },
        { id: 'bot', icon: Bot, initialPos: { top: '70%', left: '90%' }, speed: { x: 0.06, y: -0.1 } },
        { id: 'atom', icon: Atom, initialPos: { top: '50%', left: '50%' }, speed: { x: 0.15, y: -0.15 } },
        { id: 'cog', icon: Cog, initialPos: { top: '90%', left: '60%' }, speed: { x: -0.1, y: -0.05 } },
        { id: 'git', icon: GitBranch, initialPos: { top: '40%', left: '5%' }, speed: { x: 0.08, y: 0.12 } },
        { id: 'terminal', icon: Terminal, initialPos: { top: '5%', left: '40%' }, speed: { x: 0.05, y: -0.1 } },
    ];

    const [positions, setPositions] = useState(icons.map(i => ({...i.initialPos})));
    const animationFrameId = useRef<number>();

    useEffect(() => {
        // NOTE: The animation loop was removed to improve performance on mobile devices.
        // The icons will now be static unless gyro movement is detected.
        if (orientation.beta === null && orientation.gamma === null) return;
        
        setPositions(prevPositions => prevPositions.map((pos, index) => {
            const icon = icons[index];
            const { beta, gamma } = orientation;

            const gyroX = (gamma ?? 0) / 45;
            const gyroY = (beta ? beta - 45 : 0) / 45;

            let newX = parseFloat(pos.left) + gyroX * 1.5;
            let newY = parseFloat(pos.top) + gyroY * 1.5;

            newX = Math.max(0, Math.min(100, newX));
            newY = Math.max(0, Math.min(100, newY));

            return { left: `${newX}%`, top: `${newY}%` };
        }));
        
    }, [orientation]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {icons.map((icon, index) => {
                const IconComponent = icon.icon;
                return (
                    <IconComponent
                        key={icon.id}
                        className="absolute text-white/20 dark:text-white/10"
                        size={60}
                        style={{
                            ...positions[index],
                            transition: 'left 0.5s linear, top 0.5s linear'
                        }}
                    />
                );
            })}
        </div>
    );
}

export function ImmersiveView({ children }: { children?: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const tiltRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isGyroPermissionGranted, setGyroPermissionGranted] = useState(false);
  const [orientation, setOrientation] = useState<{ beta: number | null, gamma: number | null }>({ beta: null, gamma: null });
  
  const lightImage = isMobile ? "/images/mobile-day.jpg" : "/images/light_theme_bg.jpg";
  const darkImage = isMobile ? "/images/mobile-night.jpg" : "/images/dark_theme_bg.jpg";
  
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
      setGyroPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (isMobile === undefined) return;
    if (isMobile && typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
       setGyroPermissionGranted(true);
    }
  }, [isMobile]);
  
  useEffect(() => {
    if (isMobile === undefined) return;
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
        setOrientation({ beta: event.beta, gamma: event.gamma });
        const element = tiltRef.current;
        if (!element) return;

        const { beta, gamma } = event; 
        
        const yPos = (beta ? beta - 45 : 0) / 45; 
        const xPos = (gamma ?? 0) / 45; 
        
        const horizontalMoveStrength = 100;
        const verticalMoveStrength = 80;

        element.style.transform = `translate3d(${-xPos * horizontalMoveStrength}px, ${-yPos * verticalMoveStrength}px, 0) scale(1.3)`;
    };
    
    if (isMobile) {
        if(isGyroPermissionGranted) {
            window.addEventListener('deviceorientation', handleDeviceOrientation);
        }
        return () => {
            window.removeEventListener('deviceorientation', handleDeviceOrientation);
        };
    }

    // Fallback to mouse movement for desktop
    const handleMouseMove = (event: MouseEvent) => {
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
      const element = tiltRef.current;
      if (element) {
        element.style.transform = 'translate3d(0, 0, 0) scale(1.1)';
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    handleMouseLeave(); 
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile, isGyroPermissionGranted]);
  
  const vignetteStyle = {
    dark: 'inset 0 0 120px 40px hsl(var(--background))',
    light: 'none',
  };

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === GlassPanelLayout) {
      return React.cloneElement(child as React.ReactElement<any>, { orientation });
    }
    return child;
  });

  if (isMobile === undefined) {
    return null; // Render nothing on server or until hook is ready
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden bg-background"
      onClick={isMobile && !isGyroPermissionGranted ? requestDeviceOrientationPermission : undefined}
    >
      <div 
        ref={tiltRef} 
        className="absolute inset-[-15%]"
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
         <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/50 pointer-events-auto">
           <div className="bg-background p-6 rounded-lg text-center">
              <p className="mb-4">Tap to enable gyroscope for a better experience.</p>
           </div>
         </div>
       )}
      
      {isMobile && isGyroPermissionGranted && <FloatingIcons orientation={orientation} />}
      
      {childrenWithProps}
      
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ boxShadow: theme === 'dark' ? vignetteStyle.dark : vignetteStyle.light }}
      />
      
      {!isMobile && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
          }}
          className="absolute z-50 top-4 right-4"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </div>
  );
}
