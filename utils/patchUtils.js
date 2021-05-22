import { produce, produceWithPatches, applyPatches } from 'immer'

const noop = () => void 0

export const produceWithPatch = (state, id, mutations = noop) => {
  if(!id) {
    throw new Error('must include Id for undoable actions')
  }

  const [nextState, patches, inversePatches] = produceWithPatches(
    state,
    draft => {
      mutations(draft)
    },
  )
  
  const buffer = produce(nextState, draft => {
    draft.undoStack[id] = {
      patches,
      inversePatches
    }
  })

  return buffer
}

export const produceWithReversal = (state, id, mutations = noop) => {
  if(!id) {
    throw new Error('must include Id for reversal actions')
  }
  
  if (!state.undoStack[id]) {
    throw new Error('Invalid patch Id')
  }

  const reversal = state.undoStack[id].inversePatches
  
  return produce(applyPatches(state, reversal), draft => {
    mutations(draft)
    delete draft.undoStack[id] 
  })
}
