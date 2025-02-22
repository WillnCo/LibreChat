import type { TMessage } from 'librechat-data-provider';
import { useMessageHandler, useMediaQuery, useGenerations } from '~/hooks';
import { cn } from '~/utils';
import Regenerate from './Regenerate';
import Continue from './Continue';
import Stop from './Stop';

type GenerationButtonsProps = {
  endpoint: string;
  showPopover: boolean;
  opacityClass: string;
};

export default function GenerationButtons({
  endpoint,
  showPopover,
  opacityClass,
}: GenerationButtonsProps) {
  const {
    messages,
    isSubmitting,
    latestMessage,
    handleContinue,
    handleRegenerate,
    handleStopGenerating,
  } = useMessageHandler();
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const { continueSupported, regenerateEnabled } = useGenerations({
    endpoint,
    message: latestMessage as TMessage,
    isSubmitting,
  });

  if (isSmallScreen) {
    return null;
  }

  let button: React.ReactNode = null;

  if (isSubmitting) {
    button = <Stop onClick={handleStopGenerating} />;
  } else if (continueSupported) {
    button = <Continue onClick={handleContinue} />;
  } else if (messages && messages.length > 0 && regenerateEnabled) {
    button = <Regenerate onClick={handleRegenerate} />;
  }

  return (
    <div className="absolute bottom-4 right-0 z-[62]">
      <div className="grow" />
      <div className="flex items-center md:items-end">
        <div
          className={cn('option-buttons', showPopover ? '' : opacityClass)}
          data-projection-id="173"
        >
          {button}
        </div>
      </div>
    </div>
  );
}
