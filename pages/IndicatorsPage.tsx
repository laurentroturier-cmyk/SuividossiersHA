


import React, { useState, useEffect, useMemo } from 'react';
import { Project } from '../types';
import { IndicatorTile } from '../components/IndicatorTile';
import { BarChart3, Briefcase, Calculator, Layers } from 'lucide-react';
import { getUniqueValues } from '../utils';


export const IndicatorsPage: React.FC<{ projects: Project[] }> = ({ projects }) => {
  // Génération dynamique des listes déroulantes
  const buyers = useMemo(() => ['Tous', ...getUniqueValues(projects, 'Acheteur')], [projects]);
  const procedureTypes = useMemo(() => ['Tous', ...getUniqueValues(projects.flatMap(p => p.procedures || []), 'Type de procédure')], [projects]);

  const [selectedBuyer, setSelectedBuyer] = useState('Tous');
  const [selectedProcedure, setSelectedProcedure] = useState('Tous');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    let filtered = projects;
    if (selectedBuyer !== 'Tous') {
      filtered = filtered.filter(p => p.Acheteur === selectedBuyer);
    }
    if (selectedProcedure !== 'Tous') {
      filtered = filtered.filter(p =>
        (p.procedures || []).some(proc => proc['Type de procédure'] === selectedProcedure)
      );
    }
    setFilteredProjects(filtered);
  }, [selectedBuyer, selectedProcedure, projects]);

  // Calculs des indicateurs
  const nbProjets = filteredProjects.length;
  const nbProcedures = filteredProjects.reduce((acc, p) => acc + (p.procedures ? p.procedures.length : 0), 0);
  const montantTotalProjets = filteredProjects.reduce((acc, p) => acc + (parseFloat(p['Montant prévisionnel du marché (€ TTC)']) || 0), 0);
  const montantMoyenProjet = nbProjets > 0 ? (montantTotalProjets / nbProjets) : 0;
  let montantTotalProcedures = 0;
  filteredProjects.forEach(p => {
    if (p.procedures) {
      montantTotalProcedures += p.procedures.reduce((acc, proc) => acc + (parseFloat(proc['Montant prévisionnel du marché (€ HT)']) || 0), 0);
    }
  });
  const montantMoyenProcedure = nbProcedures > 0 ? (montantTotalProcedures / nbProcedures) : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Indicateurs</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-xs font-semibold mb-1">Acheteur</label>
          <select value={selectedBuyer} onChange={e => setSelectedBuyer(e.target.value)} className="px-3 py-2 border rounded-md">
            {buyers.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Type de procédure</label>
          <select value={selectedProcedure} onChange={e => setSelectedProcedure(e.target.value)} className="px-3 py-2 border rounded-md">
            {procedureTypes.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <IndicatorTile label="Nombre de projets" value={nbProjets} icon={<Briefcase size={32} />} />
        <IndicatorTile label="Nombre de procédures" value={nbProcedures} icon={<Layers size={32} />} />
        <IndicatorTile label="Montant moyen par projet (€)" value={montantMoyenProjet.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} icon={<BarChart3 size={32} />} />
        <IndicatorTile label="Montant moyen par procédure (€)" value={montantMoyenProcedure.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} icon={<Calculator size={32} />} />
      </div>
    </div>
  );
};
