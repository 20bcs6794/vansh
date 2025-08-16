

"use client";

import { type CSSProperties, forwardRef, useRef, useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Home as HomeIcon, Heart, User, Briefcase, Bell, Download, Check, MapPin, Link as LinkIcon, Award, ChevronRight, GraduationCap, Phone, Instagram, Send, Mail, ArrowRight, Loader2, AlertCircle, X, Maximize, Sun, Moon, Copy, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/ai/flows/send-email-flow';
import { type SendEmailInput } from '@/ai/schemas/send-email';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion, AnimatePresence } from 'framer-motion';


const BentoCard = ({ children, className, ...props }: { children: ReactNode, className?: string, [key: string]: any }) => (
    <div
        className={cn("bg-white/80 dark:bg-black/70 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ease-in-out", className)}
        {...props}
    >
        {children}
    </div>
);

const BentoHomeGrid = ({setActiveView}: {setActiveView: (view: string) => void}) => {
    const [isCopied, setIsCopied] = useState(false);
    const { theme } = useTheme();
    const isMobile = useIsMobile();

    const lightImage = "/images/light_user-removebg.png";
    const darkImage = "/images/dark_user-removebg-preview.png";
    const certificatesLink = "/document/resume.pdf";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('mr.vanshverma2001@gmail.com');
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000); 
    };

    if (isMobile) {
        const mobileCardClasses = "bg-white/50 text-neutral-800 dark:bg-black/70 dark:text-white";
        
        return (
            <ScrollArea className="h-full w-full hide-scrollbar">
                <div className="grid grid-cols-1 gap-4 h-full w-full p-4 text-white dark:text-white">
                    {/* Profile Card */}
                    <BentoCard className={cn(mobileCardClasses, "p-4 flex flex-col justify-start")}>
                        <div className="relative w-full max-w-[70%] mx-auto aspect-square rounded-xl overflow-hidden">
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
                        <div className="flex flex-col text-left mt-2">
                            <h2 className="text-lg font-extrabold">Hi, I'm Vanshdeep —</h2>
                            <p className="dark:text-neutral-400 text-neutral-700 mt-1 text-sm">Aspiring Software Engineer, Data Analyst, Web Developer</p>
                            <div className="flex items-center justify-between text-muted-foreground mt-2 text-sm">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    <span className="font-bold">New Delhi, India</span>
                                </div>
                                <Button asChild variant="secondary" size="sm" className="bg-primary/20 text-black backdrop-blur-sm dark:bg-primary dark:text-primary-foreground h-8">
                                    <a href="/document/resume.pdf" target="_blank" rel="noopener noreferrer">
                                        <Download className="w-3 h-3 mr-1" />
                                        Resume
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </BentoCard>

                    <div className="grid grid-cols-2 gap-4">
                         {/* Deployed Projects */}
                        <a onClick={() => setActiveView("Projects")} className="group col-span-1 cursor-pointer">
                            <BentoCard className={cn(mobileCardClasses, "h-full flex flex-col items-center justify-center p-2")}>
                                 <h3 className="text-3xl font-bold">09+</h3>
                                 <p className="dark:text-neutral-400 text-gray-600 text-xs uppercase tracking-wider text-center">Deployed Projects</p>
                            </BentoCard>
                        </a>

                        {/* Certificates */}
                        <a href={certificatesLink} target="_blank" rel="noopener noreferrer" className="group col-span-1">
                            <BentoCard className={cn(mobileCardClasses, "h-full flex flex-col items-center justify-center cursor-pointer p-2")}>
                                <div className="text-center">
                                    <h3 className="font-bold text-base">My Certificates</h3>
                                    <div className="flex justify-center items-center mt-2">
                                         <ChevronRight className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </BentoCard>
                        </a>
                    </div>

                    {/* Have a project in mind */}
                    <BentoCard className={cn(mobileCardClasses, "flex flex-col justify-center items-center")}>
                        <h3 className="font-bold text-base mb-2 text-center">Have a project in mind?</h3>
                        <div className="flex items-center justify-between gap-2 backdrop-blur bg-primary/30 dark:bg-primary/80 text-primary-foreground p-2 rounded-lg w-90">
                            <span className="text-sm font-mono font-bold text-black dark:text-white truncate">mr.vanshverma2001@gmail.com</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCopyEmail}
                                className={cn("h-7 w-7 shrink-0", isCopied ? "text-green-500" : "text-black dark:text-white")}
                            >
                                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </BentoCard>
                    
                     {/* Socials */}
                    <div className="grid grid-cols-3 gap-4">
                        <a href="https://www.linkedin.com/in/vanshdeep-verma" target="_blank" rel="noopener noreferrer" className="group">
                            <BentoCard className={cn(mobileCardClasses, "aspect-square items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105 p-4")}>
                                <Image src="/social_icons/linkedin.svg" alt="LinkedIn" width={56} height={56} />
                            </BentoCard>
                        </a>
                        <a href={`https://wa.me/918273438007?text=${encodeURIComponent("Hello Vansh..!!!, I came using your portfolio, It is a great feel to catch you up !!!")}`} target="_blank" rel="noopener noreferrer" className="group">
                            <BentoCard className={cn(mobileCardClasses, "aspect-square items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105 p-4")}>
                                <Image src="/social_icons/whatsapp.webp" alt="WhatsApp" width={56} height={56} />
                            </BentoCard>
                        </a>
                        <a href="mailto:mr.vanshverma2001@gmail.com" className="group">
                            <BentoCard className={cn(mobileCardClasses, "aspect-square items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-105 p-4")}>
                                <Image src="/social_icons/gmail.svg" alt="Gmail" width={56} height={56} />
                            </BentoCard>
                        </a>
                    </div>
                </div>
            </ScrollArea>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-fr gap-4 h-full w-full p-1">
            <BentoCard className="md:col-span-2 md:row-span-2 p-4 flex flex-col justify-start animate-expand-y" style={{ animationDelay: '0s' }}>
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
                <div className="flex flex-col flex-grow">
                    <h2 className="text-xl font-bold">Hi, I'm Vanshdeep —</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Aspiring Software Engineer, Data Analyst, Web Developer</p>
                    <div className="flex items-center text-muted-foreground mt-2 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="font-bold">New Delhi, India</span>
                    </div>
                    <div className="mt-auto pt-4">
                         <Button asChild className="w-full bg-primary/20 text-black dark:bg-primary dark:text-primary-foreground font-bold hover:bg-primary/30 dark:hover:bg-primary/90" size="default">
                            <a href="/document/resume.pdf" target="_blank" rel="noopener noreferrer">
                                <Download className="w-4 h-4 mr-2" />
                                View My Resume
                            </a>
                        </Button>
                    </div>
                </div>
            </BentoCard>
            
            <a href={certificatesLink} target="_blank" rel="noopener noreferrer" className="group animate-expand-x" style={{ animationDelay: '0.1s' }}>
                <BentoCard className="col-span-1 md:col-span-1 h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="text-center">
                        <h3 className="font-bold text-lg">My Certificates</h3>
                        <div className="flex justify-center items-center mt-2">
                             <ChevronRight className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-2" />
                        </div>
                    </div>
                </BentoCard>
            </a>

            <a onClick={() => setActiveView("Projects")} className="group animate-expand-x cursor-pointer" style={{ animationDelay: '0.2s' }}>
                <BentoCard className="col-span-1 md:col-span-1 h-full flex flex-col items-center justify-center">
                     <h3 className="text-5xl font-bold">09+</h3>
                     <p className="text-muted-foreground text-xs uppercase tracking-wider text-center">Deployed Projects</p>
                </BentoCard>
            </a>
            
            <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-center items-center animate-expand-y" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-bold text-lg mb-4 text-center">Have a project in mind?</h3>
                <div className="w-auto flex items-center justify-between gap-2 bg-primary/20 dark:bg-primary/80 text-primary-foreground p-2 rounded-lg">
                    <span className="text-xs font-sans text-black dark:text-white truncate">mr.vanshverma2001@gmail.com</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyEmail}
                        className={cn("h-7 w-7 shrink-0", isCopied ? "text-green-500" : "text-black dark:text-white")}
                    >
                        {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                </div>
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
      "flex items-center gap-4 px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors duration-300 ease-in-out font-bold text-base",
      isActive && "bg-white/10 dark:bg-white/10 shadow-[0_0_8px_1px_rgba(255,255,255,0.4)] text-black dark:text-white"
    )}>
      <Icon className="w-5 h-5" />
      <span className="text-base">{label}</span>
    </button>
  );
};

const ProjectBentoCard = ({ project, onHover }: { project: any, onHover: (description: string | null) => void }) => {
    return (
        <div
            onMouseEnter={() => onHover(project.fullDescription)}
            onMouseLeave={() => onHover(null)}
            className={cn(
                "relative text-white transition-all duration-300 ease-in-out cursor-pointer rounded-xl overflow-hidden bg-gradient-to-br p-6 flex flex-col justify-center items-center h-full group",
                project.bgColor
            )}
            style={{ gridArea: project.gridArea }}
        >
            <div className="text-center transition-all duration-300 group-hover:blur-sm group-hover:scale-90">
                <h3 className="font-bold text-lg">{project.name}</h3>
                <div className="flex gap-1 flex-wrap mt-1 justify-center">
                    {project.tech.slice(0, 5).map((t: string) => <span key={t} className="text-xs bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">{t}</span>)}
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button asChild variant="secondary" className="bg-white/30 hover:bg-white/40 text-white font-bold backdrop-blur-sm shadow-lg px-4 py-2 rounded-lg">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        View Project
                    </a>
                </Button>
            </div>
        </div>
    );
};

const ProjectsView = ({ onProjectHover }: { onProjectHover: (description: string | null) => void }) => {
    const isMobile = useIsMobile();
    const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    const projectsData = [
      {
        id: 2,
        name: 'Dabur Bot Clone',
        description: 'A conversational AI bot powered by Gen AI and Dialogflow to automate customer support and handle queries efficiently.',
        fullDescription: 'This project is a clone of the Dabur support bot, built using Gen AI and Next.js. It integrates with Dialogflow via REST APIs to provide intelligent, automated responses to user queries, showcasing skills in building conversational AI and full-stack development.',
        tech: ['Gen AI', 'Next.js', 'Dialogflow', 'REST API', 'JavaScript', 'Tailwind CSS'],
        link: 'https://dabur-project-vanshdeep.netlify.app/',
        bgColor: 'from-red-500 to-orange-600',
        gridArea: 'a'
      },
      {
        id: 3,
        name: 'Get Jobby App',
        description: 'A job search platform built with React, featuring JWT authentication and a clean, responsive UI for finding opportunities.',
        fullDescription: 'Get Jobby is a comprehensive job search application built with React. It uses JWT for secure authentication, React Router for navigation, and fetches job data via REST APIs. The project demonstrates strong front-end development skills and the ability to build a secure, multi-page application.',
        tech: ['React.js', 'JWT Auth', 'React Router', 'Fetch API', 'Tailwind CSS'],
        link: 'https://getjobby43.ccbp.tech/',
        bgColor: 'from-blue-500 to-cyan-600',
        gridArea: 'b'
      },
      {
        id: 1,
        name: 'Helpdesk Performance Dashboard',
        description: 'A Power BI dashboard analyzing customer interactions and help desk performance, tracking metrics like issue resolution times and SLAs.',
        fullDescription: "This Power BI dashboard provides insights into help desk performance, tracking metrics like customer interactions and issue resolution times. It highlights how agents effectively manage hardware issues and maintain service levels, ensuring solutions are provided without breaching SLAs.",
        tech: ['Power BI', 'SQL', 'DAX', 'Python', 'Excel'],
        link: 'https://app.powerbi.com/reportEmbed?reportId=a4f4d3a9-b969-4371-ae4c-37eb50af0c9f&autoAuth=true&ctid=301286c1-17fc-48da-84b1-ea115f6778b4',
        bgColor: 'from-purple-500 to-indigo-600',
        gridArea: 'c'
      },
      {
        id: 8,
        name: 'Trendz App',
        description: 'An e-commerce style application for browsing products, featuring secure authentication and a modern, responsive design.',
        fullDescription: 'Trendz is a mock e-commerce application built with React. It includes user authentication with JWT, protected routes using React Router, and fetches product data from a REST API. The project demonstrates the ability to build a feature-rich, secure, and modern web application.',
        tech: ['React.js', 'React Router', 'REST API', 'JWT Auth'],
        link: 'https://vanshtrendz.ccbp.tech/',
        bgColor: 'from-rose-500 to-red-600',
        gridArea: 'd'
      },
      {
        id: 4,
        name: 'Money Manager',
        description: 'A simple and effective personal finance tracker to manage income and expenses, built with React and modern CSS.',
        fullDescription: 'Money Manager is a straightforward personal finance application that helps users track their income and expenses. Built with React, it showcases component-based architecture and state management, with a clean and intuitive interface styled using modern CSS and Flexbox.',
        tech: ['React.js', 'JavaScript', 'JSX', 'CSS3', 'Flexbox'],
        link: 'https://moneymanager43.ccbp.tech/',
        bgColor: 'from-green-500 to-teal-600',
        gridArea: 'e'
      },
      {
        id: 6,
        name: 'Timeline App',
        description: 'A responsive timeline component to display events or historical data in a clear and chronological order.',
        fullDescription: 'The Timeline app is a reusable React component for displaying a series of events in chronological order. It uses modern CSS for styling and is fully responsive, showcasing the ability to build modular and visually appealing UI components.',
        tech: ['React.js', 'JSX', 'JavaScript', 'CSS3'],
        link: 'https://worktimeline.ccbp.tech/',
        bgColor: 'from-fuchsia-500 to-pink-600',
        gridArea: 'f'
      },
      {
        id: 9,
        name: 'GitHub Repo Explorer',
        description: 'A tool to fetch and display public repositories from a GitHub user, using the official GitHub REST API.',
        fullDescription: "This application allows users to explore a user's public repositories by fetching data from the GitHub REST API. Built with React, it's a practical demonstration of integrating with third-party APIs and displaying dynamic data in a clean, user-friendly interface.",
        tech: ['React.js', 'GitHub REST API', 'JavaScript', 'CSS3'],
        link: 'https://vanshrepos.ccbp.tech/',
        bgColor: 'from-slate-600 to-gray-800',
        gridArea: 'g'
      },
    ].map((p, i) => ({ ...p, animation: 'animate-expand-y', delay: `${i * 0.1}s` }));

    const containerClasses = isMobile
      ? "h-full flex flex-col p-4 text-white"
      : "h-full flex flex-col p-4";

    useEffect(() => {
        if (isMobile && expandedProjectId !== null) {
            const projectIndex = projectsData.findIndex(p => p.id === expandedProjectId);
            if (projectIndex !== -1 && projectRefs.current[projectIndex]) {
                setTimeout(() => {
                    projectRefs.current[projectIndex]?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
                }, 300); // Wait for animation to finish
            }
        }
    }, [expandedProjectId, isMobile, projectsData]);


    if(isMobile) {
        return (
            <div className={containerClasses}>
                <h2 className="text-2xl font-bold mb-4 shrink-0">My Works</h2>
                <div className="flex-grow min-h-0 relative">
                    <ScrollArea className="absolute inset-0 h-full w-full hide-scrollbar">
                        <div className="grid grid-cols-1 gap-4 p-1 pb-2">
                            {projectsData.map((project, index) => {
                                const isExpanded = expandedProjectId === project.id;
                                const expandUp = index >= projectsData.length - 3;

                                const content = (
                                    <div className="text-center">
                                        <h3 className="font-bold text-lg">{project.name}</h3>
                                        <div className="flex gap-1 flex-wrap mt-1 justify-center">
                                            {project.tech.slice(0, 3).map((t: string) => <span key={t} className="text-xs bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">{t}</span>)}
                                        </div>
                                    </div>
                                );
                                
                                const expandedContent = (
                                    <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: expandUp ? '0' : '0', marginBottom: expandUp ? '1rem' : '0' }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: expandUp ? '0' : '1rem', marginBottom: expandUp ? '1rem' : '0' }}
                                            exit={{ opacity: 0, height: 0, marginTop: expandUp ? '0' : '0', marginBottom: '0' }}
                                            transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.4 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-sm text-center mb-4">{project.fullDescription}</p>
                                            <Button asChild variant="secondary" className="bg-white/30 hover:bg-white/40 text-white font-bold backdrop-blur-sm shadow-lg px-4 py-2 rounded-lg w-full">
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                                    View Project
                                                </a>
                                            </Button>
                                        </motion.div>
                                    )}
                                    </AnimatePresence>
                                );

                                return (
                                    <div
                                        key={project.id}
                                        ref={el => { if (projectRefs.current) projectRefs.current[index] = el; }}
                                        className={cn(
                                            "relative text-white transition-all duration-300 ease-in-out cursor-pointer rounded-xl overflow-hidden p-4 flex flex-col justify-center bg-gradient-to-br",
                                            project.bgColor
                                        )}
                                        onClick={() => setExpandedProjectId(isExpanded ? null : project.id)}
                                    >
                                        {expandUp && expandedContent}
                                        {content}
                                        {!expandUp && expandedContent}
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        )
    }

    return (
        <div className={containerClasses}>
            <h2 className="text-2xl font-bold mb-4 shrink-0 animate-expand-x">My Works</h2>
            <div className="flex-grow min-h-0 relative">
                <ScrollArea className="absolute inset-0 h-full w-full hide-scrollbar">
                    <div 
                        className="p-1 h-full w-full"
                        style={{
                            display: 'grid',
                            gridTemplateAreas: `
                                "a a b c"
                                "d e e c"
                                "f g g g"
                            `,
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            gridTemplateRows: '1fr 1fr 1fr',
                            gap: '1rem',
                        }}
                    >
                        {projectsData.map(project => (
                            <ProjectBentoCard 
                                key={project.id} 
                                project={project} 
                                onHover={onProjectHover} 
                            />
                        ))}
                    </div>
                </ScrollArea>
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

const technologiesWithIcons = [
    { name: 'Python', icon: "/tech_icons/python.svg" },
    { name: 'HTML', icon: "/tech_icons/html.svg" },
    { name: 'CSS', icon: "/tech_icons/css.svg" },
    { name: 'JavaScript', icon: "/tech_icons/javascript.svg" },
    { name: 'Bootstrap', icon: "/tech_icons/bootstrap.svg" },
    { name: 'SQLite', icon: "/tech_icons/sqlite.svg" },
    { name: 'Git', icon: "/tech_icons/git.svg" },
    { name: 'Tailwind CSS', icon: "/tech_icons/tailwind.svg" },
    { name: 'React', icon: "/tech_icons/react.svg" },
    { name: 'Node.js', icon: "/tech_icons/node-js-icon.svg" },
    { name: 'Next.js', icon: "/tech_icons/nextjs.svg" },
    { name: 'MySQL', icon: "/tech_icons/mysql.svg" },
    { name: 'AWS', icon: "/tech_icons/aws.svg" },
    { name: 'Power BI', icon: "/tech_icons/powerbi.svg" },
    { name: 'Excel', icon: "/tech_icons/excel.svg" },
];

const TechnologyCard = ({ name, icon }: { name: string, icon: string }) => (
    <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center text-center gap-2 w-24 h-24 transition-transform duration-300 ease-in-out hover:scale-105">
        <div className="h-12 flex items-center justify-center">
            <Image src={icon} alt={name} width={40} height={40} className="object-contain" priority />
        </div>
        <span className="font-medium text-xs text-neutral-800"><strong>{name}</strong></span>
    </div>
);

const careerTimelineData = [
  {
    icon: Briefcase,
    logo: '/icons/cache_digitech_pvt_ltd_logo.webp',
    title: "Data Analyst",
    company: "Cache Digitech pvt Ltd.",
    location: "New Delhi, India",
    period: "May 2025 - Present",
    description: (
      <>
        <p className="text-sm mt-2">
            Streamlined internal tools and reporting processes to improve speed, accuracy, and data usability.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
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
    logo: '/icons/Dabur_Logo.svg',
    title: "Software Engineer Intern",
    company: "Dabur India Limited",
    location: "Noida, India",
    period: "July 2024 - Jan 2025",
    description: (
       <>
        <p className="text-sm mt-2">
            Contributed to AI automation and SEO strategies to boost user support efficiency and digital reach.
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
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
    logo: '/icons/chandigarh_univerisity_logo_1.svg',
    title: "Bachelor of Engineering in Computer Science",
    company: "Chandigarh University",
    grade: "Grade: A+",
    location: "Punjab, India",
    period: "2020 - 2024",
    description: "Graduated with honors, specializing in Artificial Intelligence and machine learning. Completed a final year project on an complete AI Model which will reduce the human work on computer Systems. Graduated with a solid academic record and multiple industry-recognized certifications, while actively applying skills through projects and internships."
  },
  {
    icon: GraduationCap,
    logo: '/icons/ddps_logo.svg',
    title: "Senior Secondary School Diploma",
    company: "Midtown School [D.D.P.S Bijnor]",
    location: "Bijnor, India",
    period: "2019 - 2020",
    description: "Focused on advanced placement courses in Mathematics and Computer Science, setting a strong foundation for a career in technology."
  }
];

const CareerTimeline = () => {
    const isMobile = useIsMobile();
    const { theme } = useTheme();

    const containerClasses = isMobile
      ? "h-full flex flex-col p-4 text-white"
      : "h-full flex flex-col p-4";

    if (isMobile) {
        const mobileCardClasses = cn(
            "p-4 rounded-lg shadow-md w-full",
            "bg-white/80 text-neutral-800 dark:bg-black/70 backdrop-blur-sm dark:text-white"
        );
        return (
            <div className={containerClasses}>
                <h2 className="text-3xl font-extrabold mb-4 shrink-0 text-neutral-800 dark:text-white">Where I have Been, What I have Done</h2>
                <div className="flex-grow min-h-0">
                    <ScrollArea className="h-full pr-4 hide-scrollbar">
                        <div className="flex flex-col gap-y-4">
                            {careerTimelineData.map((item, index) => (
                                <div key={index} className={mobileCardClasses}>
                                    <div className="flex items-start gap-4">
                                        {item.logo && (
                                            <Image src={item.logo} alt={`${item.company} logo`} width={48} height={48} className="rounded-md bg-white p-1" />
                                        )}
                                        <div className="flex-grow">
                                            <h3 className="font-bold text-base">{item.title}</h3>
                                            <p className="text-sm font-semibold">{item.company}</p>
                                            {item.grade && <p className="text-sm text-muted-foreground">{item.grade}</p>}
                                            <div className="flex items-center gap-x-2 text-sm text-muted-foreground mt-1">
                                                <span>{item.period}</span>
                                                {item.location && <span>•</span>}
                                                {item.location && <span>{item.location}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm mt-3">{item.description}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        )
    }
      
    return (
        <div className={containerClasses}>
            <h2 className="text-2xl font-bold mb-4 shrink-0 animate-expand-x" style={{animationDelay: '0s'}}>Where I’ve Been, What I’ve Done</h2>
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-4 hide-scrollbar">
                    <div className="relative flex flex-col gap-y-10">
                        <div className="absolute left-32 top-0 h-full w-1 bg-white/80 dark:bg-black/70 translate-x-1/2 animate-expand-y" />

                        {careerTimelineData.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="grid grid-cols-[auto_auto_1fr] items-start animate-expand-x" style={{animationDelay: `${index * 0.1 + 0.1}s`}}>
                                    <div className="w-28 text-left">
                                        <div className="bg-white/80 dark:bg-black/70 p-3 rounded-lg shadow-md">
                                            <p className="font-bold text-base text-black dark:text-white">{item.period}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className=" relative z-10 bg-background p-1 left-1 rounded-full border-2 border-border">
                                            <Icon className="w-5 h-5 text-black dark:text-white" />
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white/80 dark:bg-black/70 p-4 rounded-lg ml-4 shadow-md">
                                        <div className="flex items-start gap-4">
                                            {item.logo && (
                                                <Image src={item.logo} alt={`${item.company} logo`} width={56} height={56} className="rounded-md bg-white p-1 shrink-0" />
                                            )}
                                            <div className="flex-grow">
                                                <h3 className="font-bold text-lg text-black dark:text-white">{item.title}</h3>
                                                <p className="text-md text-muted-foreground font-semibold">
                                                    {item.company} 
                                                </p>
                                                {item.grade && <p className="text-sm text-muted-foreground">{item.grade}</p>}
                                                {item.location && (
                                                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                                                        <MapPin className="w-4 h-4 mr-2" />
                                                        <span>{item.location}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm text-neutral-800 dark:text-neutral-100 mt-3">{item.description}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

const ContactView = () => {
    const [formData, setFormData] = useState<SendEmailInput>({ email: '', message: '' });
    const [errors, setErrors] = useState({ email: '', message: '' });
    const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            email: !formData.email ? 'Email is required.' : '',
            message: !formData.message ? 'Message is required.' : '',
        };
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.message) {
            setFormStatus('loading');
            try {
                const result = await sendEmail(formData);
                if (result.success) {
                    setFormStatus('success');
                     setTimeout(() => {
                        setFormStatus('idle');
                        setFormData({ email: '', message: '' });
                    }, 3000);
                } else {
                    setFormStatus('error');
                    setTimeout(() => setFormStatus('idle'), 3000);
                }
            } catch (error) {
                console.error('Failed to send email:', error);
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 3000);
            }
        }
    };
    
    const getButtonContent = () => {
        switch (formStatus) {
            case 'loading':
                return <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>;
            case 'success':
                return <><Check className="w-4 h-4 mr-2" /> Message Sent!</>;
            case 'error':
                return <><AlertCircle className="w-4 h-4 mr-2" /> Error! Retry</>;
            default:
                return <>Send Message <Send className="w-4 h-4 ml-2" /></>;
        }
    };

    return (
        <div className="h-full flex flex-col p-4 gap-4">
             <h2 className="text-2xl font-bold text-black dark:text-white text-center mb-0 animate-expand-x" style={{animationDelay: '0s'}}>Get In Touch</h2>
            <div className="flex flex-col gap-4 flex-grow">
                {/* Form */}
                <BentoCard className="col-span-2 row-span-1 p-4 animate-expand-y" style={{animationDelay: '0.1s'}}>
                    <form onSubmit={handleSubmit} className="flex flex-col h-full space-y-3">
                        <h3 className="font-bold text-lg">Send a Message</h3>
                        <div>
                            <Input 
                                name="email" 
                                type="email" 
                                placeholder={errors.email || "Your Email"} 
                                value={formData.email}
                                onChange={handleInputChange}
                                className={cn(
                                    "bg-white/80 dark:bg-black/70 border-gray-400 dark:border-gray-600",
                                    errors.email && "placeholder:text-destructive/80"
                                )}
                                disabled={formStatus === 'loading' || formStatus === 'success'}
                            />
                        </div>
                        <div className="flex-grow">
                            <Textarea 
                                name="message" 
                                placeholder={errors.message || "Your message..."}
                                value={formData.message}
                                onChange={handleInputChange}
                                className={cn(
                                    "bg-white/80 dark:bg-black/70 border-gray-400 dark:border-gray-600 h-full resize-none",
                                    errors.message && "placeholder:text-destructive/80"
                                )}
                                disabled={formStatus === 'loading' || formStatus === 'success'}
                            />
                        </div>
                        <Button 
                            type="submit" 
                            className={cn(
                                "w-full bg-primary/80 hover:bg-primary transition-all duration-300",
                                formStatus === 'success' && 'bg-green-600 hover:bg-green-700',
                                formStatus === 'error' && 'bg-destructive hover:bg-destructive/90',
                            )}
                            disabled={formStatus === 'loading' || formStatus === 'success'}
                        >
                            {getButtonContent()}
                        </Button>
                    </form>
                </BentoCard>

                {/* Socials */}
                <div className="grid grid-cols-3 gap-4">
                    <a href="https://www.linkedin.com/in/vanshdeep-verma" target="_blank" rel="noopener noreferrer" className="group animate-expand-y" style={{animationDelay: '0.2s'}}>
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <Image src="/social_icons/linkedin.svg" alt="LinkedIn" width={48} height={48} />
                            <p className="font-bold mt-2">LinkedIn</p>
                        </BentoCard>
                    </a>
                    <a href={`https://wa.me/918273438007?text=${encodeURIComponent("Hello Vansh..!!!, I came using your portfolio, It is a great feel to catch you up !!!")}`} target="_blank" rel="noopener noreferrer" className="group animate-expand-y" style={{animationDelay: '0.3s'}}>
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <Image src="/social_icons/whatsapp.svg" alt="WhatsApp" width={48} height={48} />
                            <p className="font-bold mt-2">WhatsApp</p>
                        </BentoCard>
                    </a>
                    <a href="mailto:mr.vanshverma2001@gmail.com" className="group animate-expand-y" style={{animationDelay: '0.4s'}}>
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <Image src="/social_icons/gmail.svg" alt="Gmail" width={48} height={48} />
                            <p className="font-bold mt-2">Gmail</p>
                        </BentoCard>
                    </a>
                </div>
            </div>
        </div>
    );
};

const MobileNav = ({ activeView, setActiveView, navItems }: { activeView: string, setActiveView: (view: string) => void, navItems: any[] }) => {
    const { toggleTheme } = useTheme();
    return (
        <div className="fixed top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-sm p-2 m-2 rounded-lg">
            <div className="flex justify-around items-center">
                {navItems.map(item => (
                    <button
                        key={item.label}
                        onClick={() => setActiveView(item.label)}
                        className={cn(
                            "flex flex-col items-center gap-1 text-xs p-1 rounded-md text-white flex-1 transition-colors duration-300 ease-in-out",
                            activeView === item.label ? "bg-white/20" : ""
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </button>
                ))}
                 <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleTheme();
                    }}
                    className="text-white hover:bg-white/10 hover:text-white"
                >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </div>
        </div>
    );
};


export function GlassPanelLayout({ orientation }: { orientation?: { beta: number | null, gamma: number | null } }) {
  const panelsContainerRef = useRef<HTMLDivElement>(null);
  const [activeViewIndex, setActiveViewIndex] = useState(0);
  const [projectDescriptionForRightPanel, setProjectDescriptionForRightPanel] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const [direction, setDirection] = useState(0);
  const { theme } = useTheme();

  const navItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: Heart, label: "Projects" },
    { icon: User, label: "Personal" },
    { icon: Briefcase, label: "Career" },
    { icon: Phone, label: "Contact"}
  ];
  
  const mobileNavItems = [
    { icon: HomeIcon, label: "Home" },
    { icon: User, label: "Personal" },
    { icon: Briefcase, label: "Career" },
    { icon: Heart, label: "Projects" }
  ];

  const activeView = (isMobile ? mobileNavItems : navItems)[activeViewIndex]?.label;


  const setActiveView = (label: string) => {
      const itemArray = isMobile ? mobileNavItems : navItems;
      const newIndex = itemArray.findIndex(item => item.label === label);
      if (newIndex === -1) return;

      if (newIndex > activeViewIndex) {
        setDirection(1);
      } else if (newIndex < activeViewIndex) {
        setDirection(-1);
      } else {
        setDirection(0);
      }
      setActiveViewIndex(newIndex);
  };
  
  const paginate = (newDirection: number) => {
    let newIndex = activeViewIndex + newDirection;
    if (newIndex < 0) {
        newIndex = mobileNavItems.length -1;
    } else if (newIndex >= mobileNavItems.length) {
        newIndex = 0;
    }
    setDirection(newDirection > 0 ? 1 : -1);
    setActiveViewIndex(newIndex);
  };
  
  useEffect(() => {
    if (isMobile === undefined) return;
    if (isMobile) {
        const { beta, gamma } = orientation || { beta: 0, gamma: 0 };
        const yPos = (beta ? beta - 45 : 0) / 45;
        const xPos = (gamma ?? 0) / 45;
        
        const horizontalMoveStrength = 20;
        const verticalMoveStrength = 10;
        
        if (panelsContainerRef.current) {
            panelsContainerRef.current.style.transform = `
                perspective(1000px)
                rotateY(${xPos * 7}deg)
                rotateX(${-yPos * 7}deg)
                translateX(${-xPos * horizontalMoveStrength}px)
                translateY(${-yPos * verticalMoveStrength}px)
            `;
        }
        return;
    };

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
  }, [isMobile, orientation]);

  const getPanelStyle = (panel: 'left' | 'right'): CSSProperties => {
    const baseRotation = panel === 'left' ? 25 : -25;
    
    return {
      transform: `perspective(1000px) rotateY(${baseRotation}deg)`,
      transformOrigin: panel === 'left' ? 'right center' : 'left center',
      transition: 'transform 0.4s ease-out',
    };
  };

  const animationVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const renderContent = () => {
    let content;
    const containerClasses = isMobile
        ? "h-full w-full overflow-y-auto pt-20 px-4"
        : "h-full";
        
    let finalContainerClasses = containerClasses;
    if (isMobile) {
      if (activeView === 'Home') {
        finalContainerClasses = "h-screen w-full overflow-hidden pt-20 px-2";
      } else if (activeView === 'Personal') {
        finalContainerClasses = "h-full w-full pt-20 px-2 flex flex-col";
      }
    }

    switch (activeView) {
      case 'Home':
        content = <BentoHomeGrid setActiveView={setActiveView} />;
        break;
      case 'Projects':
        content = <ProjectsView onProjectHover={setProjectDescriptionForRightPanel} />;
        break;
      case 'Personal':
        content = (
          <div className="h-full flex flex-col p-4 gap-4">
            <div
                className={cn(
                    "p-4 flex flex-col",
                    isMobile 
                        ? "bg-white/80 text-neutral-800 dark:bg-black/70 font-semibold backdrop-blur-sm dark:text-white rounded-[20px] h-[70%]" 
                        : "bg-white/80 dark:bg-black/70 rounded-[20px] flex-grow min-h-0",
                )}
            >
              <div className="flex justify-between items-center mb-2 shrink-0">
                  <h3 className={cn("font-extrabold text-lg", isMobile ? "dark:text-white" : "")}>Who Am I ?</h3>
                   {isMobile && (
                     <a href="/document/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/20 dark:bg-black/30 px-3 py-1 rounded-lg text-xs font-bold">
                       <Download className="w-3 h-3" />
                       <span>Resume</span>
                     </a>
                   )}
              </div>
              <div className={cn("relative mb-2 flex-grow min-h-0")}>
                <div className={cn("space-y-3 text-sm absolute inset-0")}>
                  <ScrollArea className={cn("h-full pr-4")}>
                    <div className={cn("space-y-3 text-sm pr-2", isMobile ? "text-neutral-800 dark:text-neutral-100" : "text-neutral-800 dark:text-neutral-100")}>
                      <p>
                        I’m <strong>Vanshdeep Verma</strong>, a technology professional who blends <strong>data analytics</strong>, <strong>frontend development</strong>, and <strong>process optimization</strong> to create solutions that deliver measurable business impact. I bridge the gap between technical execution, business objectives, and cross-team collaboration, ensuring every project achieves tangible ROI.
                      </p>
                      <p>My work has consistently resulted in:</p>
                      <ul className="list-disc list-inside">
                          <li ><strong>40%+ operational efficiency gains through automation</strong></li>
                          <li ><strong>30% faster reporting cycles via workflow optimization</strong></li>
                          <li >Higher customer engagement through improved digital experiences</li>
                      </ul>
                      <p>
                        With experience across data-driven strategy, automation, and user-focused innovation, I help organizations scale smarter, operate faster, and make decisions backed by actionable insights.
                      </p>
                      <p>I focus on delivering value at three levels:</p>
                      <ul className="list-disc list-inside space-y-1">
                          <li><strong>Technical</strong> – Building scalable, data-powered tools and digital platforms</li>
                          <li><strong>Business</strong> – Aligning solutions with strategic goals to maximize ROI</li>
                          <li><strong>Management</strong> – Coordinating with stakeholders to ensure on-time, high-quality delivery.</li>
                      </ul>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
            <div className={cn("flex flex-col animate-expand-x")} style={{ animationDelay: '0.1s' }}>
              <h3 className={cn("text-xl font-bold text-left shrink-0 mb-2", isMobile ? "text-white" : "")}>Tools and Technologies</h3>
              <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_20px,black_calc(100%-20px),transparent_100%)]">
                <div className="flex w-max animate-scroll-x gap-4 mt-3">
                  <div className="flex shrink-0 gap-4">
                    {technologiesWithIcons.map((tech, index) => (
                      <TechnologyCard key={`${tech.name}-${index}`} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>
                  <div className="flex shrink-0 gap-4" aria-hidden="true">
                    {technologiesWithIcons.map((tech, index) => (
                      <TechnologyCard key={`${tech.name}-duplicate-${index}`} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'Career':
        content = <CareerTimeline />;
        break;
      case 'Contact':
        content = <ContactView />;
        break;
      default:
        content = null;
    }
    
    return (
        <div className={finalContainerClasses}>
            {isMobile ? (
                 <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={activeViewIndex}
                        custom={direction}
                        variants={animationVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 350, damping: 35 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.5}
                        dragPropagation
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = Math.abs(offset.x);
                            if (swipe > 50) {
                                paginate(offset.x > 0 ? -1 : 1);
                            }
                        }}
                        className="h-full w-full"
                    >
                        {content}
                    </motion.div>
                </AnimatePresence>
            ) : (
                content
            )}
        </div>
    );
  }

  const originalAboutContent = (
      <div>
          <h3 className="font-semibold text-black dark:text-white text-sm">How to use this website?</h3>
          <p className="text-neutral-800 dark:text-neutral-100">Hello everyone, welcome to my portfolio website! This website offers a 3D experience created.</p>
          <p className="text-neutral-800 dark:text-neutral-100">I know what you're thinking: "A portfolio website in 3D for a front-end developer? Is that really necessary?" In short, the answer is no. But it is fun! And it's a great way to showcase my work.</p>
          <p className="text-neutral-800 dark:text-neutral-100">On this website, you'll find a collection of my projects, personal information, and information on my education and career. I hope you enjoy seeing what I can do. I won't keep you waiting any longer, so go take a look!</p>
      </div>
  );
  
  if (isMobile === undefined) {
    return null; // Don't render anything on the server or until the hook is ready
  }

  if (isMobile) {
      return (
          <div 
              className="relative z-20 w-full h-screen flex flex-col items-center justify-start overflow-hidden"
          >
              <MobileNav activeView={activeView} setActiveView={setActiveView} navItems={mobileNavItems} />
              <div ref={panelsContainerRef} className="w-full h-full" style={{ transition: 'transform 0.2s ease-out' }}>
                {renderContent()}
              </div>
          </div>
      )
  }

  return (
    <div className="relative z-20 w-full h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div style={{ perspective: '2000px' }}>
        <div 
          ref={panelsContainerRef}
          className="flex items-center justify-center w-full max-w-[1300px]"
          style={{ transition: 'transform 0.3s ease-out' }}
        >
          <div className="h-auto hidden md:flex items-center">
            <GlassPanel
              className="w-auto p-4 flex-col"
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
          
           <GlassPanel 
               className={cn(
                   "w-[600px] h-[480px] transition-all duration-500 ease-in-out mx-6"
               )} 
               isContentPanel={true} 
               activeView={activeView}
           >
             {renderContent()}
           </GlassPanel>
          
          <GlassPanel
            className="w-[300px] h-[480px] p-6 flex-col hidden md:flex"
            style={getPanelStyle('right')}
          >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-black dark:text-white">About</h2>
            </div>
            
            <div className="bg-white/80 dark:bg-black/70 rounded-[20px] p-4 text-sm h-full flex flex-col">
              <ScrollArea className="flex-grow">
                <div className="text-neutral-800 dark:text-neutral-100 space-y-2 pr-2">
                   {projectDescriptionForRightPanel ? (
                      <div>
                          <h3 className="font-semibold text-black dark:text-white text-sm mb-2">Project Details</h3>
                          <p>{projectDescriptionForRightPanel}</p>
                      </div>
                  ) : originalAboutContent}
                </div>
              </ScrollArea>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
    

    









    

    




