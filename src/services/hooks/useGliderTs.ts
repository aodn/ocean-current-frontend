import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { sharedQueryConfig } from '@/configs/query';
import { fetchGliderTsDiagrams } from '@/services/gliders';
import { copyGliderTsIndexFilters } from '@/utils/gliders-map-utils/links';
import type { GliderTsDiagram } from '@/types/gliders';

/** The complete source order is shared by the viewer, navigation and index. */
export default function useGliderTs(enabled = true) {
  const [params] = useSearchParams();
  const missionId = params.get('missionId') ?? '';
  const diagramId = params.get('diagramId');
  const query = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'ts-diagrams'],
    queryFn: ({ signal }) => fetchGliderTsDiagrams(signal),
    enabled,
    // 503 until the publisher adds the index; the views offer a manual retry.
    retry: false,
  });
  const diagrams = query.data ?? [];
  const current = diagrams.findIndex((diagram) =>
    diagramId !== null ? diagram.id === diagramId : diagram.mission_ids.includes(missionId),
  );
  const getDiagramUrl = (diagram: GliderTsDiagram) => {
    const next = new URLSearchParams({ view: 'ts', diagramId: diagram.id });
    const associatedId = diagram.mission_ids.includes(missionId)
      ? missionId
      : diagram.mission_ids.length === 1
        ? diagram.mission_ids[0]
        : undefined;
    if (associatedId) next.set('missionId', associatedId);
    return `/product/gliders?${copyGliderTsIndexFilters(params, next)}`;
  };

  return {
    ...query,
    diagrams,
    diagram: diagrams[current],
    previous: current < 0 ? undefined : getDiagramUrl(diagrams[(current + diagrams.length - 1) % diagrams.length]),
    next: current < 0 ? undefined : getDiagramUrl(diagrams[(current + 1) % diagrams.length]),
    getDiagramUrl,
  };
}
