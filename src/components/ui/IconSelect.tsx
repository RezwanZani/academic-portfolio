import React, { useState, useRef, useEffect } from 'react';
import {
  Radio, Activity, Home, Trophy, Star, Settings, Mic,
  Presentation, FileText, Users, Cpu, Navigation,
  Rocket, Telescope, Antenna, Wifi, Satellite, Zap,
  CircuitBoard, Radar, Signal, Gauge, Cog, Wrench,
  FlaskConical, Microscope, BrainCircuit, Bot,
  Laptop, MonitorSmartphone, Award, Medal, Target, ChevronDown
} from 'lucide-react';

const ICON_OPTIONS = [
  { name: 'Radio', Icon: Radio },
  { name: 'Activity', Icon: Activity },
  { name: 'Home', Icon: Home },
  { name: 'Trophy', Icon: Trophy },
  { name: 'Star', Icon: Star },
  { name: 'Settings', Icon: Settings },
  { name: 'Mic', Icon: Mic },
  { name: 'Presentation', Icon: Presentation },
  { name: 'FileText', Icon: FileText },
  { name: 'Users', Icon: Users },
  { name: 'Cpu', Icon: Cpu },
  { name: 'Navigation', Icon: Navigation },
  { name: 'Rocket', Icon: Rocket },
  { name: 'Telescope', Icon: Telescope },
  { name: 'Antenna', Icon: Antenna },
  { name: 'Wifi', Icon: Wifi },
  { name: 'Satellite', Icon: Satellite },
  { name: 'Zap', Icon: Zap },
  { name: 'CircuitBoard', Icon: CircuitBoard },
  { name: 'Radar', Icon: Radar },
  { name: 'Signal', Icon: Signal },
  { name: 'Gauge', Icon: Gauge },
  { name: 'Cog', Icon: Cog },
  { name: 'Wrench', Icon: Wrench },
  { name: 'FlaskConical', Icon: FlaskConical },
  { name: 'Microscope', Icon: Microscope },
  { name: 'BrainCircuit', Icon: BrainCircuit },
  { name: 'Bot', Icon: Bot },
  { name: 'Laptop', Icon: Laptop },
  { name: 'MonitorSmartphone', Icon: MonitorSmartphone },
  { name: 'Award', Icon: Award },
  { name: 'Medal', Icon: Medal },
  { name: 'Target', Icon: Target },
];

interface IconSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const IconSelect: React.FC<IconSelectProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = ICON_OPTIONS.find(o => o.name === value);
  const SelectedIcon = selected?.Icon;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 bg-black/50 border border-white/10 rounded p-2 text-white text-sm hover:border-white/25 transition-colors"
      >
        <span className="flex items-center gap-2">
          {SelectedIcon ? (
            <>
              <SelectedIcon size={16} className="text-primary flex-shrink-0" />
              <span>{value}</span>
            </>
          ) : (
            <span className="text-gray-500">Select an icon…</span>
          )}
        </span>
        <ChevronDown size={14} className={`text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-gray-900 border border-white/10 rounded-lg shadow-xl">
          {ICON_OPTIONS.map(({ name, Icon }) => (
            <button
              type="button"
              key={name}
              onClick={() => { onChange(name); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-white/10 ${
                value === name ? 'bg-primary/20 text-primary' : 'text-white'
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              <span>{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
