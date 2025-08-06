

"use client";

import { type CSSProperties, forwardRef, useRef, useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Home as HomeIcon, Heart, User, Briefcase, Bell, Download, Check, MapPin, Link as LinkIcon, Award, ChevronRight, GraduationCap, Phone, Instagram, Send, Mail, ArrowRight, Loader2, AlertCircle, X, Maximize, Sun, Moon } from 'lucide-react';
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


const BentoCard = ({ children, className, ...props }: { children: ReactNode, className?: string, [key: string]: any }) => (
    <div
        className={cn("bg-white/80 dark:bg-black/70 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300", className)}
        {...props}
    >
        {children}
    </div>
);

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


const BentoHomeGrid = () => {
    const [isCopied, setIsCopied] = useState(false);
    const { theme } = useTheme();
    const isMobile = useIsMobile();

    const lightImage = "/images/dark_theme_user.jpg";
    const darkImage = "/images/light_theme_user.jpg";
    const certificatesLink = "https://drive.google.com/uc?export=view&id=1JdGrWi9uYqEd4LDoCwGS9tesLgxQHWFX";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('mr.vanshverma2001@gmail.com');
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 5000); 
    };

    if (isMobile) {
        return (
            <div className="grid grid-cols-1 gap-4 h-full w-full p-4 text-black dark:text-white">
                {/* Profile Card */}
                <BentoCard className="p-4 flex flex-col justify-start bg-white/10 dark:bg-black/20">
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
                        <h2 className="text-lg font-bold">Hi, I'm Vanshdeep —</h2>
                        <p className="text-neutral-800 dark:text-neutral-200 mt-1 text-sm">Aspiring Software Engineer, Data Analyst, Web Developer</p>
                        <div className="flex items-center text-neutral-800 dark:text-neutral-200 mt-2 text-sm">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>New Delhi, India</span>
                        </div>
                    </div>
                </BentoCard>

                <div className="grid grid-cols-2 gap-4">
                     {/* Deployed Projects */}
                    <BentoCard className="col-span-1 flex flex-col items-center justify-center bg-white/10 dark:bg-black/20">
                         <h3 className="text-3xl font-bold">09+</h3>
                         <p className="text-neutral-800 dark:text-neutral-200 text-xs uppercase tracking-wider text-center">Deployed Projects</p>
                    </BentoCard>

                    {/* Certificates */}
                    <a href={certificatesLink} target="_blank" rel="noopener noreferrer" className="group col-span-1">
                        <BentoCard className="h-full flex flex-col items-center justify-center cursor-pointer bg-white/10 dark:bg-black/20">
                            <div className="text-center">
                                <h3 className="font-bold text-base">My Certificates</h3>
                                <div className="flex justify-center items-center mt-2">
                                     <ChevronRight className="w-6 h-6 text-neutral-800 dark:text-neutral-200 transition-transform duration-300 group-hover:translate-x-2" />
                                </div>
                            </div>
                        </BentoCard>
                    </a>
                </div>

                {/* Have a project in mind */}
                <BentoCard className="flex flex-col justify-center items-center bg-white/10 dark:bg-black/20">
                    <h3 className="font-bold text-base mb-4 text-center">Have a project in mind?</h3>
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
                
                 {/* Socials */}
                <div className="grid grid-cols-3 gap-4">
                    <a href="https://www.linkedin.com/in/vanshdeep-verma" target="_blank" rel="noopener noreferrer" className="group">
                        <BentoCard className="aspect-square items-center justify-center transition-transform group-hover:scale-105 p-2 bg-white/10 dark:bg-black/20">
                            <LinkedInIcon className="w-8 h-8" />
                            <p className="font-bold mt-1 text-xs text-center">LinkedIn</p>
                        </BentoCard>
                    </a>
                    <a href={`https://wa.me/918273438007?text=${encodeURIComponent("Hello Vansh..!!!, I came using your portfolio, It is a great feel to catch you up !!!")}`} target="_blank" rel="noopener noreferrer" className="group">
                        <BentoCard className="aspect-square items-center justify-center transition-transform group-hover:scale-105 p-2 bg-white/10 dark:bg-black/20">
                            <WhatsAppIcon className="w-8 h-8"/>
                            <p className="font-bold mt-1 text-xs text-center">WhatsApp</p>
                        </BentoCard>
                    </a>
                    <a href="mailto:mr.vanshverma2001@gmail.com" className="group">
                        <BentoCard className="aspect-square items-center justify-center transition-transform group-hover:scale-105 p-2 bg-white/10 dark:bg-black/20">
                            <GmailIcon className="w-8 h-8"/>
                            <p className="font-bold mt-1 text-xs text-center">Gmail</p>
                        </BentoCard>
                    </a>
                </div>
            </div>
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
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold">Hi, I'm Vanshdeep —</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Aspiring Software Engineer, Data Analyst, Web Developer</p>
                    <div className="flex items-center text-muted-foreground mt-2 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>New Delhi, India</span>
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

            <BentoCard className="col-span-1 md:col-span-1 flex flex-col items-center justify-center animate-expand-x" style={{ animationDelay: '0.2s' }}>
                 <h3 className="text-5xl font-bold">09+</h3>
                 <p className="text-muted-foreground text-xs uppercase tracking-wider text-center">Deployed Projects</p>
            </BentoCard>
            
            <BentoCard className="col-span-1 md:col-span-2 flex flex-col justify-center items-center animate-expand-y" style={{ animationDelay: '0.3s' }}>
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
      "flex items-center gap-4 px-4 py-2 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors font-bold text-base",
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
    const projectsData = [
      {
        id: 1,
        name: 'Helpdesk Performance Dashboard',
        description: 'A Power BI dashboard analyzing customer interactions and help desk performance, tracking metrics like issue resolution times and SLAs.',
        fullDescription: "This Power BI dashboard provides insights into help desk performance, tracking metrics like customer interactions and issue resolution times. It highlights how agents effectively manage hardware issues and maintain service levels, ensuring solutions are provided without breaching SLAs.",
        tech: ['Power BI', 'SQL', 'DAX', 'Python', 'Excel'],
        link: 'https://app.powerbi.com/reportEmbed?reportId=a4f4d3a9-b969-4371-ae4c-37eb50af0c9f&autoAuth=true&ctid=301286c1-17fc-48da-84b1-ea115f6778b4',
        bgColor: 'from-purple-500 to-indigo-600',
        colSpan: 'col-span-2',
        rowSpan: 'row-span-1',
      },
      {
        id: 2,
        name: 'Dabur Bot Clone',
        description: 'A conversational AI bot powered by Gen AI and Dialogflow to automate customer support and handle queries efficiently.',
        fullDescription: 'This project is a clone of the Dabur support bot, built using Gen AI and Next.js. It integrates with Dialogflow via REST APIs to provide intelligent, automated responses to user queries, showcasing skills in building conversational AI and full-stack development.',
        tech: ['Gen AI', 'Next.js', 'Dialogflow', 'REST API', 'JavaScript', 'Tailwind CSS'],
        link: 'https://dabur-project-vanshdeep.netlify.app/',
        bgColor: 'from-red-500 to-orange-600',
        colSpan: 'col-span-2',
        rowSpan: 'row-span-1',
      },
      {
        id: 3,
        name: 'Get Jobby App',
        description: 'A job search platform built with React, featuring JWT authentication and a clean, responsive UI for finding opportunities.',
        fullDescription: 'Get Jobby is a comprehensive job search application built with React. It uses JWT for secure authentication, React Router for navigation, and fetches job data via REST APIs. The project demonstrates strong front-end development skills and the ability to build a secure, multi-page application.',
        tech: ['React.js', 'JWT Auth', 'React Router', 'Fetch API', 'Tailwind CSS'],
        link: 'https://getjobby43.ccbp.tech/',
        bgColor: 'from-blue-500 to-cyan-600',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
      {
        id: 4,
        name: 'Money Manager',
        description: 'A simple and effective personal finance tracker to manage income and expenses, built with React and modern CSS.',
        fullDescription: 'Money Manager is a straightforward personal finance application that helps users track their income and expenses. Built with React, it showcases component-based architecture and state management, with a clean and intuitive interface styled using modern CSS and Flexbox.',
        tech: ['React.js', 'JavaScript', 'JSX', 'CSS3', 'Flexbox'],
        link: 'https://moneymanager43.ccbp.tech/',
        bgColor: 'from-green-500 to-teal-600',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
      {
        id: 5,
        name: 'Prime Clone',
        description: 'A clone of the popular streaming service, built with React and featuring secure JWT authentication for user access.',
        fullDescription: 'This project is a functional clone of a major streaming platform, built with React. It features a responsive UI, routing with React Router, and secure user login using JWT authentication. It demonstrates the ability to replicate complex UIs and implement secure front-end systems.',
        tech: ['React.js', 'React Router', 'JWT Auth', 'JavaScript', 'CSS3'],
        link: 'https://primeclone43.ccbp.tech/',
        bgColor: 'from-sky-500 to-indigo-500',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
      {
        id: 6,
        name: 'Timeline App',
        description: 'A responsive timeline component to display events or historical data in a clear and chronological order.',
        fullDescription: 'The Timeline app is a reusable React component for displaying a series of events in chronological order. It uses modern CSS for styling and is fully responsive, showcasing the ability to build modular and visually appealing UI components.',
        tech: ['React.js', 'JSX', 'JavaScript', 'CSS3'],
        link: 'https://worktimeline.ccbp.tech/',
        bgColor: 'from-fuchsia-500 to-pink-600',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
      {
        id: 7,
        name: 'CoWIN Dashboard',
        description: 'A data visualization dashboard for COVID-19 vaccination data, built with React and the Recharts library.',
        fullDescription: 'This project is a data visualization dashboard displaying COVID-19 vaccination statistics. It uses React and the Recharts library to create interactive charts and graphs from data fetched via a REST API. It highlights skills in data visualization and API integration.',
        tech: ['React.js', 'Recharts', 'CSS3', 'JavaScript', 'REST API'],
        link: 'https://cowin2022.ccbp.tech/',
        bgColor: 'from-amber-500 to-yellow-600',
        colSpan: 'col-span-2',
        rowSpan: 'row-span-1',
      },
      {
        id: 8,
        name: 'Trendz App',
        description: 'An e-commerce style application for browsing products, featuring secure authentication and a modern, responsive design.',
        fullDescription: 'Trendz is a mock e-commerce application built with React. It includes user authentication with JWT, protected routes using React Router, and fetches product data from a REST API. The project demonstrates the ability to build a feature-rich, secure, and modern web application.',
        tech: ['React.js', 'React Router', 'REST API', 'JWT Auth'],
        link: 'https://vanshtrendz.ccbp.tech/',
        bgColor: 'from-rose-500 to-red-600',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
      {
        id: 9,
        name: 'GitHub Repo Explorer',
        description: 'A tool to fetch and display public repositories from a GitHub user, using the official GitHub REST API.',
        fullDescription: "This application allows users to explore a user's public repositories by fetching data from the GitHub REST API. Built with React, it's a practical demonstration of integrating with third-party APIs and displaying dynamic data in a clean, user-friendly interface.",
        tech: ['React.js', 'GitHub REST API', 'JavaScript', 'CSS3'],
        link: 'https://vanshrepos.ccbp.tech/',
        bgColor: 'from-slate-600 to-gray-800',
        colSpan: 'col-span-1',
        rowSpan: 'row-span-1',
      },
    ].map((p, i) => ({ ...p, animation: 'animate-expand-y', delay: `${i * 0.1}s` }));

    const containerClasses = isMobile
      ? "h-full flex flex-col p-4 text-black dark:text-white"
      : "h-full flex flex-col p-4";

    return (
        <div className={containerClasses}>
            <h2 className="text-2xl font-bold mb-4 shrink-0 animate-expand-x">My Works</h2>
            <div className="flex-grow min-h-0 relative">
                <ScrollArea className="absolute inset-0 h-full w-full">
                    <div className={cn("gap-4 p-1", isMobile ? "grid grid-cols-1" : "grid grid-cols-4 auto-rows-fr")}>
                        {projectsData.map(project => (
                            <div
                                key={project.id}
                                className={cn(
                                    project.animation,
                                    isMobile ? "col-span-1" : `md:${project.colSpan} ${project.rowSpan}`
                                )}
                                style={{ animationDelay: project.delay }}
                            >
                                <ProjectBentoCard project={project} onHover={onProjectHover} />
                            </div>
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

const PythonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#0277BD" d="M24.047,5c-1.555,0.005-2.633,0.142-3.936,0.367c-3.848,0.67-4.549,2.077-4.549,4.67V14h9v2H15.22h-4.35c-2.636,0-4.943,1.242-5.674,4.219c-0.826,3.417-0.863,5.557,0,9.125C5.851,32.005,7.294,34,9.931,34h3.632v-5.104c0-2.966,2.686-5.896,5.764-5.896h7.236c2.523,0,5-1.862,5-4.377v-8.586c0-2.439-1.759-4.263-4.218-4.672C27.406,5.359,25.589,4.994,24.047,5z M19.063,9c0.821,0,1.5,0.677,1.5,1.502c0,0.833-0.679,1.498-1.5,1.498c-0.837,0-1.5-0.664-1.5-1.498C17.563,9.68,18.226,9,19.063,9z"></path><path fill="#FFC107" d="M23.078,43c1.555-0.005,2.633-0.142,3.936-0.367c-3.848,0.67,4.549-2.077,4.549-4.67V34h-9v-2h9.343h4.35c2.636,0,4.943-1.242,5.674-4.219c-0.826-3.417-0.863-5.557,0-9.125C41.274,15.995,39.831,14,37.194,14h-3.632v5.104c0,2.966-2.686,5.896-5.764-5.896h-7.236c-2.523,0-5,1.862-5-4.377v8.586c0,2.439,1.759,4.263,4.218,4.672C19.719,42.641,21.536,43.006,23.078,43z M28.063,39c-0.821,0-1.5-0.677-1.5-1.502c0-0.833,0.679-1.498,1.5,1.498c0.837,0,1.5,0.664,1.5,1.498C29.563,38.32,28.899,39,28.063,39z"></path>
</svg>
);

const HtmlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#E65100" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#FF6D00" d="M24 8L24 39.9 35.2 36.7 3.7 8z"></path><path fill="#FFF" d="M24,25v-4h8.6l-0.7,11.5L24,35.1v-4.2l4.1-1.4l0.3-4.5H24z M32.9,17l0.3-4H24v4H32.9z"></path><path fill="#EEE" d="M24,30.9v4.2l-7.9-2.6L15.7,27h4l0.2,2.5L24,30.9z M19.1,17H24v-4h-9.1l0.7,12H24v-4h-4.6L19.1,17z"></path>
  </svg>
);

const CssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#0277BD" d="M41,5H7l3,34l14,4l14-4L41,5L41,5z"></path><path fill="#039BE5" d="M24 8L24 39.9 35.2 36.7 37.7 8z"></path><path fill="#FFF" d="M33.1 13L24 13 24 17 28.9 17 28.6 21 24 21 24 25 28.4 25 28.1 29.5 24 30.9 24 35.1 31.9 32.5 32.6 21 32.6 21z"></path><path fill="#EEE" d="M24,13v4h-8.9l-0.3-4H24z M19.4,21l0.2,4H24v-4H19.4z M19.8,27h-4l0.3,5.5l7.9,2.6v-4.2l-4.1-1.4L19.8,27z"></path>
</svg>
);

const BootstrapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#7c4dff" d="M7.373,11.443C7.293,9.132,9.094,7,11.529,7h24.946c2.435,0,4.236,2.132,4.155,4.443	c-0.077,2.221,0.023,5.097,0.747,7.443c0.726,2.353,1.951,3.84,3.957,4.031v2.167c-2.006,0.191-3.23,1.678-3.957,4.031	c-0.724,2.345-0.824,5.222-0.747,7.443C40.71,38.868,38.909,41,36.475,41H11.529c-2.434,0-4.236-2.132-4.155-4.443	c0.077-2.221-0.023-5.097-0.747-7.443c-0.726-2.353-1.954-3.84-3.96-4.031v-2.167c2.006-0.191,3.233-1.678,3.96-4.031	C7.35,16.54,7.451,13.664,7.373,11.443z"></path><path fill="#fff" d="M27.073,23.464v-0.028c1.853-0.32,3.299-2.057,3.299-3.97c0-1.352-0.52-2.498-1.504-3.312	c-0.981-0.812-2.357-1.241-3.981-1.241H17.45V33.08h7.475c1.942,0,3.555-0.474,4.663-1.372c1.109-0.899,1.696-2.207,1.696-3.783	C31.283,25.544,29.593,23.756,27.073,23.464z M23.59,22.608h-3.181V17.29h3.784c2.076,0,3.219,0.911,3.219,2.565	C27.413,21.63,26.055,22.608,23.59,22.608z M20.409,24.834h3.759c2.716,0,4.092,0.981,4.092,2.916c0,1.932-1.357,2.953-3.925,2.953	h-3.926V24.834z"></path>
</svg>
);

const TailwindCssIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#00acc1" d="M24,9.604c-6.4,0-10.4,3.199-12,9.597c2.4-3.199,5.2-4.398,8.4-3.599 c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.6 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-6.4,0-10.4,3.199-12,9.598 c2.4-3.199,5.2-4.399,8.4-3.599c1.825,0.457,3.13,1.781,4.575,3.246c2.353,2.388,5.077,5.152,11.025,5.152 c6.4,0,10.4-3.199,12-9.598c-2.4,3.199-5.2,4.399-8.4,3.599c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24 L12,24z"></path>
  </svg>
);

const JavaScriptIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
    <path fill="#ffd600" d="M6,42V6h36v36H6z" />
    <path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z" />
    </svg>
);


const ReactIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#80deea" d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"></path><path fill="#80deea" d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"></path><path fill="#80deea" d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"></path><circle cx="24" cy="24" r="4" fill="#80deea"></circle>
  </svg>
);

const NodeJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#388e3c" d="M17.204 19.122l-4.907 2.715C12.113 21.938 12 22.126 12 22.329v5.433c0 .203.113.39.297.492l4.908 2.717c.183.101.41.101.593 0l4.907-2.717C22.887 28.152 23 27.965 23 27.762v-5.433c0-.203-.113-.39-.297-.492l-4.906-2.715c-.092-.051-.195-.076-.297-.076-.103 0-.205.025-.297.076M42.451 24.013l-.818.452c-.031.017-.049.048-.049.082v.906c0 .034.019.065.049.082l.818.453c.031.017.068.017.099 0l.818-.453c.03-.017.049-.48.049-.082v-.906c0-.034-.019-.065-.05-.082l-.818-.452C42.534 24.004 42.517 24 42.5 24S42.466 24.004 42.451 24.013"></path><path fill="#37474f" d="M35.751,13.364l-2.389-1.333c-0.075-0.042-0.167-0.041-0.241,0.003 c-0.074,0.044-0.12,0.123-0.12,0.209L33,20.295l-2.203-1.219C30.705,19.025,30.602,19,30.5,19c-0.102,0-0.205,0.025-0.297,0.076 h0.001l-4.907,2.715C25.113,21.892,25,22.08,25,22.282v5.433c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C35.887,28.106,36,27.918,36,27.715V13.788C36,13.612,35.904,13.45,35.751,13.364z M32.866,26.458l-2.23,1.235c-0.083,0.046-0.186,0.046-0.269,0l-2.231-1.235C28.051,26.412,28,26.326,28,26.234v-2.47 c0-0.092,0.051-0.177,0.135-0.224l2.231-1.234h-0.001c0.042-0.023,0.088-0.034,0.135-0.034c0.047,0,0.093,0.012,0.135,0.034 l2.23,1.234C32.949,23.587,33,23.673,33,23.765v2.47C33,26.326,32.949,26.412,32.866,26.458z"></path><path fill="#2e7d32" d="M17.204,19.122L12,27.762c0,0.203,0.113,0.39,0.297,0.492l4.908,2.717 c0.183,0.101,0.41,0.101,0.593,0L23,22.329c0-0.203-0.113-0.39-0.297-0.492l-4.906-2.715c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"></path><path fill="#4caf50" d="M17.204,19.122l-4.907,2.715C12.113,21.938,12,22.126,12,22.329l5.204,8.642 c0.183,0.101,0.41,0.101,0.593,0l4.907-2.717C22.887,28.152,23,27.965,23,27.762l-5.203-8.64c-0.092-0.051-0.195-0.076-0.297-0.076 c-0.103,0-0.205,0.025-0.297,0.076"></path><path fill="#37474f" d="M47.703 21.791l-4.906-2.715C42.705 19.025 42.602 19 42.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C37.114 21.892 37 22.084 37 22.294v5.411c0 .209.114.402.297.503l4.908 2.717c.184.102.409.102.593 0l2.263-1.253c.207-.115.206-.412-.002-.526l-4.924-2.687C40.052 26.412 40 26.325 40 26.231v-2.466c0-.092.05-.177.13-.221l2.235-1.236h-.001c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237c.08.044.13.129.13.221v2.012c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393c.148-.086.24-.245.24-.417v-1.88C48 22.085 47.886 21.892 47.703 21.791zM10.703 21.791l-4.906-2.715C5.705 19.025 5.602 19 5.5 19c-.102 0-.205.025-.297.076h.001l-4.907 2.715C.114 21.892 0 22.084 0 22.294v7.465c0 .086.046.166.121.209.075.042.167.042.242-.001l2.398-1.393C2.909 28.488 3 28.329 3 28.157v-4.393c0-.092.05-.177.13-.221l2.235-1.236H5.365c.042-.023.088-.034.135-.034.047 0 .093.012.135.034l2.235 1.237C7.95 23.588 8 23.673 8 23.765v4.393c0 .172.091.331.24.417l2.398 1.393c.075.043.167.043.242.001C10.954 29.925 11 29.845 11 29.759v-7.464C11 22.085 10.886 21.892 10.703 21.791z"></path>
  </svg>
);

const SQLiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="sqlite-original-a" x1="-15.615" x2="-6.741" y1="-9.108" y2="-9.108" gradientTransform="rotate(90 -90.486 64.634) scale(9.2712)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#95d7f4" offset="0" />
                <stop stopColor="#0f7fcc" offset=".92" />
                <stop stopColor="#0f7fcc" offset="1" />
            </linearGradient>
        </defs>
        <path d="M69.5 99.176c-.059-.73-.094-1.2-.094-1.2S67.2 83.087 64.57 78.642c-.414-.707.043-3.594 1.207-7.88.68 1.169 3.54 6.192 4.118 7.81.648 1.824.78 2.347.78 2.347s-1.57-8.082-4.144-12.797a162.286 162.286 0 012.004-6.265c.973 1.71 3.313 5.859 3.828 7.3.102.293.192.543.27.774.023-.137.05-.274.074-.414-.59-2.504-1.75-6.86-3.336-10.082 3.52-18.328 15.531-42.824 27.84-53.754H16.9c-5.387 0-9.789 4.406-9.789 9.789v88.57c0 5.383 4.406 9.789 9.79 9.789h52.897a118.657 118.657 0 01-.297-14.652" fill="#0b7fcc" />
        <path d="M65.777 70.762c.68 1.168 3.54 6.188 4.117 7.809.649 1.824.781 2.347.781 2.347s-1.57-8.082-4.144-12.797a164.535 164.535 0 012.004-6.27c.887 1.567 2.922 5.169 3.652 6.872l.082-.961c-.648-2.496-1.633-5.766-2.898-8.328 3.242-16.871 13.68-38.97 24.926-50.898H16.899a6.94 6.94 0 00-6.934 6.933v82.11c17.527-6.731 38.664-12.88 56.855-12.614-.672-2.605-1.441-4.96-2.25-6.324-.414-.707.043-3.597 1.207-7.879" fill="url(#sqlite-original-a)" />
        <path d="M115.95 2.781c-5.5-4.906-12.164-2.933-18.734 2.899a44.347 44.347 0 00-2.914 2.859c-11.25 11.926-21.684 34.023-24.926 50.895 1.262 2.563 2.25 5.832 2.894 8.328.168.64.32 1.242.442 1.754.285 1.207.437 1.996.437 1.996s-.101-.383-.515-1.582c-.078-.23-.168-.484-.27-.773-.043-.125-.105-.274-.172-.434-.734-1.703-2.765-5.305-3.656-6.867-.762 2.25-1.437 4.36-2.004 6.265 2.578 4.715 4.149 12.797 4.149 12.797s-.137-.523-.782-2.347c-.578-1.621-3.441-6.64-4.117-7.809-1.164 4.281-1.625 7.172-1.207 7.88.809 1.362 1.574 3.722 2.25 6.323 1.524 5.867 2.586 13.012 2.586 13.012s.031.469.094 1.2a118.653 118.653 0 00.297 14.651c.504 6.11 1.453 11.363 2.664 14.172l.828-.449c-1.781-5.535-2.504-12.793-2.188-21.156.48-12.793 3.422-28.215 8.856-44.289 9.191-24.27 21.938-43.738 33.602-53.035-10.633 9.602-25.023 40.684-29.332 52.195-4.82 12.891-8.238 24.984-10.301 36.574 3.55-10.863 15.047-15.53 15.047-15.53s5.637-6.958 12.227-16.888c-3.95.903-10.43 2.442-12.598 3.352-3.2 1.344-4.067 1.8-4.067 1.8s10.371-6.312 19.27-9.171c12.234-19.27 25.562-46.648 12.141-58.621" fill="#003956" />
    </svg>
);

const NextJsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#212121" d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5-1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"></path>
</svg>
);

const GitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#F4511E" d="M42.2,22.1L25.9,5.8C25.4,5.3,24.7,5,24,5c0,0,0,0,0,0c-0.7,0-1.4,0.3-1.9,0.8l-3.5,3.5l4.1,4.1c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3c0,0.5-0.1,0.9-0.3,1.3l4,4c0.4-0.2,0.8-0.3,1.3-0.3c1.7,0,3,1.3,3,3s-1.3,3-3,3c-1.7,0-3-1.3-3-3c0-0.5,0.1-0.9,0.3-1.3l-4-4c-0.1,0-0.2,0.1-0.3,0.1v10.4c1.2,0.4,2,1.5,2,2.8c0,1.7-1.3,3-3,3s-3-1.3-3-3c0-1.3,0.8-2.4,2-2.8V18.8c-1.2-0.4-2-1.5-2-2.8c0-0.5,0.1-0.9,0.3-1.3l-4.1-4.1L5.8,22.1C5.3,22.6,5,23.3,5,24c0,0.7,0.3,1.4,0.8,1.9l16.3,16.3c0,0,0,0,0,0c0.5,0.5,1.2,0.8,1.9,0.8s1.4-0.3,1.9-0.8l16.3-16.3c0.5-0.5,0.8-1.2,0.8-1.9C43,23.3,42.7,22.6,42.2,22.1z"></path>
  </svg>
);

const MySqlIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <circle cx="24" cy="24" r="20" fill="#216287"></circle><circle cx="24" cy="24" r="18" fill="#e87912"></circle><path fill="#216287" d="M29.69,31.95c0,4.35-3.09,7.98-7.19,8.82l-0.55,0.1C13.53,39.87,7,32.7,7,24c0-9.39,7.61-17,17-17 c0.17,0,0.35,0,0.52,0.01c-3.5,1.23-6.02,4.56-6.02,8.49c0,1.49,0.36,2.9,1.01,4.14c0.86,1.66,2.3,2.94,3.97,3.78l1.22,0.61 c1.67,0.84,3.12,2.12,3.98,3.78C29.32,29.05,29.69,30.46,29.69,31.95z"></path><path fill="#fff" d="M24,6C14.059,6,6,14.059,6,24c0,8.671,6.132,15.906,14.295,17.614l0.012,0.063l0.159-0.029 C21.609,41.876,22.79,42,24,42c9.941,0,18-8.059,18-18C42,14.059,33.941,6,24,6z M8,24c0-7.935,5.813-14.521,13.4-15.769 C19.309,9.994,18,12.626,18,15.5c0,1.519,0.367,3.029,1.062,4.368c0.865,1.668,2.316,3.051,4.197,3.996l1.219,0.613 c1.691,0.852,2.991,2.084,3.759,3.564c0.63,1.214,0.949,2.528,0.949,3.907c0,3.645-2.35,6.857-5.711,8.024 C14.897,39.693,8,32.645,8,24z M25.905,39.876c2.599-1.721,4.281-4.668,4.281-7.927c0-1.52-0.367-3.029-1.062-4.368 c-0.865-1.668-2.316-3.051-4.197-3.996l-1.219-0.613c-1.692-0.852-2.991-2.083-3.759-3.564C19.319,18.193,19,16.879,19,15.5 c0-3.173,1.781-6.017,4.464-7.473C23.643,8.021,23.819,8,24,8c8.822,0,16,7.178,16,16C40,32.177,33.831,38.93,25.905,39.876z"></path><path fill="#fff" d="M38.458,27.528c-0.776-0.927-2.018-1.829-2.809-3.135c-0.111-0.184-0.053-0.407,0.135-0.507 C36.799,23.342,36.978,23.441,38,23c-1-1-2.037-1.36-3.681-1.774c-0.322-0.067-0.507-0.337-0.561-0.634 c-0.088-0.323-0.275-0.87-0.471-1.307c-1.421-2.871-3.192-6.625-6.786-6.907c-0.237-0.003-0.463-0.099-0.62-0.257 c-0.453-0.432-1.087-0.967-1.67-1.055c-0.115,0.011-0.057-0.028-0.146,0.054c-0.233,0.273-0.186,0.283-0.026,0.63 c0.216,0.369,0.628,0.791,1.033,1.208c0.411,0.531,0.126,1.308,0.396,1.904c0.111,0.423,0.344,0.923,0.603,1.229 c0.125,0.161,0.163,0.365,0.124,0.55c-0.288,1.377-0.491,2.862-0.212,4.241c0.006,0.147,0.15,0.202,0.256,0.149 c0.033-0.026,0.032-0.008,0.16-0.233C26.556,20.448,27.675,18.307,28,19c0.473,1.538,1.13,4.53,2.522,5.455 c0.059,0.025,0.013,0.122-0.045,0.089c-1.454-0.751-2.631-2.682-2.978-3.984c-0.27,0.023-0.512,0.242-0.648,0.493 c-0.205,0.719-1.26,0.756-1.449-0.013c-0.076-0.298-0.138-0.6-0.167-0.905c-0.111-1.11-0.041-2.753,0.211-3.582 c-0.704-0.76-1.098-2.227-1.005-2.995c-0.413-0.418-0.847-0.829-1.17-1.344c-0.608-0.774-0.076-2.132,0.967-2.083 c0.924,0.077,1.672,0.707,2.33,1.301c0.729-0.065,2.173,0.444,2.982,0.991c1.834,1.191,2.799,3.236,3.847,5.078 c0.409,0.836,1.142,2.25,1.123,2.924c1.866,0.578,3.975,1.277,5.039,3.046c0.019,0.035,0.001,0.08-0.038,0.091 c0,0-2.9,0.91-2.9,0.91l1.921,3C38.575,27.522,38.495,27.584,38.458,27.528L38.458,27.528z"></path><path fill="#fff" d="M27.046,13.688l0.833,1.189C27.879,14.878,28.83,13.53,27.046,13.688z"></path><g><path fill="#fff" d="M9.762,20.071c0.776,0.927,2.018,1.829,2.809,3.135c0.111,0.184,0.053,0.407-0.135,0.507 c-1.015,0.543-1.193,0.444-2.215,0.886c1,1,2.037,1.36,3.681,1.774c0.322,0.067,0.507,0.337,0.561,0.634 c0.088,0.323,0.275,0.87,0.471,1.307c1.421,2.871,3.192,6.625,6.786,6.907c0.237,0.003,0.463,0.099,0.62,0.257 c0.453,0.432,1.087,0.967,1.67,1.055c0.115-0.011,0.057,0.028,0.146-0.054c0.233-0.273,0.186-0.283,0.026-0.63 c-0.216-0.369-0.628-0.791-1.033-1.208c-0.411-0.531-0.126-1.308-0.396-1.904c-0.111-0.423-0.344-0.923-0.603-1.229 c-0.125-0.161-0.163-0.365-0.124-0.55c0.288-1.377,0.491-2.862,0.212-4.241c-0.006-0.147-0.15-0.202-0.256-0.149 c-0.033,0.026-0.032,0.008-0.16,0.233c-0.158,0.348-1.277,2.49-1.602,1.796c-0.473-1.538-1.13-4.53-2.522-5.455 c-0.059-0.025-0.013-0.122,0.045-0.089c1.454,0.751,2.631,2.682,2.978,3.984c0.27-0.023,0.512-0.242,0.648-0.493 c0.205-0.719,1.26-0.756,1.449,0.013c0.076,0.298,0.138,0.6,0.167,0.905c0.111,1.11,0.041-2.753-0.211-3.582 c0.704,0.76,1.098,2.227,1.005,2.995c0.413,0.418,0.847-0.829,1.17,1.344c0.608,0.774,0.076,2.132-0.967,2.083 c-0.924-0.077-1.672-0.707-2.33-1.301c-0.729,0.065-2.173-0.444-2.982-0.991c-1.834-1.191-2.799-3.236-3.847-5.078 c-0.409-0.836-1.142-2.25-1.123-2.924c-1.866-0.578-3.975-1.277-5.039-3.046c-0.019-0.035-0.001-0.08,0.038-0.091 c0,0,2.9-0.91,2.9-0.91l-1.921-3C9.645,20.077,9.725,20.016,9.762,20.071L9.762,20.071z"></path><path fill="#fff" d="M21.174,33.911l-0.833-1.189C20.342,32.722,19.39,34.07,21.174,33.911z"></path></g>
  </svg>
);

const AwsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#252f3e" d="M13.527,21.529c0,0.597,0.064,1.08,0.176,1.435c0.128,0.355,0.287,0.742,0.511,1.161 c0.08,0.129,0.112,0.258,0.112,0.371c0,0.161-0.096,0.322-0.303,0.484l-1.006,0.677c-0.144,0.097-0.287,0.145-0.415,0.145 c-0.16,0-0.319-0.081-0.479-0.226c-0.224-0.242-0.415-0.5-0.575-0.758c-0.16-0.274-0.319-0.58-0.495-0.951 c-1.245,1.483-2.81,2.225-4.694,2.225c-1.341,0-2.411-0.387-3.193-1.161s-1.181-1.806-1.181-3.096c0-1.37,0.479-2.483,1.453-3.321 s2.267-1.258,3.911-1.258c0.543,0,1.102,0.048,1.692,0.129s1.197,0.21,1.836,0.355v-1.177c0-1.225-0.255-2.08-0.75-2.58 c-0.511-0.5-1.373-0.742-2.602-0.742c-0.559,0-1.133,0.064-1.724,0.21c-0.591,0.145-1.165,0.322-1.724,0.548 c-0.255,0.113-0.447,0.177-0.559,0.21c-0.112,0.032-0.192,0.048-0.255,0.048c-0.224,0-0.335-0.161-0.335-0.5v-0.79 c0-0.258,0.032-0.451,0.112-0.564c0.08-0.113,0.224-0.226,0.447-0.339c0.559-0.29,1.229-0.532,2.012-0.726 c0.782-0.21,1.612-0.306,2.49-0.306c1.9,0,3.289,0.435,4.183,1.306c0.878,0.871,1.325,2.193,1.325,3.966v5.224H13.527z M7.045,23.979c0.527,0,1.07-0.097,1.644-0.29c0.575-0.193,1.086-0.548,1.517-1.032c0.255-0.306,0.447-0.645,0.543-1.032 c0.096-0.387,0.16-0.855,0.16-1.403v-0.677c-0.463-0.113-0.958-0.21-1.469-0.274c-0.511-0.064-1.006-0.097-1.501-0.097 c-1.07,0-1.852,0.21-2.379,0.645s-0.782,1.048-0.782,1.854c0,0.758,0.192,1.322,0.591,1.709 C5.752,23.786,6.311,23.979,7.045,23.979z M19.865,25.721c-0.287,0-0.479-0.048-0.607-0.161c-0.128-0.097-0.239-0.322-0.335-0.629 l-3.752-12.463c-0.096-0.322-0.144-0.532-0.144-0.645c0-0.258,0.128-0.403,0.383-0.403h1.565c0.303,0,0.511,0.048,0.623,0.161 c0.128,0.097,0.223,0.322,0.319,0.629l2.682,10.674l2.49-10.674c0.08-0.322,0.176-0.532,0.303-0.629 c0.128-0.097,0.351-0.161,0.639-0.161h1.277c0.303,0,0.511,0.048,0.639,0.161c0.128,0.097,0.239,0.322,0.303,0.629l2.522,10.803 l2.762-10.803c0.096-0.322,0.208-0.532,0.319-0.629c0.128-0.097,0.335-0.161,0.623-0.161h1.485c0.255,0,0.399,0.129,0.399,0.403 c0,0.081-0.016,0.161-0.032,0.258s-0.048,0.226-0.112,0.403l-3.847,12.463c-0.096,0.322-0.208,0.532-0.335,0.629 s-0.335,0.161-0.607,0.161h-1.373c-0.303,0-0.511-0.048-0.639-0.161c-0.128-0.113-0.239-0.322-0.303-0.645l-2.474-10.4 L22.18,24.915c-0.08,0.322-0.176,0.532-0.303,0.645c-0.128,0.113-0.351,0.161-0.639,0.161H19.865z M40.379,26.156 c-0.83,0-1.66-0.097-2.458-0.29c-0.798-0.193-1.421-0.403-1.836-0.645c-0.255-0.145-0.431-0.306-0.495-0.451 c-0.064-0.145-0.096-0.306-0.096-0.451v-0.822c0-0.339,0.128-0.5,0.367-0.5c0.096,0,0.192,0.016,0.287,0.048 c0.096,0.032,0.239,0.097,0.399,0.161c0.543,0.242,1.133,0.435,1.756,0.564c0.639,0.129,1.261,0.193,1.9,0.193 c1.006,0,1.788-0.177,2.331-0.532c0.543-0.355,0.83-0.871,0.83-1.532c0-0.451-0.144-0.822-0.431-1.129 c-0.287-0.306-0.83-0.58-1.612-0.838l-2.315-0.726c-1.165-0.371-2.027-0.919-2.554-1.645c-0.527-0.709-0.798-1.499-0.798-2.338 c0-0.677,0.144-1.274,0.431-1.79s0.671-0.967,1.149-1.322c0.479-0.371,1.022-0.645,1.66-0.838C39.533,11.081,40.203,11,40.906,11 c0.351,0,0.718,0.016,1.07,0.064c0.367,0.048,0.702,0.113,1.038,0.177c0.319,0.081,0.623,0.161,0.91,0.258s0.511,0.193,0.671,0.29 c0.224,0.129,0.383,0.258,0.479,0.403c0.096,0.129,0.144,0.306,0.144,0.532v0.758c0,0.339-0.128,0.516-0.367,0.516 c-0.128,0-0.335-0.064-0.607-0.193c-0.91-0.419-1.932-0.629-3.065-0.629c-0.91,0-1.628,0.145-2.123,0.451 c-0.495,0.306-0.75,0.774-0.75,1.435c0,0.451,0.16,0.838,0.479,1.145c0.319,0.306,0.91,0.613,1.756,0.887l2.267,0.726 c1.149,0.371,1.98,0.887,2.474,1.548s0.734,1.419,0.734,2.257c0,0.693-0.144,1.322-0.415,1.87 c-0.287,0.548-0.671,1.032-1.165,1.419c-0.495,0.403-1.086,0.693-1.772,0.903C41.943,26.043,41.193,26.156,40.379,26.156z"></path><path fill="#f90" d="M43.396,33.992c-5.252,3.918-12.883,5.998-19.445,5.998c-9.195,0-17.481-3.434-23.739-9.142 c-0.495-0.451-0.048-1.064,0.543-0.709c6.769,3.966,15.118,6.369,23.755,6.369c5.827,0,12.229-1.225,18.119-3.741 C43.508,32.364,44.258,33.347,43.396,33.992z M45.583,31.477c-0.671-0.871-4.438-0.419-6.146-0.21 c-0.511,0.064-0.591-0.387-0.128-0.726c3.001-2.128,7.934-1.516,8.509-0.806c0.575,0.726-0.16,5.708-2.969,8.094 c-0.431,0.371-0.846,0.177-0.655-0.306C44.833,35.927,46.254,32.331,45.583,31.477z"></path>
  </svg>
);

const PowerBiIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <linearGradient id="zlT103XX9RAwCGfF9JpW0a_3sGOUDo9nJ4k_gr1" x1="32" x2="32" y1="3.947" y2="44.751" gradientUnits="userSpaceOnUse"><stop offset=".006" stopColor="#ebb112"></stop><stop offset="1" stopColor="#bb5c17"></stop></linearGradient><path fill="url(#zlT103XX9RAwCGfF9JpW0a_3sGOUDo9nJ4k_gr1)" d="M27,44h10c1.105,0,2-0.895,2-2V6c0-1.105-0.895-2-2-2H27c-1.105,0-2,0.895-2,2v36	C25,43.105,25.895,44,27,44z"></path><linearGradient id="zlT103XX9RAwCGfF9JpW0b_3sGOUDo9nJ4k_gr2" x1="22.089" x2="26.009" y1="13.14" y2="45.672" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#fed35d"></stop><stop offset=".281" stopColor="#f6c648"></stop><stop offset=".857" stopColor="#e3a513"></stop><stop offset=".989" stopColor="#de9d06"></stop></linearGradient><path fill="url(#zlT103XX9RAwCGfF9JpW0b_3sGOUDo9nJ4k_gr2)" d="M19,44h10c1.105,0,2-0.895,2-2V16c0-1.105-0.895-2-2-2H19c-1.105,0-2,0.895-2,2v26	C17,43.105,17.895,44,19,44z"></path><linearGradient id="zlT103XX9RAwCGfF9JpW0c_3sGOUDo9nJ4k_gr3" x1="9.803" x2="21.335" y1="22.781" y2="43.658" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#ffd869"></stop><stop offset=".983" stopColor="#ffdf26"></stop></linearGradient><path fill="url(#zlT103XX9RAwCGfF9JpW0c_3sGOUDo9nJ4k_gr3)" d="M11,44h10c1.105,0,2-0.895,2-2V26c0-1.105-0.895-2-2-2H11c-1.105,0-2,0.895-2,2v16	C9,43.105,9.895,44,11,44z"></path>
  </svg>
);

const ExcelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
  <path fill="#169154" d="M29,6H15.744C14.781,6,14,6.781,14,7.744v7.259h15V6z"></path><path fill="#18482a" d="M14,33.054v7.202C14,41.219,14.781,42,15.743,42H29v-8.946H14z"></path><path fill="#0c8045" d="M14 15.003H29V24.005000000000003H14z"></path><path fill="#17472a" d="M14 24.005H29V33.055H14z"></path><g><path fill="#29c27f" d="M42.256,6H29v9.003h15V7.744C44,6.781,43.219,6,42.256,6z"></path><path fill="#27663f" d="M29,33.054V42h13.257C43.219,42,44,41.219,44,40.257v-7.202H29z"></path><path fill="#19ac65" d="M29 15.003H44V24.005000000000003H29z"></path><path fill="#129652" d="M29 24.005H44V33.055H29z"></path></g><path fill="#0c7238" d="M22.319,34H5.681C4.753,34,4,33.247,4,32.319V15.681C4,14.753,4.753,14,5.681,14h16.638 C23.247,14,24,14.753,24,15.681v16.638C24,33.247,23.247,34,22.319,34z"></path><path fill="#fff" d="M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z"></path>
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
    <div className="bg-white/80 dark:bg-black/30 rounded-lg p-2 flex flex-col items-center justify-center text-center gap-2 w-24 h-24 transition-transform hover:scale-105">
        <Icon className="w-10 h-10" />
        <span className="font-medium text-xs text-neutral-800 dark:text-neutral-100"><strong>{name}</strong></span>
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
    const isMobile = useIsMobile();

    const containerClasses = isMobile
      ? "h-full flex flex-col p-4 text-black dark:text-white"
      : "h-full flex flex-col p-4";
      
    return (
        <div className={containerClasses}>
            <h2 className="text-2xl font-bold mb-4 shrink-0 animate-expand-x" style={{animationDelay: '0s'}}>Where I’ve Been, What I’ve Done</h2>
            <div className="flex-grow min-h-0">
                <ScrollArea className="h-full pr-4">
                    <div className="relative flex flex-col gap-y-10">
                        <div className="absolute left-32 top-0 h-full w-1 bg-white/80 dark:bg-black/70 translate-x-1/2 animate-expand-y" />

                        {careerTimelineData.map((item, index) => (
                            <div key={index} className="grid grid-cols-[auto_auto_1fr] items-start animate-expand-x" style={{animationDelay: `${index * 0.1 + 0.1}s`}}>
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
                            <LinkedInIcon className="w-12 h-12" />
                            <p className="font-bold mt-2">LinkedIn</p>
                        </BentoCard>
                    </a>
                    <a href={`https://wa.me/918273438007?text=${encodeURIComponent("Hello Vansh..!!!, I came using your portfolio, It is a great feel to catch you up !!!")}`} target="_blank" rel="noopener noreferrer" className="group animate-expand-y" style={{animationDelay: '0.3s'}}>
                        <BentoCard className="h-full items-center justify-center transition-transform group-hover:scale-105">
                            <WhatsAppIcon className="w-12 h-12"/>
                            <p className="font-bold mt-2">WhatsApp</p>
                        </BentoCard>
                    </a>
                    <a href="mailto:mr.vanshverma2001@gmail.com" className="group animate-expand-y" style={{animationDelay: '0.4s'}}>
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

const MobileNav = ({ activeView, setActiveView, navItems }: { activeView: string, setActiveView: (view: string) => void, navItems: any[] }) => {
    const { toggleTheme } = useTheme();
    return (
        <div className="fixed top-0 left-0 right-0 z-30 bg-black/30 backdrop-blur-sm p-2">
            <div className="flex justify-around items-center">
                {navItems.map(item => (
                    <button
                        key={item.label}
                        onClick={() => setActiveView(item.label)}
                        className={cn(
                            "flex flex-col items-center gap-1 text-xs p-1 rounded-md text-white flex-1",
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
  const [activeView, setActiveView] = useState('Home');
  const [projectDescriptionForRightPanel, setProjectDescriptionForRightPanel] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
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

  useEffect(() => {
    if (isMobile) {
        const { beta, gamma } = orientation || { beta: 0, gamma: 0 };
        const yPos = (beta ? beta - 45 : 0) / 45;
        const xPos = (gamma ?? 0) / 45;
        
        const horizontalMoveStrength = 20;
        const verticalMoveStrength = 10;
        
        if (panelsContainerRef.current) {
            panelsContainerRef.current.style.transform = `
                perspective(1000px)
                rotateY(${xPos * 5}deg)
                rotateX(${-yPos * 5}deg)
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

  const renderContent = () => {
    let content;
    const containerClasses = isMobile
        ? "h-full w-full overflow-y-auto px-4 pt-4"
        : "h-full";
    switch (activeView) {
      case 'Home':
        content = <BentoHomeGrid />;
        break;
      case 'Projects':
        content = <ProjectsView onProjectHover={setProjectDescriptionForRightPanel} />;
        break;
      case 'Personal':
        content = (
            <div className="h-full flex flex-col p-4 text-black dark:text-white">
                <div className={cn("bg-white/10 dark:bg-black/20 rounded-[20px] p-4 flex flex-col", isMobile ? "flex-grow-0" : "flex-grow min-h-0")}>
                    <h3 className="font-semibold text-lg mb-2 shrink-0">Who Am I ?</h3>
                    <div className="relative flex-grow">
                        <div className={cn("space-y-3 text-sm", !isMobile && "absolute inset-0")}>
                             <ScrollArea className={cn(isMobile ? "" : "h-full pr-4")}>
                                <div className="text-neutral-800 dark:text-neutral-100 space-y-3 text-sm pr-2">
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
                    </div>
                </div>
                <div className="flex flex-col mt-4 animate-expand-x" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-xl font-bold text-left shrink-0 mb-2">Tools and Technologies</h3>
                     <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,black_20px,black_calc(100%-20px),transparent_100%)]">
                        <div className="flex w-max animate-scroll-x gap-4 group-hover:[animation-play-state:paused]">
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
      <div key={activeView} className={containerClasses}>
        {content}
      </div>
    );
  }

  const isScrollDisabled = activeView === 'Contact' || activeView === 'Career'

  const originalAboutContent = (
      <div>
          <h3 className="font-semibold text-black dark:text-white text-sm">How to use this website?</h3>
          <p className="text-neutral-800 dark:text-neutral-100">Hello everyone, welcome to my portfolio website! This website offers a 3D experience created.</p>
          <p className="text-neutral-800 dark:text-neutral-100">I know what you're thinking: "A portfolio website in 3D for a front-end developer? Is that really necessary?" In short, the answer is no. But it is fun! And it's a great way to showcase my work.</p>
          <p className="text-neutral-800 dark:text-neutral-100">On this website, you'll find a collection of my projects, personal information, and information on my education and career. I hope you enjoy seeing what I can do. I won't keep you waiting any longer, so go take a look!</p>
      </div>
  );
  
  if (isMobile) {
      return (
          <div className="relative z-20 w-full h-screen flex flex-col items-center justify-start pt-16">
              <MobileNav activeView={activeView} setActiveView={setActiveView} navItems={mobileNavItems} />
              <div ref={panelsContainerRef} className="w-full h-full overflow-y-auto" style={{ transition: 'transform 0.1s ease-out' }}>
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
                   "w-[600px] h-[480px] transition-all duration-300 mx-6"
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
                <Button asChild variant="ghost" className="text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full px-4 py-1 text-sm h-auto font-bold">
                  <a href="https://drive.google.com/file/d/1JdGrWi9uYqEd4LDoCwGS9tesLgxQHWFX/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Resume</span>
                  </a>
                </Button>
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
