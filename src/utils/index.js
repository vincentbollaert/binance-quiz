// made minor modifications to this Durstenfeld shuffle - https://stackoverflow.com/a/12646864
export function randomiseArray(array) {
  const arrayClone = [...array]
  for (let i = arrayClone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayClone[i], arrayClone[j]] = [arrayClone[j], arrayClone[i]]
  }
  return arrayClone
}

export const placeholder = ''
