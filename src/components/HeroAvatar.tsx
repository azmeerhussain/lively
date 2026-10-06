import React from 'react';
import type { Item } from '../types/app';

interface HeroAvatarProps {
  className?: string;
  primaryColor?: string;
  items: Item[];
}

const HeroAvatar: React.FC<HeroAvatarProps> = ({ 
  className, 
  primaryColor = "#ffd76b", // Defaults to the standard 'unlocked' skin color
  items
}) => {
  return (
    <svg 
      id="HeroAvatarContainer" 
      className={className}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 701.61 744.08"
      style={{ overflow: 'visible' }}
    >
      {/* Base character body segments including ears and head */}
      <g id="BaseBody">
        <path d="M459.14,187.75c-.8-11.34-3.96-20.26-6.48-25.92,2.47-.42,6.88-.78,11.54,1.17,10.22,4.27,12.8,15.87,13.23,18.27,2.42,13.45-2.11,25.19-10.31,29.03-1.72.8-5.03,1.93-9.97,1.1,1.37-5.62,2.69-13.81,1.99-23.65Z" fill={primaryColor} strokeWidth="5" stroke="#414042"/>
        <path d="M141.59,181.27c.43-2.4,3.01-14,13.23-18.27,4.66-1.95,9.07-1.59,11.54-1.17-2.52,5.66-5.68,14.58-6.48,25.92-.7,9.84.63,18.02,1.99,23.65-4.94.83-8.25-.3-9.97-1.1-8.21-3.83-12.73-15.58-10.31-29.03Z" fill={primaryColor} strokeWidth="5" stroke="#414042"/>
        <path d="M309.51,482.52c-15.29,15.93-30.15,22.41-44.17,19.24-25.16-5.66-41.69-40.32-51.39-69.86-.76.6-1.56,1.15-2.39,1.65-6.43,3.8-13.84,3.52-18.24,2.12-9.94-3.16-16.38-14.53-15.33-26.96.84-20.6,5.52-40.59,13.91-59.41,7.86-17.61,18.67-33.51,32.14-47.27-11.58-7.2-62.68-42.33-64.14-101.89-.74-30.15,11.22-58.89,35.54-85.43,20.95-22.86,50.57-32.88,71.74-37.25,19.32-3.99,36.33-4.28,41.14-3.93l.23-.02v.03c.46.04.79.08.96.13.18-.05.5-.09.96-.13v-.03s.23.02.23.02c4.81-.35,21.83-.06,41.14,3.93,21.16,4.37,50.79,14.39,71.74,37.25,24.32,26.54,36.27,55.28,35.54,85.43-1.45,59.57-52.55,94.69-64.14,101.89,13.48,13.77,24.29,29.66,32.14,47.27,8.4,18.82,13.08,38.8,13.91,59.32,1.06,12.52-5.39,23.89-15.33,27.05-4.39,1.4-11.81,1.68-18.24-2.12-.83-.49-1.63-1.04-2.39-1.65-9.7,29.54-26.24,64.21-51.39,69.86-2.3.52-4.63.78-6.97.78-11.95,0-24.42-6.71-37.2-20.02Z" fill={primaryColor} stroke="#414042" strokeMiterlimit="10" strokeWidth="5"/>
      </g>

      <path d="M284.63,200c.41.61,10.53,15.22,28.01,14.09,14.99-.97,23.04-12.72,23.95-14.09" fill="none" stroke="#414042" strokeMiterlimit="10" strokeWidth="4"/>
      <line x1="284.63" y1="243.83" x2="336.59" y2="243.83" fill="none" stroke="#414042" strokeMiterlimit="10" strokeWidth="4"/>
      <circle cx="225.83" cy="180.22" r="16.72" fill="#414042" />
      <circle cx="395.39" cy="180.22" r="16.72" fill="#414042" />
    
    {/* Overlay items (clothing, hats, etc.) with dynamic color injection */}
      <g>
        {items.map((item : Item) => 
          <g key={item.id} dangerouslySetInnerHTML={{__html: item.image.replaceAll("{COLOR}", item.color)}} />
        )}
      </g>
    </svg>
  );
};

export default HeroAvatar;