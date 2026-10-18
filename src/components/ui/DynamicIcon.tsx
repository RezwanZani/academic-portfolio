import React from 'react';
import {
  Radio, Activity, Home, Trophy, Star, Settings, Mic,
  Presentation, FileText, Users, Cpu, Navigation,
  Rocket, Telescope, Antenna, Wifi, Satellite, Zap,
  CircuitBoard, Radar, Signal, Gauge, Cog, Wrench,
  FlaskConical, Microscope, BrainCircuit, Bot,
  Laptop, MonitorSmartphone, Award, Medal, Target,
  GraduationCap, Plane, Brain, ShieldCheck, Calendar,
  MapPin, User, Landmark, Circle, LucideProps
} from 'lucide-react';

export const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Radio, Activity, Home, Trophy, Star, Settings, Mic,
  Presentation, FileText, Users, Cpu, Navigation,
  Rocket, Telescope, Antenna, Wifi, Satellite, Zap,
  CircuitBoard, Radar, Signal, Gauge, Cog, Wrench,
  FlaskConical, Microscope, BrainCircuit, Bot,
  Laptop, MonitorSmartphone, Award, Medal, Target,
  GraduationCap, Plane, Brain, ShieldCheck, Calendar,
  MapPin, User, Landmark, Circle
};

interface DynamicIconProps extends LucideProps {
  name?: string;
  fallback?: React.ComponentType<LucideProps>;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  fallback: Fallback = Circle,
  ...props
}) => {
  const IconComponent = (name && ICON_MAP[name]) || Fallback;
  return <IconComponent {...props} />;
};

export default DynamicIcon;
