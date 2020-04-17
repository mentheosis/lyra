import {createStandardAction} from 'typesafe-actions';
import {InteractionRecord, SelectionRecord, ApplicationRecord, InteractionInput} from '../store/factory/Interaction';
import {Dispatch} from 'redux';
import {addInteractionToGroup} from './bindChannel/helperActions';
import {assignId} from '../util/counter';
import {State} from '../store';

function nameInteraction(state: State): string {
  const num = state.getIn(['vis', 'present', 'interactions']).size;
  return 'Interaction ' + (num + 1);
}
export function addInteraction (record: InteractionRecord) {
  return function(dispatch: Dispatch, getState: () => State) {
    const id: number = record.id || assignId(dispatch, getState());
    record = record.set('id', id);
    if (!record.get('name')) {
      record = record.set('name', nameInteraction(getState()));
    }

    dispatch(baseAddInteraction(record, id));
    dispatch(addInteractionToGroup(id, record.groupId));
  };
}

export const baseAddInteraction = createStandardAction('ADD_INTERACTION')<InteractionRecord, number>();

export const setInput = createStandardAction('SET_INPUT')<InteractionInput, number>();
export const setSelection = createStandardAction('SET_SELECTION')<SelectionRecord, number>();

export const setApplication = createStandardAction('SET_APPLICATION')<ApplicationRecord, number>();

export const removeApplication = createStandardAction('REMOVE_APPLICATION')<ApplicationRecord, number>();

export const deleteInteraction = createStandardAction('DELETE_INTERACTION')<{groupId: number}, number>(); // id

export const updateInteractionName = createStandardAction('UPDATE_INTERACTION_NAME')<string, number>();
