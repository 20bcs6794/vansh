
"use client";

import { type CSSProperties, forwardRef, useRef, useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Home as HomeIcon, Heart, User, Briefcase, Bell, Download, Check, MapPin, Link as LinkIcon, Award, ChevronRight, GraduationCap, Phone, Instagram, Send, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const BentoCard = ({ children, className, ...props }: { children: ReactNode, className?: string, [key: string]: any }) => (
    <div
        className={cn("bg-white/80 dark:bg-black/70 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300", className)}
        {...props}
    >
        {children}
    </div>
);

const BentoHomeGrid = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { theme } = useTheme();

    const lightImage = "/images/dark_theme_user.jpg";
    const darkImage = "/images/light_theme_user.jpg";
    const certificatesLink = "https://drive.google.com/uc?export=view&id=1JdGrWi9uYqEd4LDoCwGS9tesLgxQHWFX";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('mr.vanshverma2001@gmail.com');
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 5000); // Revert back after 5 seconds
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-fr gap-4 h-full w-full p-1">
            <BentoCard className="md:col-span-2 md:row-span-2 p-4 flex flex-col justify-start">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4">
                     <div
                        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                        style={{ opacity: theme === 'light' ? 1 : 0 }}
                    >
                        <Image
                            src={lightImage}
                            alt="Vanshdeep Verma"
                            data-ai-hint="person professional portrait"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div
                        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                        style={{ opacity: theme === 'dark' ? 1 : 0 }}
                    >
                        <Image
                            src={darkImage}
                            alt="Vanshdeep Verma"
                            data-ai-hint="person professional portrait"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Hi, I'm Vanshdeep —</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Aspiring Software Engineer, Data Analyst, Web Developer</p>
                    <div className="flex items-center text-muted-foreground mt-2 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>New Delhi, India</span>
                    </div>
                </div>
            </BentoCard>
            
            <a href={certificatesLink} target="_blank" rel="noopener noreferrer" className="group">
                <BentoCard className="col-span-1 md:col-span-1 h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="text-center">
                        <h3 className="font-bold text-lg">My Certificates</h3>
                        <div className="flex justify-center items-center mt-2">
                             <ChevronRight className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2" />
                        </div>
                    </div>
                </BentoCard>
            </a>

            <BentoCard className="col-span-1 md:col-span-1 flex flex-col items-center justify-center">
                 <h3 className="text-5xl font-bold">07+</h3>
                 <p className="text-muted-foreground text-xs uppercase tracking-wider text-center">Deployed Projects</p>
            </BentoCard>
            
            <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-center items-center">
                <h3 className="font-bold text-lg mb-4 text-center">Have a project in mind?</h3>
                <Button 
                    onClick={handleCopyEmail} 
                    className={cn(
                        "w-full max-w-xs bg-primary/80 hover:bg-primary text-primary-foreground transition-colors", 
                        isCopied && "bg-green-600 hover:bg-green-700"
                    )}
                >
                    {isCopied ? (
                        <span className="flex items-center justify-center">
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                        </span>
                    ) : (
                       "Copy my email"
                    )}
                </Button>
            </BentoCard>
        </div>
    );
};


const GlassPanel = forwardRef<HTMLDivElement, { className?: string, children: ReactNode, style?: CSSProperties, isContentPanel?: boolean, activeView?: string }>(({ className, children, style, isContentPanel, activeView }, ref) => {
  const isContactView = isContentPanel && activeView === 'Contact';
  
  return (
    <div ref={ref} style={style} className={cn(
      "bg-white/15 dark:bg-black/30 backdrop-blur-[1px] border border-white/10 dark:border-white/10 rounded-[20px] shadow-lg p-6",
      isContactView && "bg-transparent dark:bg-transparent backdrop-blur-0 border-none shadow-none p-0",
      className
    )}>
      {children}
    </div>
  );
});
GlassPanel.displayName = 'GlassPanel';

const NavItem = ({ icon, label, isActive, onClick }: { icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }) => {
  const Icon = icon;
  return (
    <button onClick={onClick} className={cn(
      "flex w-full items-center gap-4 px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors font-bold text-base",
      isActive && "bg-white/10 dark:bg-white/10 shadow-[0_0_8px_1px_rgba(255,255,255,0.4)] text-black dark:text-white"
    )}>
      <Icon className="w-5 h-5" />
      <span className="text-base">{label}</span>
    </button>
  );
};

const ProjectBentoCard = ({ project, isHovered }: { project: any, isHovered: boolean }) => {
  return (
    <div
      className={cn(
        "relative text-white transition-all duration-300 ease-in-out cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br p-6 flex flex-col h-full",
        project.bgColor
      )}
    >
      <div className="relative flex-grow flex flex-col justify-between">
        {/* Expanded Content */}
        <div className={cn(
          "absolute inset-0 flex flex-col transition-opacity duration-500 delay-200 p-6",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl">{project.name}</h3>
            <div className="flex gap-2 flex-wrap justify-end max-w-[50%]">
              {project.tech.map((t: string) => <span key={t} className="text-xs bg-white/20 px-2 py-1 rounded-full whitespace-nowrap">{t}</span>)}
            </div>
          </div>
          <div className="flex-grow flex items-center">
            <p className="text-sm mt-2">{project.description}</p>
          </div>
          <div className="flex justify-end">
             <Button asChild variant="secondary" className="bg-white/90 text-black font-bold hover:bg-white transition-colors">
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Preview
              </a>
            </Button>
          </div>
        </div>

        {/* Collapsed Content */}
        <div className={cn(
          "flex flex-col items-center justify-center h-full transition-opacity duration-300",
          isHovered ? "opacity-0" : "opacity-100"
        )}>
          <h3 className="font-bold text-lg text-center">
            {project.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

const ProjectsView = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const projectsData = [
      {
        id: 1,
        name: 'AI Chatbot Generator',
        description: 'A platform to create and deploy AI-powered chatbots for businesses with ease, improving customer engagement.',
        tech: ['Next.js', 'Genkit', 'Tailwind'],
        link: 'https://www.linkedin.com/posts/vanshdeep-verma_connections-github-linkedin-activity-7170425782798835712-UpzW?utm_source=share&utm_medium=member_desktop',
        bgColor: 'from-purple-500 to-indigo-600',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-2',
      },
      {
        id: 2,
        name: 'Mystery Quiz Game',
        description: 'A fun and interactive mini-game that challenges users with a series of mysterious and brain-teasing questions.',
        tech: ['React', 'API', 'Framer Motion'],
        link: 'https://github.com/Vanshdeep-verma/Quiz-App',
        bgColor: 'from-blue-500 to-cyan-600',
        colSpan: 'col-span-2',
        rowSpan: 'row-span-1',
      },
      {
        id: 3,
        name: 'AI Story Generator',
        description: 'Use the power of generative AI to create unique and enchanting fantasy bedtime stories for children.',
        tech: ['Genkit', 'React', 'Firebase'],
        link: 'https://github.com/Vanshdeep-verma/Story-Generator',
        bgColor: 'from-fuchsia-500 to-pink-600',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
      {
        id: 4,
        name: 'Dev-Connect Platform',
        description: 'A platform connecting new developers with real-world projects to gain experience and build their portfolio.',
        tech: ['React', 'Firebase', 'ShadCN'],
        link: 'https://github.com/Vanshdeep-verma/Dev-Connect',
        bgColor: 'from-indigo-700 to-violet-800',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
    ];

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">My Works</h2>
            <div 
                className="flex-grow grid grid-cols-3 grid-rows-2 gap-4"
                onMouseLeave={() => setHoveredId(null)}
            >
                {projectsData.map(project => (
                    <div
                        key={project.id}
                        className={cn(
                            'transition-all duration-300 ease-in-out',
                            project.colSpan,
                            project.rowSpan,
                            hoveredId && hoveredId !== project.id ? 'opacity-50 blur-sm' : '',
                            hoveredId === project.id ? 'scale-105 z-10' : ''
                        )}
                        onMouseEnter={() => setHoveredId(project.id)}
                    >
                        <ProjectBentoCard 
                            project={project} 
                            isHovered={hoveredId === project.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


const SocialButton = ({ label, href, children }: { label: string, href: string, children?: ReactNode }) => {
  return (
    <Button asChild variant="ghost" className="text-neutral-900 dark:text-neutral-50 hover:bg-black dark:hover:bg-black/70 hover:text-white dark:hover:text-white rounded-full px-4 py-1 text-sm font-bold">
       <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
        <span>{label}</span>
       </a>
    </Button>
  )
}

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c3.848-0.67,4.549,2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c0.826-3.417,0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896,5.764,5.896h-7.236c-2.523,0-5,1.862,5-4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5,1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
</svg>
);
const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"></path><path fill="#EEE" d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"></path>
</svg>
);
const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#039BE5" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z"></path><path fill="#EEE" d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z"></path>
</svg>
);
const BootstrapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
        <linearGradient id="Q_pn21O5LDDqwJlze0Upoa_g9mmSxx3SwAI_gr1" x1="24" x2="24" y1="41" y2="7" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#643499"></stop><stop offset=".011" stopColor="#68369f"></stop><stop offset=".135" stopColor="#773db6"></stop><stop offset=".193" stopColor="#8042c3"></stop><stop offset=".248" stopColor="#8343c8"></stop><stop offset=".388" stopColor="#8444c9"></stop><stop offset=".732" stopColor="#9751d2"></stop><stop offset=".997" stopColor="#9c55d4"></stop><stop offset=".998" stopColor="#9c55d4"></stop><stop offset="1" stopColor="#9c55d4"></stop></linearGradient><path fill="url(#Q_pn21O5LDDqwJlze0Upoa_g9mmSxx3SwAI_gr1)" d="M7.373,11.443C7.293,9.132,9.094,7,11.529,7h24.946c2.435,0,4.236,2.132,4.155,4.443	c-0.077,2.221,0.023,5.097,0.747,7.443c0.681,2.207,1.801,3.652,3.593,3.981c0.206,0.038,0.363,0.205,0.363,0.415v1.438	c0,0.21-0.157,0.377-0.363,0.415c-1.792,0.328-2.912,1.773-3.593,3.981c-0.724,2.345-0.824,5.222-0.747,7.443	C40.71,38.868,38.909,41,36.475,41H11.529c-2.434,0-4.236-2.132-4.155-4.443c0.077-2.221-0.023-5.097-0.747-7.443	c-0.681-2.207-1.804-3.652-3.596-3.981c-0.206-0.038-0.363-0.205-0.363-0.415v-1.438c0-0.21,0.157-0.377,0.363-0.415	c1.792-0.328,2.915-1.773,3.596-3.981C7.35,16.54,7.451,13.664,7.373,11.443z"></path><path fill="#fff" d="M27.073,23.464v-0.028c1.853-0.32,3.299-2.057,3.299-3.97c0-1.352-0.52-2.498-1.504-3.312	c-0.981-0.812-2.357-1.241-3.981-1.241H17.45V33.08h7.475c1.942,0,3.555-0.474,4.663-1.372c1.109-0.899,1.696-2.207,1.696-3.783	C31.283,25.544,29.593,23.756,27.073,23.464z M23.59,22.608h-3.181V17.29h3.784c2.076,0,3.219,0.911,3.219,2.565	C27.413,21.63,26.055,22.608,23.59,22.608z M20.409,24.834h3.759c2.716,0,4.092,0.981,4.092,2.916c0,1.932-1.357,2.953-3.925,2.953	h-3.926V24.834z"></path>
    </svg>
);

const TailwindCssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#00acc1" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"></path>
  </svg>
);

const JavaScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#ffd600" d="M6,42V6h36v36H6z"></path><path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"></path>
  </svg>
);

const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" {...props}>
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
    </svg>
);

const NodeJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#388e3c" d="M17.204 19.122l-4.907 2.715C12.113 21.938 12 22.126 12 22.329v5.433c0 .203.113.39.297.492l4.908 2.717c.183.101.41.101.593 0l4.907-2.717C22.887 28.152 23 27.965 23 27.762v-5.433c0-.203-.113-.39-.297-.492l-4.906-2.715c-.092-.051-.195-.076-.297-.076-.103 0-.205.025-.297.076M42.451 24.013l-.818.452c-.031.017-.049.048-.049.082v.906c0 .034.019.065.049.082l.818.453c.031.017.068.017.099 0l.818-.453c.03-.017.049-.048.049-.082v-.906c0-.034-.019-.065-.05-.082l-.818-.452C42.534 24.004 42.517 24 42.5 24S42.466 24.004 42.451 24.013"></path><path fill="#37474f" d="M35.751,13.364l-2.389-1.333c-0.075-0.042-0.167-0.041-0.241,0.003 c-0.074,0.044-0.12,0.123-0.12,0.209L33,20.295l-2.203-1.219C30.705,19.025,30.602,19,30.5,19c-0.102,0-0.205,0.025-0.297,0.076 h0.001l-4.907,2.715C25.113,21.892,25,22.08,25,22.282v5.433c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C35.887,28.106,36,27.918,36,27.715V13.788C36,13.612,35.904,13.45,35.751,13.364z M32.866,26.458l-2.23,1.235c-0.083,0.046-0.186,0.046-0.269,0l-2.231-1.235C28.051,26.412,28,26.326,28,26.234v-2.47 c0-0.092,0.051-0.177,0.135-0.224l2.231-1.234h-0.001c0.042-0.023,0.088-0.034,0.135-0.034c0.047,0,0.093,0.012,0.135,0.034 l2.23,1.234C32.949,23.587,33,23.673,33,23.765v2.47C33,26.326,32.949,26.412,32.866,26.458z"></path><path fill="#2e7d32" d="M17.204,19.122L12,27.762c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0L23,22.329c0-0.203-0.113-0.39-0.297-0.492l-4.906-2.715c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"></path><path fill="#4caf50" d="M17.204,19.122l-4.907,2.715C12.113,21.938,12,22.126,12,22.329l5.204,8.642 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C22.887,28.152,23,27.965,23,27.762l-5.203-8.64c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"></path><path fill="#37474f" d="M47.703 21.791l-4.906-2.715C42.705 19.025 42.602 19 42.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C37.114 21.892 37 22.084 37 22.294v5.411c0 .209.114.402.297.503l4.908 2.717c.184.102.409.102.593 0l2.263-1.253c.207-.115.206-.412-.002-.526l-4.924-2.687C40.052 26.412 40 26.325 40 26.231v-2.466c0-.092.05-.177.13-.221l2.235-1.236H5.365c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237c.08.044.13.129.13.221v4.393c0 .172.091.331.24.417l2.398 1.393c.075.043.167.043.242.001C10.954 29.925 11 29.845 11 29.759v-7.464C11 22.085 10.886 21.892 10.703 21.791z"></path>
  </svg>
);
const SQLiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sqlite-original-a" x1="-15.615" x2="-6.741" y1="-9.108" y2="-9.108" gradientTransform="rotate(90 -90.486 64.634) scale(9.2712)" gradientUnits="userSpaceOnUse"><stop stopColor="#95d7f4" offset="0"/><stop stopColor="#0f7fcc" offset=".92"/><stop stopColor="#0f7fcc" offset="1"/></linearGradient></defs><path d="M69.5 99.176c-.059-.73-.094-1.2-.094-1.2S67.2 83.087 64.57 78.642c-.414-.707.043-3.594 1.207-7.88.68 1.169 3.54 6.192 4.118 7.81.648 1.824.78 2.347.78 2.347s-1.57-8.082-4.144-12.797a162.286 162.286 0 012.004-6.265c.973 1.71 3.313 5.859 3.828 7.3.102.293.192.543.27.774.023-.137.05-.274.074-.414-.59-2.504-1.75-6.86-3.336-10.082 3.52-18.328 15.531-42.824 27.84-53.754H16.9c-5.387 0-9.789 4.406-9.789 9.789v88.57c0 5.383 4.406 9.789 9.79 9.789h52.897a118.657 118.657 0 01-.297-14.652" fill="#0b7fcc"/><path d="M65.777 70.762c.68 1.168 3.54 6.188 4.117 7.809.649 1.824.781 2.347.781 2.347s-1.57-8.082-4.144-12.797a164.535 164.535 0 012.004-6.27c.887 1.567 2.922 5.169 3.652 6.872l.082-.961c-.648-2.496-1.633-5.766-2.898-8.328 3.242-16.871 13.68-38.97 24.926-50.898H16.899a6.94 6.94 0 00-6.934 6.933v82.11c17.527-6.731 38.664-12.88 56.855-12.614-.672-2.605-1.441-4.96-2.25-6.324-.414-.707.043-3.597 1.207-7.879" fill="url(#sqlite-original-a)"/><path d="M115.95 2.781c-5.5-4.906-12.164-2.933-18.734 2.899a44.347 44.347 0 00-2.914 2.859c-11.25 11.926-21.684 34.023-24.926 50.895 1.262 2.563 2.25 5.832 2.894 8.328.168.64.32 1.242.442 1.754.285 1.207.437 1.996.437 1.996s-.101-.383-.515-1.582c-.078-.23-.168-.484-.27-.773-.043-.125-.105-.274-.172-.434-.734-1.703-2.765-5.305-3.656-6.867-.762 2.25-1.437 4.36-2.004 6.265 2.578 4.715 4.149 12.797 4.149 12.797s-.137-.523-.782-2.347c-.578-1.621-3.441-6.64-4.117-7.809-1.164 4.281-1.625 7.172-1.207 7.88.809 1.362 1.574 3.722 2.25 6.323 1.524 5.867 2.586 13.012 2.586 13.012s.031.469.094 1.2a118.653 118.653 0 00.297 14.651c.504 6.11 1.453 11.363 2.664 14.172l.828-.449c-1.781-5.535-2.504-12.793-2.188-21.156.48-12.793 3.422-28.215 8.856-44.289 9.191-24.27 21.938-43.738 33.602-53.035-10.633 9.602-25.023 40.684-29.332 52.195-4.82 12.891-8.238 24.984-10.301 36.574 3.55-10.863 15.047-15.53 15.047-15.53s5.637-6.958 12.227-16.888c-3.95.903-10.43 2.442-12.598 3.352-3.2 1.344-4.067 1.8-4.067 1.8s10.371-6.312 19.27-9.171c12.234-19.27 25.562-46.648 12.141-58.621" fill="#003956"/></svg>

);

const NextJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" {...props}>
        <circle cx="64" cy="64" r="64" fill="black" />
        <path fill="white" d="M44.9,96.5v-65h9.3l29.6,44.7v-44.7h9.3v65h-9.3L54.2,51.8v44.7H44.9z"/>
    </svg>
);

const GitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/></svg>
);

const MySqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
        <linearGradient id="eDMgMixeD6M6EYSYBuJ8ya_9nLaR5KFGjN0_gr1" x1="9.8" x2="11.081" y1="25.236" y2="36.899" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#058f92"></stop><stop offset=".5" stopColor="#038489"></stop><stop offset="1" stopColor="#026d71"></stop></linearGradient><path fill="url(#eDMgMixeD6M6EYSYBuJ8ya_9nLaR5KFGjN0_gr1)" d="M0.002,35.041h1.92v-7.085l2.667,6.057c0.329,0.755,0.779,1.022,1.662,1.022 s1.315-0.267,1.644-1.022l2.667-5.902v6.93h1.92v-7.258c0-0.697-0.277-1.035-0.849-1.209c-1.367-0.43-2.285-0.059-2.7,0.872 l-2.735,6.16l-2.649-6.16c-0.398-0.93-1.332-1.302-2.7-0.872C0.277,26.748,0,27.085,0,27.782v7.258H0.002z M13.441,29.281h1.92 v4.055c-0.015,0.2,0.064,0.731,0.99,0.745c0.472,0.008,2.821,0,2.85,0v-4.8h1.92c0.008,0,0,5.968,0,5.993 c0.01,1.472-1.828,1.662-2.673,1.687h-5.006v-0.96c0.01,0,4.787,0.001,4.801,0c1.088-0.115,0.959-0.714,0.959-0.896v-0.064H16.19 c-1.67-0.015-2.735-0.751-2.747-1.59C13.441,33.373,13.479,29.317,13.441,29.281z"></path><linearGradient id="eDMgMixeD6M6EYSYBuJ8yb_9nLaR5KFGjN0_gr2" x1="34.224" x2="35.101" y1="25.644" y2="35.217" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ff9c0f"></stop><stop offset=".813" stopColor="#d67e00"></stop></linearGradient><path fill="url(#eDMgMixeD6M6EYSYBuJ8yb_9nLaR5KFGjN0_gr2)" d="M22.081,35.041h4.807c0.63,0,1.242-0.132,1.728-0.36c0.81-0.372,1.144-0.875,1.144-1.536 v-1.368c0-1.476-1.83-1.536-2.88-1.536h-1.92c-0.755,0-0.87-0.456-0.96-0.96v-0.96c0.09-0.384,0.258-0.9,0.923-0.96 c0.773,0,4.836,0,4.836,0v-0.96h-4.566c-0.755,0-3.114,0.09-3.114,1.92v1.187c0,0.84,0.738,1.524,2.34,1.692 c0.18,0.012,0.36,0.024,0.539,0.024c0,0,1.866-0.036,1.92-0.024c1.08,0,0.96,0.84,0.96,0.96v0.96c0,0.132-0.03,0.96-0.971,0.96 c-0.072,0-4.789,0-4.789,0V35.041z M40.32,33.08c0,1.159,0.655,1.809,2.392,1.939c0.162,0.011,0.325,0.021,0.488,0.021H48v-0.96 h-4.435c-0.991,0-1.325-0.416-1.325-1.011v-6.669h-1.92V33.08z M30.704,33.121v-4.8c0-1.02,0.5-1.724,1.916-1.92h0.672h3.447h0.525 c1.416,0.196,2.08,0.899,2.08,1.92v4.782c0,0.827-0.215,1.271-0.916,1.559L39.916,36h-2.16l-1.07-0.96h-1.257l-2.136,0.012 c-0.309,0-0.635-0.043-0.993-0.141C31.226,34.618,30.704,34.054,30.704,33.121z M32.624,33.121c0.098,0.467,0.473,0.96,1.14,0.96 h1.864l-1.068-0.96h2.175l0.519,0.482c0,0,0.186-0.152,0.186-0.482c0-0.33-0.016-4.8-0.016-4.8c-0.098-0.434-0.538-0.96-1.188-0.96 h-2.471c-0.749,0-1.14,0.548-1.14,1.058L32.624,33.121L32.624,33.121z"></path><linearGradient id="eDMgMixeD6M6EYSYBuJ8yc_9nLaR5KFGjN0_gr3" x1="35.029" x2="40.355" y1="11.716" y2="26.75" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#058f92"></stop><stop offset=".5" stopColor="#038489"></stop><stop offset="1" stopColor="#026d71"></stop></linearGradient><path fill="url(#eDMgMixeD6M6EYSYBuJ8yc_9nLaR5KFGjN0_gr3)" d="M46.199,25.389c-1.031-0.028-1.818,0.068-2.491,0.351c-0.191,0.081-0.496,0.083-0.528,0.323 c0.105,0.11,0.121,0.275,0.205,0.41c0.16,0.26,0.432,0.609,0.674,0.791c0.265,0.2,0.538,0.414,0.821,0.587 c0.504,0.307,1.067,0.483,1.553,0.791c0.286,0.181,0.57,0.411,0.85,0.615c0.138,0.102,0.23,0.259,0.41,0.323 c0-0.01,0-0.019,0-0.029c-0.094-0.12-0.119-0.285-0.205-0.411c-0.127-0.127-0.254-0.254-0.381-0.381 c-0.372-0.494-0.846-0.929-1.348-1.289c-0.401-0.288-1.298-0.677-1.466-1.143c-0.01-0.01-0.019-0.019-0.03-0.03 c0.284-0.032,0.617-0.135,0.879-0.205c0.441-0.118,0.834-0.087,1.289-0.205c0.205-0.059,0.41-0.117,0.615-0.176 c0-0.039,0-0.078,0-0.117c-0.23-0.236-0.395-0.548-0.645-0.762c-0.657-0.559-1.373-1.117-2.11-1.583 c-0.409-0.258-0.915-0.426-1.348-0.645c-0.146-0.074-0.402-0.112-0.498-0.234c-0.228-0.29-0.351-0.659-0.527-0.996 c-0.368-0.708-0.73-1.482-1.055-2.227c-0.223-0.508-0.368-1.01-0.645-1.466c-1.331-2.188-2.764-3.509-4.982-4.807 c-0.472-0.276-1.041-0.385-1.642-0.528c-0.323-0.019-0.645-0.039-0.968-0.059c-0.197-0.083-0.401-0.323-0.587-0.44 c-0.735-0.465-2.621-1.475-3.165-0.147c-0.344,0.838,0.514,1.656,0.821,2.081c0.215,0.298,0.491,0.632,0.645,0.968 c0.101,0.22,0.119,0.441,0.205,0.674c0.213,0.574,0.55,1.228,0.826,1.759c0.139,0.269,0.293,0.551,0.469,0.791 c0.108,0.147,0.293,0.212,0.323,0.44c-0.181,0.253-0.191,0.646-0.293,0.968c-0.458,1.445-0.285,3.24,0.381,4.308 c0.204,0.328,0.686,1.032,1.348,0.762c0.579-0.236,0.45-0.967,0.615-1.612c0.037-0.146,0.014-0.253,0.088-0.351 c0,0.01,0,0.019,0,0.03c0.176,0.351,0.351,0.704,0.528,1.055c0.391,0.629,1.084,1.286,1.67,1.73 c0.304,0.23,0.544,0.628,0.938,0.762c0-0.01,0-0.019,0-0.03c-0.01,0-0.019,0-0.03,0c-0.076-0.119-0.196-0.168-0.293-0.264 c-0.229-0.225-0.485-0.504-0.674-0.762c-0.534-0.725-1.006-1.519-1.436-2.345c-0.205-0.395-0.384-0.829-0.557-1.231 c-0.067-0.155-0.066-0.389-0.205-0.469c-0.19,0.294-0.468,0.532-0.615,0.879c-0.234,0.555-0.265,1.233-0.351,1.934 c-0.052,0.018-0.029,0.006-0.059,0.029c-0.408-0.099-0.552-0.518-0.704-0.879c-0.384-0.912-0.455-2.38-0.117-3.429 c0.087-0.272,0.482-1.127,0.323-1.378c-0.076-0.251-0.328-0.396-0.468-0.587c-0.175-0.236-0.348-0.548-0.469-0.821 c-0.314-0.711-0.612-1.538-0.943-2.257c-0.158-0.344-0.425-0.691-0.645-0.996c-0.243-0.338-0.516-0.587-0.704-0.996 c-0.067-0.145-0.158-0.378-0.059-0.528c0.032-0.101,0.076-0.143,0.176-0.176c0.17-0.132,0.643,0.043,0.821,0.117 c0.47,0.195,0.862,0.381,1.26,0.645c0.191,0.127,0.384,0.372,0.615,0.44c0.088,0,0.176,0,0.264,0 c0.413,0.095,0.875,0.03,1.26,0.147c0.682,0.207,1.292,0.529,1.846,0.879c1.69,1.067,3.071,2.585,4.016,4.397 c0.152,0.292,0.218,0.57,0.351,0.879c0.27,0.624,0.611,1.266,0.879,1.876c0.268,0.609,0.53,1.223,0.909,1.73 c0.2,0.266,0.97,0.409,1.319,0.557c0.245,0.104,0.647,0.211,0.879,0.351c0.444,0.268,0.874,0.587,1.289,0.879 C45.528,24.803,46.167,25.124,46.199,25.389z"></path><path fill="#00796b" d="M33.098,14.223c-0.215-0.004-0.367,0.023-0.528,0.059c0,0.01,0,0.019,0,0.03c0.01,0,0.019,0,0.03,0 c0.103,0.21,0.283,0.347,0.41,0.528c0.098,0.205,0.195,0.41,0.293,0.615c0.01-0.01,0.019-0.019,0.029-0.029 c0.181-0.128,0.265-0.332,0.264-0.645c-0.073-0.077-0.084-0.173-0.147-0.264C33.365,14.394,33.203,14.325,33.098,14.223z"></path>
    </svg>
);

const AwsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...props}  x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#252f3e" d="M13.527,21.529c0,0.597,0.064,1.08,0.176,1.435c0.128,0.355,0.287,0.742,0.511,1.161 c0.08,0.129,0.112,0.258,0.112,0.371c0,0.161-0.096,0.322-0.303,0.484l-1.006,0.677c-0.144,0.097-0.287,0.145-0.415,0.145 c-0.16,0-0.319-0.081-0.479-0.226c-0.224-0.242-0.415-0.5-0.575-0.758c-0.16-0.274-0.319-0.58-0.495-0.951 c-1.245,1.483-2.81,2.225-4.694,2.225c-1.341,0-2.411-0.387-3.193-1.161s-1.181-1.806-1.181-3.096c0-1.37,0.479-2.483,1.453-3.321 s2.267-1.258,3.911-1.258c0.543,0,1.102,0.048,1.692,0.129s1.197,0.21,1.836,0.355v-1.177c0-1.225-0.255-2.08-0.75-2.58 c-0.511-0.5-1.373-0.742-2.602-0.742c-0.559,0-1.133,0.064-1.724,0.21c-0.591,0.145-1.165,0.322-1.724,0.548 c-0.255,0.113-0.447,0.177-0.559,0.21c-0.112,0.032-0.192,0.048-0.255,0.048c-0.224,0-0.335-0.161-0.335-0.5v-0.79 c0-0.258,0.032-0.451,0.112-0.564c0.08-0.113,0.224-0.226,0.447-0.339c0.559-0.29,1.229-0.532,2.012-0.726 c0.782-0.21,1.612-0.306,2.49-0.306c1.9,0,3.289,0.435,4.183,1.306c0.878,0.871,1.325,2.193,1.325,3.966v5.224H13.527z M7.045,23.979c0.527,0,1.07-0.097,1.644-0.29c0.575-0.193,1.086-0.548,1.517-1.032c0.255-0.306,0.447-0.645,0.543-1.032 c0.096-0.387,0.16-0.855,0.16-1.403v-0.677c-0.463-0.113-0.958-0.21-1.469-0.274c-0.511-0.064-1.006-0.097-1.501-0.097 c-1.07,0-1.852,0.21-2.379,0.645s-0.782,1.048-0.782,1.854c0,0.758,0.192,1.322,0.591,1.709 C5.752,23.786,6.311,23.979,7.045,23.979z M19.865,25.721c-0.287,0-0.479-0.048-0.607-0.161c-0.128-0.097-0.239-0.322-0.335-0.629 l-3.752-12.463c-0.096-0.322-0.144-0.532-0.144-0.645c0-0.258,0.128-0.403,0.383-0.403h1.565c0.303,0,0.511,0.048,0.623,0.161 c0.128,0.097,0.223,0.322,0.319,0.629l2.682,10.674l2.49-10.674c0.08-0.322,0.176-0.532,0.303-0.629 c0.128-0.097,0.351-0.161,0.639-0.161h1.277c0.303,0,0.511,0.048,0.639,0.161c0.128,0.097,0.239,0.322,0.303,0.629l2.522,10.803 l2.762-10.803c0.096-0.322,0.208-0.532,0.319-0.629c0.128-0.097,0.335-0.161,0.623-0.161h1.485c0.255,0,0.399,0.129,0.399,0.403 c0,0.081-0.016,0.161-0.032,0.258s-0.048,0.226-0.112,0.403l-3.847,12.463c-0.096,0.322-0.208,0.532-0.335,0.629 s-0.335,0.161-0.607,0.161h-1.373c-0.303,0-0.511-0.048-0.639-0.161c-0.128-0.113-0.239-0.322-0.303-0.645l-2.474-10.4 L22.18,24.915c-0.08,0.322-0.176,0.532-0.303,0.645c-0.128,0.113-0.351,0.161-0.639,0.161H19.865z M40.379,26.156 c-0.83,0-1.66-0.097-2.458-0.29c-0.798-0.193-1.421-0.403-1.836-0.645c-0.255-0.145-0.431-0.306-0.495-0.451 c-0.064-0.145-0.096-0.306-0.096-0.451v-0.822c0-0.339,0.128-0.5,0.367-0.5c0.096,0,0.192,0.016,0.287,0.048 c0.096,0.032,0.239,0.097,0.399,0.161c0.543,0.242,1.133,0.435,1.756,0.564c0.639,0.129,1.261,0.193,1.9,0.193 c1.006,0,1.788-0.177,2.331-0.532c0.543-0.355,0.83-0.871,0.83-1.532c0-0.451-0.144-0.822-0.431-1.129 c-0.287-0.306-0.83-0.58-1.612-0.838l-2.315-0.726c-1.165-0.371-2.027-0.919-2.554-1.645c-0.527-0.709-0.798-1.499-0.798-2.338 c0-0.677,0.144-1.274,0.431-1.79s0.671-0.967,1.149-1.322c0.479-0.371,1.022-0.645,1.66-0.838C39.533,11.081,40.203,11,40.906,11 c0.351,0,0.718,0.016,1.07,0.064c0.367,0.048,0.702,0.113,1.038,0.177c0.319,0.081,0.623,0.161,0.91,0.258s0.511,0.193,0.671,0.29 c0.224,0.129,0.383,0.258,0.479,0.403c0.096,0.129,0.144,0.306,0.144,0.532v0.758c0,0.339-0.128,0.516-0.367,0.516 c-0.128,0-0.335-0.064-0.607-0.193c-0.91-0.419-1.932-0.629-3.065-0.629c-0.91,0-1.628,0.145-2.123,0.451 c-0.495,0.306-0.75,0.774-0.75,1.435c0,0.451,0.16,0.838,0.479,1.145c0.319,0.306,0.91,0.613,1.756,0.887l2.267,0.726 c1.149,0.371,1.98,0.887,2.474,1.548s0.734,1.419,0.734,2.257c0,0.693-0.144,1.322-0.415,1.87 c-0.287,0.548-0.671,1.032-1.165,1.419c-0.495,0.403-1.086,0.693-1.772,0.903C41.943,26.043,41.193,26.156,40.379,26.156z"></path><path fill="#f90" d="M43.396,33.992c-5.252,3.918-12.883,5.998-19.445,5.998c-9.195,0-17.481-3.434-23.739-9.142 c-0.495-0.451-0.048-1.064,0.543-0.709c6.769,3.966,15.118,6.369,23.755,6.369c5.827,0,12.229-1.225,18.119-3.741 C43.508,32.364,44.258,33.347,43.396,33.992z M45.583,31.477c-0.671-0.871-4.438-0.419-6.146-0.21 c-0.511,0.064-0.591-0.387-0.128-0.726c3.001-2.128,7.934-1.516,8.509-0.806c0.575,0.726-0.16,5.708-2.969,8.094 c-0.431,0.371-0.846,0.177-0.655-0.306C44.833,35.927,46.254,32.331,45.583,31.477z"></path>
  </svg>
);

const PowerBiIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 256 256" {...props}>
        <path fill="#F2C811" d="M32,224H80V80H32V224z M96,224h48V32H96V224z M160,224h48V128h-48V224z"/>
    </svg>
);

const ExcelIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
        <rect width="16" height="9" x="28" y="15" fill="#21a366"></rect><path fill="#185c37" d="M44,24H12v16c0,1.105,0.895,2,2,2h28c1.105,0,2-0.895,2-2V24z"></path><rect width="16" height="9" x="28" y="24" fill="#107c42"></rect><rect width="16" height="9" x="12" y="15" fill="#3fa071"></rect><path fill="#33c481" d="M42,6H28v9h16V8C44,6.895,43.105,6,42,6z"></path><path fill="#21a366" d="M14,6h14v9H12V8C12,6.895,12.895,6,14,6z"></path><path d="M22.319,13H12v24h10.319C24.352,37,26,35.352,26,33.319V16.681C26,14.648,24.352,13,22.319,13z" opacity=".05"></path><path d="M22.213,36H12V13.333h10.213c1.724,0,3.121,1.397,3.121,3.121v16.425	C25.333,34.603,23.936,36,22.213,36z" opacity=".07"></path><path d="M22.106,35H12V13.667h10.106c1.414,0,2.56,1.146,2.56,1.414V32.44C24.667,33.854,23.52,35,22.106,35z" opacity=".09"></path><linearGradient id="flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1" x1="4.725" x2="23.055" y1="14.725" y2="33.055" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#18884f"></stop><stop offset="1" stopColor="#0b6731"></stop></linearGradient><path fill="url(#flEJnwg7q~uKUdkX0KCyBa_UECmBSgBOvPT_gr1)" d="M22,34H6c-1.105,0-2-0.895,2-2V16c0-1.105,0.895-2,2-2h16c1.105,0,2,0.895,2,2v16	C24,33.105,23.105,34,22,34z"></path><path fill="#fff" d="M9.807,19h2.386l1.936,3.754L16.175,19h2.229l-3.071,5l3.141,5h-2.351l-2.11-3.93L11.912,29H9.526	l3.193-5.018L9.807,19z"></path>
    </svg>
);

const technologiesWithIcons = [
    { name: 'Python', icon: PythonIcon },
    { name: 'HTML', icon: HtmlIcon },
    { name: 'CSS', icon: CssIcon },
    { name: 'javaScript', icon: JavaScriptIcon },
    { name: 'Bootstrap', icon: BootstrapIcon },
    { name: 'SQLite', icon: SQLiteIcon },
    { name: 'Git', icon: GitIcon },
    { name: 'Tailwind CSS', icon: TailwindCssIcon },
    { name: 'React', icon: ReactIcon },
    { name: 'Node.js', icon: NodeJsIcon },
    { name: 'Next.js', icon: NextJsIcon },
    { name: 'MySQL', icon: MySqlIcon },
    { name: 'AWS', icon: AwsIcon },
    { name: 'Power BI', icon: PowerBiIcon },
    { name: 'Excel', icon: ExcelIcon },
];

const TechnologyCard = ({ name, icon: Icon }: { name: string, icon: React.ElementType }) => (
    <div className="bg-white/80 dark:bg-black/70 rounded-lg p-2 flex flex-col items-center justify-center text-center gap-2 w-24 h-24 transition-transform hover:scale-105">
        <Icon className="w-8 h-8" />
        <span className="font-medium text-xs text-neutral-800 dark:text-neutral-100">{name}</span>
    </div>
);

const careerTimelineData = [
  {
    icon: Briefcase,
    title: "Data Analyst",
    company: "Cache Digitech pvt Ltd.",
    location: "New Delhi, India",
    period: "May 2025 - Present",
    description: (
      <>
        <p className="text-sm text-neutral-800 dark:text-neutral-100 mt-2">
            Streamlined internal tools and reporting processes to improve speed, accuracy, and data usability.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-neutral-800 dark:text-neutral-100">
          <li><strong>Boosted data visualization efficiency by 40%</strong> through Power BI dashboards using Excel and SQL.</li>
          <li><strong>Enhanced internal workflows by 15%</strong> by optimizing tools built with React.js.</li>
          <li><strong>Reduced manual reporting effort by 30%</strong> via Python-based Excel automation.</li>
          <li><strong>Improved reporting turnaround by 25%</strong> through integrated BI pipelines.</li>
        </ul>
      </>
    )
  },
  {
    icon: Briefcase,
    title: "Software Engineer Intern",
    company: "Dabur India Limited",
    location: "Noida, India",
    period: "July 2024 - Jan 2025",
    description: (
       <>
        <p className="text-sm text-neutral-800 dark:text-neutral-100 mt-2">
            Contributed to AI automation and SEO strategies to boost user support efficiency and digital reach.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-neutral-800 dark:text-neutral-100">
          <li>Developed an AI assistant that <strong>automated 500+ daily customer queries</strong>, reducing manual support by <strong>40%</strong>.</li>
          <li>Implemented SEO-focused content strategies, resulting in <strong>30% growth in organic traffic</strong> within 3 months.</li>
          <li>Collaborated with tech and content teams to enhance chatbot performance and user engagement.</li>
          <li>Improved website structure and meta-tag optimization for better search visibility.</li>
        </ul>
      </>
    )
  },
  {
    icon: GraduationCap,
    title: "Bachelor of Engineering in Computer Science",
    company: "Chandigarh University ",
    location: "Punjab, India",
    period: "2020 - 2024",
    grade: "Grade: A+",
    description: "Graduated with honors, specializing in Artificial Intelligence and machine learning. Completed a final year project on an complete AI Model which will reduce the human work on computer Systems. Graduated with a solid academic record and multiple industry-recognized certifications, while actively applying skills through projects and internships."
  },
  {
    icon: GraduationCap,
    title: "Senior Secondary School Diploma",
    company: "Midtown School [D.D.P.S Bijnor]",
    location: "Bijnor, India",
    period: "2019 - 2020",
    description: "Focused on advanced placement courses in Mathematics and Computer Science, setting a strong foundation for a career in technology."
  }
];

const CareerTimeline = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold text-black dark:text-white mb-8">Where I’ve Been, What I’ve Done</h2>
            <div className="relative flex flex-col gap-y-10">
                <div className="absolute left-32 top-0 h-full w-1 bg-white/80 dark:bg-black/70 translate-x-1/2 " />

                {careerTimelineData.map((item, index) => (
                    <div key={index} className="grid grid-cols-[auto_auto_1fr] items-start">
                        <div className="w-28 text-left">
                            <div className="bg-white/80 dark:bg-black/70 p-3 rounded-lg shadow-md">
                                <p className="font-bold text-base text-black dark:text-white">{item.period}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className=" relative z-10 bg-background p-1 left-1 rounded-full border-2 border-border">
                                <item.icon className="w-5 h-5 text-black dark:text-white" />
                            </div>
                        </div>
                        
                        <div className="bg-white/80 dark:bg-black/70 p-4 rounded-lg ml-4 shadow-md">
                            <h3 className="font-bold text-base text-black dark:text-white">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                {item.company} 
                                {item.grade && ` | ${item.grade}`}
                            </p>
                            {item.location && (
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span>{item.location}</span>
                                </div>
                            )}
                            <div className="text-sm text-neutral-800 dark:text-neutral-100 mt-2">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ContactView = () => {
    const [formData, setFormData] = useState({ email: '', message: '' });
    const [errors, setErrors] = useState({ email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            email: !formData.email ? 'Email is required.' : '',
            message: !formData.message ? 'Message is required.' : '',
        };
        setErrors(newErrors);

        if (!newErrors.email && !newErrors.message) {
            const subject = "Contact from Portfolio";
            window.location.href = `mailto:mr.vanshverma2001@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formData.message + "\n\nFrom: " + formData.email)}`;
        }
    };
    
    const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#fff" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path><path fill="#fff" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path><path fill="#cfd8dc" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path><path fill="#40c351" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path><path fill="#fff" fillRule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clipRule="evenodd"></path>
        </svg>
    );
     const GmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <path fill="#e0e0e0" d="M5.5,40.5h37c1.933,0,3.5-1.567,3.5-3.5V11.543c0-1.933-1.567-3.5-3.5-3.5h-37	c-1.933,0-3.5,1.567,3.5,3.5V37C2,38.933,3.567,40.5,5.5,40.5z"></path><path fill="#d9d9d9" d="M44.482,12.759L24,27.763L3.518,12.758c0,0-0.095-0.066-0.236-0.182L26,40.5h16.5 c1.933,0,3.5-1.567,3.5-3.5V11.441c0-0.102-0.021-0.197-0.03-0.296C45.816,12.262,44.482,12.759,44.482,12.759z"></path><path fill="#eee" d="M6.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L6.745,40.5z"></path><path fill="#e0e0e0" d="M25.745,40.5H42.5c1.933,0,3.5-1.567,3.5-3.5V11.5L18.771,31.616L25.745,40.5z"></path><path fill="#ca3737" d="M3.603,12.759c0,0-1.334-0.938-1.488-2.055c-0.008,0.099-0.03,0.195-0.03,0.296 L2,11.473v17.799V37c0,1.933,1.567,3.5,3.5,3.5H7V15.247L3.603,12.759z"></path><path fill="#ca3737" d="M45.97,11.145c-0.154,1.117-1.488,1.614-1.488,1.614L41,15.31V40.5h1.5 c1.933,0,3.5-1.567,3.5-3.5v-7.729v-17.83C46,11.34,45.979,11.244,45.97,11.145z"></path><path fill="#bcbcbc" d="M3.42,13.31l20.623,14.973L44.665,13.31c0,0,0.937-0.661,1.335-1.531v-0.228	c-0.012-1.996-1.569-3.51-3.5-3.5h-37c-1.933,0-3.5,1.567-3.5,3.5v0.009C2.323,12.536,3.42,13.31,3.42,13.31z"></path><g><path fill="#f5f5f5" d="M42.5,8H24H5.5C3.567,8,2,9.536,2,11.5 c0,1.206,1.518,2.258,1.518,2.258L24,28.256 l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.536,44.433,8,42.5,8z"></path><path fill="#e84f4b" d="M43.246,8.082L24,21.5L4.754,8.082C3.18,8.419,2,9.797,2,11.5 c0,1.206,1.518,2.258,1.518,2.258L24,28.256l20.482-14.497c0,0,1.518-1.053,1.518-2.258C46,9.797,44.82,8.419,43.246,8.082z"></path></g>
        </svg>
    );

    const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
      <path fill="#0078d4" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path d="M30,35v-9c0-1.103-0.897-2-2-2s-2,0.897-2,2v9h-6V18h6v1.027C27.04,18.359,28.252,18,29.5,18	c3.584,0,6.5,2.916,6.5,6.5V35H30z M13,35V18h2.966C14.247,18,13,16.738,13,14.999C13,13.261,14.267,12,16.011,12	c1.696,0,2.953,1.252,2.989,2.979C19,16.733,17.733,18,15.988,18H19v17H13z" opacity=".05"></path><path d="M30.5,34.5V26c0-1.378-1.121-2.5-2.5-2.5s-2.5,1.122-2.5,2.5v8.5h-5v-16h5v1.534	c1.09-0.977,2.512-1.534,4-1.534c3.309,0,6,2.691,6,6v10H30.5z M13.5,34.5v-16h5v16H13.5z M15.966,17.5	c-1.429,0-2.466-1.052-2.466-2.501c0-1.448,1.056-2.499,2.511-2.499c1.436,0,2.459,1.023,2.489,2.489	c0,1.459-1.057,2.511-2.512,2.511H15.966z" opacity=".07"></path><path fill="#fff" d="M14,19h4v15h-4V19z M15.988,17h-0.022C14.772,17,14,16.11,14,14.999C14,13.864,14.796,13,16.011,13	c1.217,0,1.966,0.864,1.989,1.999C18,16.11,17.228,17,15.988,17z M35,24.5c0-3.038-2.462-5.5-5.5-5.5	c-1.862,0-3.505,0.928-4.5,2.344V19h-4v15h4v-8c0-1.657,1.343-3,3-3s3,1.343,3,3v8h4C35,34,35,24.921,35,24.5z"></path>
      </svg>
    );

    return (
        <div className="h-full flex flex-col p-4 gap-4">
             <h2 className="text-2xl font-bold text-black dark:text-white text-center mb-0">Get In Touch</h2>
            <div className="flex flex-col gap-4 flex-grow">
                {/* Form */}
                <BentoCard className="col-span-2 row-span-1 p-4">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-3">
                        <h3 className="font-bold text-lg">Send a Message</h3>
                        <div className="relative">
                            <Input 
                                name="email" 
                                type="email" 
                                placeholder="Your Email" 
                                value={formData.email}
                                onChange={handleInputChange}
                                className="bg-white/80 dark:bg-black/70 border-gray-400 dark:border-gray-600"
                            />
                            {errors.email && <p className="text-destructive text-xs mt-1 absolute">{errors.email}</p>}
                        </div>
                        <div className="relative flex-grow">
                            <Textarea 
                                name="message" 
                                placeholder="Your message..." 
                                value={formData.message}
                                onChange={handleInputChange}
                                className="bg-white/80 dark:bg-black/70 border-gray-400 dark:border-gray-600 h-full resize-none"
                            />
                             {errors.message && <p className="text-destructive text-xs mt-1 absolute">{errors.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-primary/80 hover:bg-primary">
                            Send Message <Send className="w-4 h-4 ml-2" />
                        </Button>
                    </form>
                </BentoCard>

                {/* Socials */}
                <div className="grid grid-cols-3 gap-4">
                    <a href="https://www.linkedin.com/in/vanshdeep-verma" target="_blank" rel="noopener noreferrer" className="group">
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <LinkedInIcon className="w-12 h-12" />
                            <p className="font-bold mt-2">LinkedIn</p>
                        </BentoCard>
                    </a>
                    <a href={`https://wa.me/918273438007?text=${encodeURIComponent("Hello Vansh..!!!, I came using your portfolio, It is a great feel to catch you up !!!")}`} target="_blank" rel="noopener noreferrer" className="group">
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <WhatsAppIcon className="w-12 h-12"/>
                            <p className="font-bold mt-2">WhatsApp</p>
                        </BentoCard>
                    </a>
                    <a href="mailto:mr.vanshverma2001@gmail.com" className="group">
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <GmailIcon className="w-12 h-12"/>
                            <p className="font-bold mt-2">Gmail</p>
                        </BentoCard>
                    </a>
                </div>
            </div>
        </div>
    );
};


export function GlassPanelLayout() {
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState('Home');
  
  const navItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: Heart, label: "Projects" },
    { icon: User, label: "Personal" },
    { icon: Briefcase, label: "Career" },
    { icon: Bell, label: "Contact" },
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (clientY - innerHeight / 2) / (innerHeight / 2);
      
      if (panelsContainerRef.current) {
        panelsContainerRef.current.style.transform = `
          rotateY(${x * 7}deg)
          rotateX(${-y * 7}deg)
        `;
      }
    };
    
    const handleMouseLeave = () => {
      if (panelsContainerRef.current) {
        panelsContainerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getPanelStyle = (panel: 'left' | 'right'): CSSProperties => {
    const baseRotation = panel === 'left' ? -25 : 25;
    
    return {
      transform: `perspective(1000px) rotateY(${baseRotation}deg)`,
      transformOrigin: panel === 'left' ? 'right center' : 'left center',
      transition: 'transform 0.4s ease-out',
    };
  };

  const renderContent = () => {
    switch (activeView) {
      case 'Home':
        return <BentoHomeGrid />;
      case 'Projects':
        return <ProjectsView />;
      case 'Personal':
        return (
            <div className="h-full flex flex-col gap-4">
                <h3 className="font-semibold text-black dark:text-white text-lg">Who Am I ?</h3>
                <div className="flex-grow bg-white/80 dark:bg-black/70 rounded-[20px] p-4 overflow-hidden">
                    <ScrollArea className="h-full w-full pr-4">
                        <div className="text-neutral-800 dark:text-neutral-100 space-y-3 text-sm">
                            <p>
                                Hello, I'm Vanshdeep, an ambitious young professional with a background in web development and data analytics. 
                                I hold a strong foundation in creating dynamic web applications and leveraging data for insightful business intelligence. 
                                I recently completed several projects focusing on React, Next.js, and Power BI. But wait, it’s not all about formalities and certificates! 
                            </p>
                            <p>
                                In my spare time, you’ll find me exploring new technologies, contributing to open-source projects, or jet-setting around the globe. 
                                I once embarked on an adventurous journey to build a complete full-stack application from scratch, acquiring adaptability, independence, and some seriously impressive problem-solving skills along the way. 
                            </p>
                            <p>
                                Now, I’m setting my sights on the role of a Senior Developer. Want to know more? Take a look around and uncover the real me!
                            </p>
                        </div>
                    </ScrollArea>
                </div>
                <h3 className="text-xl font-bold text-white mb-0 text-left">Tools and Technologies</h3>
            </div>
        );
      case 'Career':
        return <CareerTimeline />;
      case 'Contact':
        return <ContactView />;
      default:
        return null;
    }
  }

  const isScrollDisabled = activeView === 'Contact';

  return (
    <div className="relative z-20 w-full h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div style={{ perspective: '2000px' }}>
        <div 
          ref={panelsContainerRef}
          className="flex items-center justify-center gap-6 w-full max-w-[1300px]"
          style={{ transition: 'transform 0.3s ease-out' }}
        >
          <div className="h-[480px] hidden md:flex items-center">
            <GlassPanel
              className="w-[200px] h-fit p-4 flex-col"
              style={getPanelStyle('left')}
            >
              <div className="space-y-1">
                {navItems.map(item => (
                  <NavItem 
                    key={item.label}
                    icon={item.icon} 
                    label={item.label}
                    isActive={activeView === item.label}
                    onClick={() => setActiveView(item.label)} 
                  />
                ))}
              </div>
            </GlassPanel>
          </div>
          
           <div className="flex flex-col items-center gap-4">
              <GlassPanel 
                  className={cn(
                      "w-[600px] transition-all duration-300",
                      activeView === 'Personal' ? 'h-[336px]' : 'h-[480px]'
                  )} 
                  isContentPanel={true} 
                  activeView={activeView}
              >
                 <ScrollArea className="h-full w-full" style={{ overflowY: isScrollDisabled ? 'hidden' : 'auto' }}>
                    <div className={cn("h-full", !isScrollDisabled && 'pr-4')}>
                      {renderContent()}
                    </div>
                </ScrollArea>
              </GlassPanel>
              {activeView === 'Personal' && (
                <div className="w-[600px]">
                     <div className="relative group w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_20px,black_calc(100%-20px),transparent_100%)]">
                        <div className="flex shrink-0 gap-4 animate-scroll-x group-hover:[animation-play-state:paused]">
                            {technologiesWithIcons.map((tech, index) => (
                                <TechnologyCard key={`${tech.name}-${index}`} name={tech.name} icon={tech.icon} />
                            ))}
                            {technologiesWithIcons.map((tech, index) => (
                                <TechnologyCard key={`${tech.name}-duplicate-${index}`} name={tech.name} icon={tech.icon} />
                            ))}
                        </div>
                    </div>
                </div>
              )}
            </div>
          
          <GlassPanel
            className="w-[300px] h-[480px] p-6 flex-col hidden md:flex"
            style={getPanelStyle('right')}
          >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-black dark:text-white">About</h2>
                <Button asChild variant="ghost" className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full px-4 py-1 text-sm h-auto font-bold">
                  <a href="https://drive.google.com/file/d/1JdGrWi9uYqEd4LDoCwGS9tesLgxQHWFX/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                  </a>
                </Button>
            </div>
            
            
              <div className="bg-white/80 dark:bg-black/70 rounded-[20px] p-4 space-y-4 text-sm h-full">
                <ScrollArea className="h-full pr-2">
                    <div>
                        <h3 className="font-semibold text-black dark:text-white text-sm">How to use this website?</h3>
                        <p className="text-neutral-800 dark:text-neutral-100">Hello everyone, welcome to my portfolio website! This website offers a 3D experience created.</p>
                        <p className="text-neutral-800 dark:text-neutral-100">I know what you're thinking: "A portfolio website in 3D for a front-end developer? Is that really necessary?" In short, the answer is no. But it is fun! And it's a great way to showcase my work.</p>
                        <p className="text-neutral-800 dark:text-neutral-100">On this website, you'll find a collection of my projects, personal information, and information on my education and career. I hope you enjoy seeing what I can do. I won't keep you waiting any longer, so go take a look!</p>
                    </div>
                </ScrollArea>
              </div>
            
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
