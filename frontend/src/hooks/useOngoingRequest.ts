import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchEntry } from '../features/entry/slice';
import {
  selectEntries,
  selectSelectedChoices
} from '../features/history/selectors';
import { selectEntry } from '../features/entry/selectors';
import { setEntries, setSelectedChoices } from '../features/history/slice';
import { useAppDispatch } from './useAppDispatch';

export function useOngoingRequest() {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const previousEntries = useSelector(selectEntries);
  const previousChoices = useSelector(selectSelectedChoices);
  const currentEntry = useSelector(selectEntry);

  useEffect(() => {
    if (selectedChoice !== null) {
      void requestData();
    }
    async function requestData() {
      setSelectedChoice(null);
      const entries = [...previousEntries, currentEntry];
      const choices = [...previousChoices, selectedChoice as number];

      dispatch(setEntries(entries));
      dispatch(setSelectedChoices(choices));

      const data = {
        entries,
        choices
      };

      const requestData = {
        endpoint: 'ongoing',
        data
      };

      await dispatch(fetchEntry(requestData)); // todo validate
    }
  }, [dispatch, selectedChoice]);

  function requestOngoing(index: number) {
    return () => setSelectedChoice(index);
  }
  return requestOngoing;
}
