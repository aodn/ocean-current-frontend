import dayjs from 'dayjs';
import OceanCurrentDatePicker from '@/components/DatePicker';
import { Button } from '@/components/Shared';
import { ResetIcon } from '@/components/Shared/Icons/ui';
import { useGliderMission } from '@/services/hooks';
import { DateFormat } from '@/types/date';

const GliderDatePagination = () => {
  const { frames, frameIndex, selectedFrame, setDate, isTemperatureSalinity, isVideo } = useGliderMission();
  if (isTemperatureSalinity || !selectedFrame) return null;

  const selectFrame = (index: number) => {
    if (frames[index]) setDate(dayjs(frames[index].date).toDate());
  };

  return (
    <>
      <div className="border-imos-calypso-blue/50 flex h-11 min-w-0 grow basis-[calc(100%-4rem)] items-center rounded-md border bg-white md:max-w-[420px] md:basis-auto md:border-none">
        <OceanCurrentDatePicker
          productId="gliders"
          dateList={frames.map(({ date }) => ({ date: dayjs(date).format(DateFormat.HOUR) }))}
          selectedDate={dayjs(selectedFrame.date).toDate()}
          dateFormat={DateFormat.HOUR}
          goToPrevious={() => selectFrame(frameIndex - 1)}
          goToNext={() => selectFrame(frameIndex + 1)}
          canGoPrevious={frameIndex > 0}
          canGoNext={frameIndex < frames.length - 1}
          onChange={setDate}
          isDatePickerDisabled={isVideo}
        />
      </div>
      <Button
        dataTestId="date-reset-button"
        onClick={() => selectFrame(frames.length - 1)}
        className="flex-center border-imos-calypso-blue/50 h-11 w-12 shrink-0 rounded-md bg-white p-3! md:border-none md:p-4!"
        aria-label="Reset to latest date"
        disabled={isVideo}
        borderRadius="extraSmall"
      >
        <ResetIcon color="imos-deep-blue" size="lg" />
      </Button>
    </>
  );
};

export default GliderDatePagination;
