import { CharacterRole } from './characters';

/**
 * Role perks (Phase 4): each role picks 1 of 2 at the start of a run, creating
 * different viable strategies. Effects are plain data so the game, the win-rate
 * simulation, and tests all read the same source of truth.
 */
export type PerkId =
  | 'deep-work'
  | 'ship-fast'
  | 'scope-cutter'
  | 'stakeholder-whisperer'
  | 'sponge'
  | 'eager-beaver'
  | 'polish'
  | 'boundaries'
  | 'receipts'
  | 'stoic'
  | 'steady-hands'
  | 'on-call-grit'
  | 'sponsor'
  | 'grounded'
  | 'rigor'
  | 'tenured-calm';

export interface PerkEffect {
  /** Better odds toward the best-career outcome on this choice (like a free partial prep). */
  oddsChoice?: 'yes' | 'no';
  oddsBonus?: number;
  /** Extra performance on positive outcomes for this choice. */
  perfBonusChoice?: 'yes' | 'no';
  perfBonus?: number;
  /** 0..1: fraction of negative energy damage absorbed. */
  energyShield?: number;
  /** 0..1: fraction of negative sanity damage absorbed. */
  sanityShield?: number;
  /** 0..1: how much the low-stat (depletion) penalty is reduced. */
  depletionResist?: number;
}

export interface Perk {
  id: PerkId;
  role: CharacterRole;
  name: string;
  tagline: string;
  effect: PerkEffect;
}

export const PERKS_BY_ROLE: Record<CharacterRole, [Perk, Perk]> = {
  builder: [
    {
      id: 'deep-work',
      role: 'builder',
      name: 'Deep Work',
      tagline: 'Protecting focus time costs you less sanity, and declining lands cleaner.',
      effect: { sanityShield: 0.4, oddsChoice: 'no', oddsBonus: 10 },
    },
    {
      id: 'ship-fast',
      role: 'builder',
      name: 'Ship Fast',
      tagline: 'Saying yes and shipping turns into more visible performance.',
      effect: { perfBonusChoice: 'yes', perfBonus: 3 },
    },
  ],
  'product-partner': [
    {
      id: 'scope-cutter',
      role: 'product-partner',
      name: 'Scope Cutter',
      tagline: 'Guarding the plan protects your energy, and pushing back lands cleaner.',
      effect: { energyShield: 0.4, oddsChoice: 'no', oddsBonus: 10 },
    },
    {
      id: 'stakeholder-whisperer',
      role: 'product-partner',
      name: 'Stakeholder Whisperer',
      tagline: 'Engaging with the room tilts the odds your way.',
      effect: { oddsChoice: 'yes', oddsBonus: 14 },
    },
  ],
  'fast-learner': [
    {
      id: 'sponge',
      role: 'fast-learner',
      name: 'Sponge',
      tagline: 'You adapt fast: being tired or frazzled hurts your judgment less.',
      effect: { depletionResist: 0.6 },
    },
    {
      id: 'eager-beaver',
      role: 'fast-learner',
      name: 'Eager Beaver',
      tagline: 'Diving in earns more performance when you say yes.',
      effect: { perfBonusChoice: 'yes', perfBonus: 4 },
    },
  ],
  craftsperson: [
    {
      id: 'polish',
      role: 'craftsperson',
      name: 'Polish',
      tagline: 'When you commit to the work, quality shows and the odds improve.',
      effect: { oddsChoice: 'yes', oddsBonus: 12 },
    },
    {
      id: 'boundaries',
      role: 'craftsperson',
      name: 'Boundaries',
      tagline: 'Holding the line keeps you sane.',
      effect: { sanityShield: 0.45 },
    },
  ],
  'truth-finder': [
    {
      id: 'receipts',
      role: 'truth-finder',
      name: 'Receipts',
      tagline: 'Speaking up with the data behind you tilts the odds your way.',
      effect: { oddsChoice: 'yes', oddsBonus: 13 },
    },
    {
      id: 'stoic',
      role: 'truth-finder',
      name: 'Stoic',
      tagline: 'The noise gets to you less, in stat and in spirit.',
      effect: { sanityShield: 0.4, depletionResist: 0.3 },
    },
  ],
  'reliability-pro': [
    {
      id: 'steady-hands',
      role: 'reliability-pro',
      name: 'Steady Hands',
      tagline: 'Calm under pressure: depletion barely dents your judgment.',
      effect: { depletionResist: 0.6 },
    },
    {
      id: 'on-call-grit',
      role: 'reliability-pro',
      name: 'On-Call Grit',
      tagline: 'You weather long days with less energy lost.',
      effect: { energyShield: 0.45 },
    },
  ],
  mentor: [
    {
      id: 'sponsor',
      role: 'mentor',
      name: 'Sponsor',
      tagline: 'Backing your people pays you back in performance and steadier nerves.',
      effect: { perfBonusChoice: 'yes', perfBonus: 3, sanityShield: 0.2 },
    },
    {
      id: 'grounded',
      role: 'mentor',
      name: 'Grounded',
      tagline: 'Hard weeks land softer on your sanity.',
      effect: { sanityShield: 0.5 },
    },
  ],
  professor: [
    {
      id: 'rigor',
      role: 'professor',
      name: 'Rigor',
      tagline: 'Careful, considered choices land cleaner.',
      effect: { oddsChoice: 'no', oddsBonus: 12 },
    },
    {
      id: 'tenured-calm',
      role: 'professor',
      name: 'Tenured Calm',
      tagline: 'Little rattles you: sanity holds and depletion bites less.',
      effect: { sanityShield: 0.4, depletionResist: 0.3 },
    },
  ],
};

const PERK_BY_ID: Record<string, Perk> = Object.values(PERKS_BY_ROLE)
  .flat()
  .reduce((acc, perk) => {
    acc[perk.id] = perk;
    return acc;
  }, {} as Record<string, Perk>);

export function getPerk(id: PerkId | null | undefined): Perk | null {
  if (!id) return null;
  return PERK_BY_ID[id] ?? null;
}

export function getPerkEffect(id: PerkId | null | undefined): PerkEffect | null {
  return getPerk(id)?.effect ?? null;
}

export function getDefaultPerk(role: CharacterRole): PerkId {
  return PERKS_BY_ROLE[role][0].id;
}
