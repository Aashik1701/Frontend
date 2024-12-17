"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    PlusCircle, 
    Globe, 
    ArrowRight 
} from "lucide-react";

type CommunityMode = 'create' | 'join';

const ChooseCommunity: React.FC = () => {
    const router = useRouter();
    const [selectedMode, setSelectedMode] = useState<CommunityMode | null>(null);

    const communityOptions = [
        {
            mode: 'join' as CommunityMode,
            title: 'Join Community',
            description: 'Discover and become part of exciting communities',
            icon: Globe,
            gradient: 'gradient-text',
            buttonText: 'Explore Communities',
            route: '/dashboard/joincommunity'
        },
        {
            mode: 'create' as CommunityMode,
            title: 'Create Community',
            description: 'Build and nurture your own unique community',
            icon: PlusCircle,
            gradient: 'gradient-text',
            buttonText: 'Start a Community',
            route: '/dashboard/createcommunity'
        }
    ];

    const handleModeSelection = (route: string) => {
        router.push(route);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
            >
                {communityOptions.map((option) => (
                    <motion.div
                        key={option.mode}
                        whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="feature-card rounded-2xl"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 opacity-10"></div>
        
                        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
                            <option.icon 
                                className={`w-full h-full text-white`} 
                                strokeWidth={1} 
                            />
                        </div>
                        
                        <Card className="border-none shadow-none bg-transparent">
                            <CardHeader className="relative z-10 pb-0">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-full bg-gradient-to-br ${option.gradient} text-white`}>
                                        <option.icon className="w-8 h-8" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{option.title}</CardTitle>
                                </div>
                            </CardHeader>
                            
                            <CardContent className="relative z-10 pt-4 space-y-6">
                                <CardDescription className="text-gray-700">
                                    {option.description}
                                </CardDescription>
                                
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className={`w-full flex items-center justify-between group 
                                        border-2 border-transparent 
                                        hover:border-primary 
                                        ${option.gradient} hover:bg-opacity-10`}
                                    onClick={() => handleModeSelection(option.route)}
                                >
                                    {option.buttonText}
                                    <ArrowRight 
                                        className="ml-2 group-hover:translate-x-1 transition-transform" 
                                    />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ChooseCommunity;