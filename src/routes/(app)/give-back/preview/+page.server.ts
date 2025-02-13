import { ProgramInfo, SangatData } from '$lib/db/schema';
import { db } from '$lib/db/index.js';
import { and, eq } from 'drizzle-orm';

export const load = async ({ request }) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  // Get the value of a specific parameter
  const paramValue = searchParams.get('tokenNo');

  // Do something with the parameter value
  const programData = await db.select().from(ProgramInfo).where(eq(ProgramInfo.Active, true)).limit(1)
  const programId = programData[0].ProgramID
  const data = await db.select().from(SangatData).where(and(
    eq(SangatData.TokenNo, paramValue),
    eq(SangatData.ProgramID, programId)
  )).limit(1)
  return {
    data
  }
};
