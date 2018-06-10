export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const EDIT_ENTRY = 'EDIT_ENTRY'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry,
  }
}

export function editEntry (entry) {
  return {
    type: EDIT_ENTRY,
    entry,
  }
}