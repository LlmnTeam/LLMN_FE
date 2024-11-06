import { submitAlarmRead } from "@/src/api/commons/header-api";
import { Alarm, AlarmList } from "@/src/types/commons/header-type";
import { useCallback, useEffect, useRef, useState } from "react";

const PAGE_SIZE = 10;

interface UseAlarmProps {
  AlarmListSSR?: AlarmList | null;
  initialCount?: number;
}

interface UseAlarmReturn {
  isAlarmOpen: boolean;
  displayedAlarms: Alarm[];
  isAllAlarmsLoaded: boolean;
  count: number;
  containerRef: React.RefObject<HTMLDivElement>;
  handleAlarmButton: () => void;
  handleAlarmClick: (id: number) => Promise<boolean>;
  handleScroll: () => void;
}

export default function useAlarm({
  AlarmListSSR = null,
  initialCount = 0,
}: UseAlarmProps): UseAlarmReturn {
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [displayedAlarms, setDisplayedAlarms] = useState<Alarm[]>([]);
  const [isAllAlarmsLoaded, setIsAllAlarmsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(initialCount);

  const containerRef = useRef<HTMLDivElement>(null);

  const loadMoreAlarms = useCallback(() => {
    if (!AlarmListSSR?.alarms) return;

    const newAlarms = AlarmListSSR.alarms.slice(0, page * PAGE_SIZE);
    setDisplayedAlarms(newAlarms);

    if (newAlarms.length >= AlarmListSSR.alarms.length) {
      setIsAllAlarmsLoaded(true);
    }
  }, [AlarmListSSR, page]);

  const handleScroll = useCallback(() => {
    if (containerRef.current && !isAllAlarmsLoaded) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
        }, 500);
      }
    }
  }, [isAllAlarmsLoaded]);

  useEffect(() => {
    loadMoreAlarms();
  }, [page, loadMoreAlarms]);

  const handleAlarmButton = () => {
    setIsAlarmOpen((prev) => !prev);
  };

  const handleAlarmClick = async (id: number): Promise<boolean> => {
    if (count <= 0) return false;

    const result = await submitAlarmRead(id);
    if (result) {
      setCount((prevCount) => prevCount - 1);
      return true;
    }
    return false;
  };

  return {
    isAlarmOpen,
    displayedAlarms,
    isAllAlarmsLoaded,
    count,
    containerRef,
    handleAlarmButton,
    handleAlarmClick,
    handleScroll,
  };
}
