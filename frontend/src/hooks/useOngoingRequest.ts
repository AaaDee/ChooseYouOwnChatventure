import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEntry } from '../features/entry/slice';
import {
  selectEntries,
  selectSelectedChoices
} from '../features/history/selectors';
import { selectEntry } from '../features/entry/selectors';
import { setEntries, setSelectedChoices } from '../features/history/slice';

export function useOngoingRequest() {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const dispatch = useDispatch();
  const previousEntries = useSelector(selectEntries);
  const previousChoices = useSelector(selectSelectedChoices);
  const currentEntry = useSelector(selectEntry);

  useEffect(() => {
    if (selectedChoice !== null) {
      void requestData();
    }
    async function requestData() {
      const entries = [...previousEntries, currentEntry];
      const choices = [...previousChoices, selectedChoice as number];

      dispatch(setEntries(entries));
      dispatch(setSelectedChoices(choices));

      const response = await axios.post('http://localhost:3001/ongoing', {
        entries,
        choices
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(setEntry(response.data));
      setSelectedChoice(null);
    }
  }, [selectedChoice]);

  function requestOngoing(index: number) {
    return () => setSelectedChoice(index);
  }
  return requestOngoing;
}
