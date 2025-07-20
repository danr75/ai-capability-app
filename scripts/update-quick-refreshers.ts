import fs from 'fs';
import path from 'path';

// Define the template for the quick refresher page
const template = `"use client";

import QuickRefresher from '@/components/ui/QuickRefresher';

type Question = {
  id: number;
  text: string;
  blank: string;
  options: {
    id: string;
    text: string;
    correct: boolean;
  }[];
  explanation: string;
};

export default function QuickRefreshersPage() {
  const questions: Question[] = [
    {
      id: 1,
      text: "is an example concept in this skill area",
      blank: "___________",
      options: [
        { id: "concept1", text: "Example Concept 1", correct: true },
        { id: "concept2", text: "Example Concept 2", correct: false }
      ],
      explanation: "This is an example explanation for the correct answer."
    },
    // Add more questions here
  ];

  const tipText = (
    <>
      <span className="text-primary font-medium">Skill Tip:</span> This is an example tip that provides additional context about the skill area.
    </>
  );

  return (
    <QuickRefresher
      questions={questions}
      skillArea="Skill Area Name"
      backLink="/skills/skill-area"
      tipText={tipText}
      completionLink="/skills/skill-area/quick-refreshers/completion"
    />
  );
}`;

// List of skill areas to update
const skillAreas = [
  'data-tech',
  'foundations-ecosystem',
  'governance-policy-risk',
  'leadership-strategy',
  'workforce-enablement'
];

// Base directory for skills
const baseDir = path.join(process.cwd(), 'src/app/(protected)/skills');

// Update each skill area
skillAreas.forEach(skillArea => {
  const refresherDir = path.join(baseDir, skillArea, 'quick-refreshers');
  const pagePath = path.join(refresherDir, 'page.tsx');
  
  // Check if the quick-refreshers directory exists
  if (fs.existsSync(refresherDir)) {
    // Create a backup of the existing file
    if (fs.existsSync(pagePath)) {
      const backupPath = path.join(refresherDir, 'page.tsx.bak');
      fs.copyFileSync(pagePath, backupPath);
      console.log(`Created backup at ${backupPath}`);
    }
    
    // Write the new template
    fs.writeFileSync(pagePath, template, 'utf8');
    console.log(`Updated quick refresher for ${skillArea}`);
  } else {
    console.log(`Skipping ${skillArea} - quick-refreshers directory not found`);
  }
});

console.log('Update complete!');
