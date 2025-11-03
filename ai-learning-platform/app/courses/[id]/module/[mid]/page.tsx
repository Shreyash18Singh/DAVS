import React from 'react';
import ModuleClient from '../../../../components/ModuleClient';

export default function ModulePage({ params }: { params: { id: string; mid: string } }) {
  const { id, mid } = params;
  // Render a client component that fetches seed.json and handles quiz interaction
  return <ModuleClient courseId={id} moduleId={mid} />;
}
