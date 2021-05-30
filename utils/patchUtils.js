import { produce, produceWithPatches, applyPatches } from "immer"

const noop = () => void 0

export const produceWithPatch = (state, id, mutations = noop) => {
  if (!id) {
    throw new Error("must include Id for undoable actions")
  }

  const [nextState, patches, inversePatches] = produceWithPatches(
    state,
    (draft) => {
      mutations(draft)
    }
  )

  return produce(nextState, (draft) => {
    draft.undoStack[id] = {
      patches,
      inversePatches,
    }
  })
}

export const produceWithReversal = (state, id, mutations = noop) => {
  if (!id) {
    throw new Error("must include Id for reversal actions")
  }

  if (!state.undoStack[id]) {
    throw new Error("Invalid patch Id")
  }

  const reversal = state.undoStack[id].inversePatches

  return produce(state, (draft) => {
    applyPatches(draft, reversal)
    mutations(draft)
    delete draft.undoStack[id]
  })
}
