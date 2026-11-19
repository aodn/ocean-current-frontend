import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import '@/configs/dayjs';
import { sharedQueryConfig } from '@/configs/query';
import { fetchGliderMissionById, searchGliderMissions } from '@/services/gliders';
import { DateFormat } from '@/types/date';
import { GLIDERS_DEPLOYMENTS_URL } from '@/utils/gliders-map-utils/deployments';
import { gliderProfileHref } from '@/utils/gliders-map-utils/links';

const campaignName = (name: string) => name.trim().toLowerCase().replace(/_nrt$/, '');

export async function resolveImageTag(name: string, glider: string, date: string, signal?: AbortSignal) {
  const requested = dayjs(date, [DateFormat.SECOND, DateFormat.MINUTE, DateFormat.HOUR, DateFormat.DAY], true);
  if (!requested.isValid() || !/^[\w-]+$/.test(name))
    return { reason: 'Unable to locate this glider mission.' } as const;

  const campaign = campaignName(name);
  const gliderId = glider.trim().toUpperCase();
  const candidates = (await searchGliderMissions(campaign, signal)).filter(
    (mission) =>
      campaignName(mission.mission_name) === campaign &&
      (!/^S[LG]\d+$/.test(gliderId) || mission.glider_id?.trim().toUpperCase() === gliderId),
  );
  if (!candidates.length) return { reason: 'Unable to locate this glider mission.' } as const;

  const missions = await Promise.all(candidates.map(({ id }) => fetchGliderMissionById(id, signal)));
  const matches = missions.flatMap((mission) => {
    const sameDay = (mission.image_history?.['12d'] ?? [])
      .map(({ date }) => dayjs(date))
      .filter((frame) => frame.isSame(requested, 'day'))
      .sort((a, b) => Math.abs(a.diff(requested)) - Math.abs(b.diff(requested)) || a.diff(b));
    const frame = sameDay[0];
    return frame
      ? [
          {
            mission,
            date: frame.format(DateFormat.HOUR),
            distance: date.length === 8 ? 0 : Math.abs(frame.diff(requested)),
          },
        ]
      : [];
  });
  const nrt = (match: (typeof matches)[number]) =>
    Number(match.mission.is_nrt ?? /_nrt$/i.test(match.mission.mission_name));
  matches.sort((a, b) => a.distance - b.distance || nrt(b) - nrt(a));
  const [best, next] = matches;
  if (!best) return { reason: 'No 12-day profile is available for this image date.' } as const;
  if (next && next.distance === best.distance && nrt(next) === nrt(best)) {
    return { reason: 'Unable to locate this glider mission.' } as const;
  }
  return best;
}

export default function GliderImageTag() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const client = useQueryClient();
  const name = params.get('mission') ?? '';
  const glider = params.get('glider') ?? '';
  const date = params.get('date') ?? '';
  const { data, isError, refetch } = useQuery({
    ...sharedQueryConfig,
    queryKey: ['gliders', 'image-tag', name, glider, date],
    queryFn: ({ signal }) => resolveImageTag(name, glider, date, signal),
    retry: false,
  });

  useEffect(() => {
    if (!data || 'reason' in data) return;
    client.setQueryData(['gliders', 'missionById', data.mission.id], data.mission);
    void navigate(gliderProfileHref(data.mission.id, '12d', data.date), { replace: true });
  }, [client, data, navigate]);

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      {isError ? (
        <div role="alert">
          <p>Unable to load the Gliders catalogue.</p>
          <button type="button" className="underline" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      ) : data && 'reason' in data ? (
        <p role="status">{data.reason}</p>
      ) : (
        <p role="status">Finding glider mission…</p>
      )}
      <Link className="underline" to={GLIDERS_DEPLOYMENTS_URL}>
        Browse Gliders deployments
      </Link>
    </div>
  );
}
