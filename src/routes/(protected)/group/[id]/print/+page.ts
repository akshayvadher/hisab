import type { PageLoad } from './$types';
import { get } from '$lib/firebase/db/group';

export const load: PageLoad = async ({ params }) => {
  const group = await get(params.id);
  return {
    ...params,
    group,
  };
};
