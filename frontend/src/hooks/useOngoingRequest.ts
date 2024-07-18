import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchEntry, setStatusToRequested } from '../features/entry/slice';
import {
  selectEntries,
  selectSelectedChoices
} from '../features/history/selectors';
import {
  selectEntry,
  selectStatusIsRequested
} from '../features/entry/selectors';
import { addEntry, addSelectedChoice } from '../features/history/slice';
import { useAppDispatch } from './useAppDispatch';

export function useOngoingRequest() {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const entries = useSelector(selectEntries);
  const choices = useSelector(selectSelectedChoices);
  const currentEntry = useSelector(selectEntry);
  const isRequested = useSelector(selectStatusIsRequested);

  useEffect(() => {
    if (currentEntry && selectedChoice !== null) {
      setSelectedChoice(null);
      dispatch(addEntry(currentEntry));
      dispatch(addSelectedChoice(selectedChoice));
      dispatch(setStatusToRequested());
    }
  }, [currentEntry, dispatch, selectedChoice]);

  useEffect(() => {
    if (isRequested) {
      void requestData();
    }
    async function requestData() {
      const data = {
        entries,
        choices
      };

      const requestData = {
        endpoint: 'prompt/ongoing',
        data
      };

      await dispatch(fetchEntry(requestData));
    }
  }, [choices, dispatch, entries, isRequested]);

  function requestOngoing(index: number) {
    return () => setSelectedChoice(index);
  }
  return requestOngoing;
}
