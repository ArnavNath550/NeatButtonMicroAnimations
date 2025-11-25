import { motion, useAnimation } from "framer-motion";
import * as React from "react";
import styled from "styled-components";
import ComponentContainer from "./ComponentContainer";

const HOLD_DURATION = 1500;

const HoldToDeleteButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const holdTimer = React.useRef<NodeJS.Timeout | null>(null);

  const progressControls = useAnimation();
  const textControls = useAnimation();
  const lidControls = useAnimation();
  const iconBounceControls = useAnimation();

  const resetButton = () => {
    setSuccess(false);
    setLoading(false);

    progressControls.set({ clipPath: "inset(0% 100% 0% 0%)" });

    textControls.set({ opacity: 0, y: 10 });

    lidControls.set({ rotate: 0, y: 0 });

    iconBounceControls.set({ scale: 1 });
  };

  const startHold = () => {
    if (success) {
      resetButton();
      return;
    }

    setLoading(true);

    progressControls.start({
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: HOLD_DURATION / 1000, ease: "linear" },
    });

    lidControls.start({
      rotate: -35,
      y: -50,
      transition: { duration: 0.28, ease: "easeOut" },
    });

    holdTimer.current = setTimeout(() => {
      setSuccess(true);
      setLoading(false);

      textControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.35 },
      });

      lidControls.start({
        rotate: 0,
        y: 0,
        transition: { type: "spring", stiffness: 650, damping: 14 },
      });

      iconBounceControls.start({
        scale: [1, 1.12, 0.96, 1.04, 1],
        transition: { duration: 0.45, ease: "easeOut" },
      });
    }, HOLD_DURATION);
  };

  const cancelHold = () => {
    if (success) return;

    setLoading(false);

    progressControls.stop();
    progressControls.set({ clipPath: "inset(0% 100% 0% 0%)" });

    lidControls.start({
      rotate: 0,
      y: 0,
      transition: { duration: 0.2 },
    });

    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  return (
    <ComponentContainer>
      <ButtonWrapper>
        <MotionButton
          $loading={loading}
          $success={success}
          onMouseDown={startHold}
          onMouseUp={cancelHold}
          onMouseLeave={cancelHold}
        >
          <ProgressFill
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={progressControls}
          />

          <ContentRow animate={iconBounceControls}>
            <TrashIcon viewBox="0 0 640 640">
              <motion.path
                d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9z"
                fill="currentColor"
                animate={lidControls}
                style={{
                  transformOrigin: "50% 90%", // lid hinge point
                }}
              />

              <path
                d="M512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                fill="currentColor"
              />
            </TrashIcon>

            <TextWrapper>
              <motion.span
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: success ? 0 : 1, y: success ? -10 : 0 }}
                transition={{ duration: 0.3 }}
              >
                Hold To Delete
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={textControls}
                style={{ position: "absolute" }}
              >
                Deleted
              </motion.span>
            </TextWrapper>
          </ContentRow>
        </MotionButton>
      </ButtonWrapper>
    </ComponentContainer>
  );
};

export default HoldToDeleteButton;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const MotionButton = styled(motion.button)<{
  $loading: boolean;
  $success: boolean;
}>`
  position: relative;
  overflow: hidden;
  background-color: ${({ $loading, $success }) =>
    $success
      ? "var(--success)"
      : $loading
        ? "var(--dangerLighter)"
        : "var(--danger)"};

  color: #fff;
  outline: none;
  border: none;
  padding: 15px 24px;
  border-radius: 999px;
  font-family: Roboto;
  font-weight: 450;
  font-size: 1rem;
  cursor: pointer;

  transition: background-color 0.35s ease;
  display: inline-flex;
  align-items: center;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    background-color: ${({ $loading, $success }) =>
      $success
        ? "var(--successDarker)"
        : $loading
          ? "var(--danger)"
          : "var(--dangerDarker)"};
  }
`;

const ContentRow = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TrashIcon = styled.svg`
  width: 26px;
  height: 18px;
  color: white;
  display: block;
`;

const ProgressFill = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.15);
  pointer-events: none;
`;

const TextWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  pointer-events: none;
`;
