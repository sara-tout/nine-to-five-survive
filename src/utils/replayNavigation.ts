/** Clear run state and open character select for a fresh shift. */
export function startNewRun(navigation: { reset: (state: unknown) => void }, resetAfterRun: () => void) {
  resetAfterRun();
  navigation.reset({
    index: 0,
    routes: [{ name: 'CharacterSelect' }],
  });
}

/** Bottom breathing room below scroll content. The footer is laid out as a sibling
 * beneath the scroll view (not overlapping), so this only needs to be a small gap. */
export const END_RUN_FOOTER_SPACE = 24;
