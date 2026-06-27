/** Clear run state and open character select for a fresh shift. */
export function startNewRun(navigation: { reset: (state: unknown) => void }, resetAfterRun: () => void) {
  resetAfterRun();
  navigation.reset({
    index: 0,
    routes: [{ name: 'CharacterSelect' }],
  });
}

/** Height reserved above the pinned footer so scroll content is not hidden underneath. */
export const END_RUN_FOOTER_SPACE = 168;
