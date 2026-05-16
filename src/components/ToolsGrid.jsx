import React from 'react';
import {
  SiFigma,
  SiSketch,
  SiFramer,
  SiWebflow,
  SiInvision,
  SiNotion,
  SiJira,
  SiMiro,
  SiMaze,
  SiSlack,
  SiDribbble,
  SiBehance,
  SiLoom,
  SiClaude,
  SiOpenai
} from 'react-icons/si';
import { 
  TbBrandAdobeXd,
  TbBrandAdobePhotoshop,
  TbBrandAdobeIllustrator,
  TbBrandAdobeAfterEffect,
  TbBrandAdobePremier
} from 'react-icons/tb';

const tools = [
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Adobe XD', icon: TbBrandAdobeXd, color: '#FF61F6' },
  { name: 'Sketch', icon: SiSketch, color: '#F7B500' },
  { name: 'Framer', icon: SiFramer, color: '#0055FF' },
  { name: 'Webflow', icon: SiWebflow, color: '#4353FF' },
  { name: 'InVision', icon: SiInvision, color: '#FF3366' },
  { name: 'Notion', icon: SiNotion, color: '#FFFFFF' },
  { name: 'Jira', icon: SiJira, color: '#0052CC' },
  { name: 'Maze', icon: SiMaze, color: '#FFFFFF' },
  { name: 'Slack', icon: SiSlack, color: '#4A154B' },
  { name: 'Dribbble', icon: SiDribbble, color: '#EA4C89' },
  { name: 'Behance', icon: SiBehance, color: '#1769FF' },
  { name: 'Loom', icon: SiLoom, color: '#625DF5' },
  { name: 'Photoshop', icon: TbBrandAdobePhotoshop, color: '#31A8FF' },
  { name: 'Illustrator', icon: TbBrandAdobeIllustrator, color: '#FF9A00' },
  { name: 'After Effects', icon: TbBrandAdobeAfterEffect, color: '#9999FF' },
  { name: 'Premiere Pro', icon: TbBrandAdobePremier, color: '#9999FF' },
  { name: 'Claude AI', icon: SiClaude, color: '#D97757' },
  { name: 'ChatGPT', icon: SiOpenai, color: '#10A37F' },
  { name: 'Figma Make', icon: SiFigma, color: '#A259FF' }
];

export default function ToolsGrid() {
  return (
    <div className="tools-grid-container" style={{ width: '100%', marginTop: '24px' }}>
      <div className="tools-grid">
        {tools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div key={index} className="tool-card">
              <Icon size={32} color={tool.color} />
              <span className="tool-name">{tool.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
