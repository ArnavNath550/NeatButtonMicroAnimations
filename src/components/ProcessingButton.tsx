import * as React from "react";
import ComponentContainer from "./ComponentContainer";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const ProcessingButton: React.FC = () => {
  const processingStages = [
    { id: 0, name: "Start Processing", loading: false, success: false },
    { id: 1, name: "Processing", loading: true, success: false },
    { id: 2, name: "Successfully Processed", loading: false, success: true },
  ];

  const [processIndex, setProcessIndex] = React.useState(0);
  const currentStage = processingStages[processIndex];

  const handleProcessIndex = () => {
    if (!currentStage.loading) {
      setProcessIndex(
        processIndex + 1 < processingStages.length ? processIndex + 1 : 0,
      );
    }
  };

  React.useEffect(() => {
    if (currentStage.loading) {
      const t = setTimeout(() => {
        setProcessIndex(processIndex + 1);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [processIndex]);

  return (
    <ComponentContainer>
      <MotionButton
        onClick={handleProcessIndex}
        layout
        $loading={currentStage.loading}
        $success={currentStage.success}
        whileTap={{ scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 18,
          mass: 0.4,
        }}
      >
        <ContentWrapper layout>
          {/* Spinner or Success Checkmark */}
          <AnimatePresence initial={false} mode="popLayout">
            {(currentStage.loading || currentStage.success) && (
              <motion.div
                key={currentStage.success ? "checkmark" : "spinner"}
                initial={{
                  opacity: 0,
                  x: -18,
                  scale: 0.85,
                  filter: "blur(2px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: 18,
                  scale: 0.85,
                  filter: "blur(2px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 16,
                  mass: 0.28,
                }}
              >
                {currentStage.success ? (
                  <SuccessIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576zM438 209.7C427.3 201.9 412.3 204.3 404.5 215L285.1 379.2L233 327.1C223.6 317.7 208.4 317.7 199.1 327.1C189.8 336.5 189.7 351.7 199.1 361L271.1 433C276.1 438 282.9 440.5 289.9 440C296.9 439.5 303.3 435.9 307.4 430.2L443.3 243.2C451.1 232.5 448.7 217.5 438 209.7z" />
                    </svg>
                  </SuccessIcon>
                ) : (
                  <Spinner />
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text — push animation */}
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={currentStage.name}
              layout
              initial={{
                opacity: 0,
                x: -20,
                filter: "blur(3px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: 20,
                filter: "blur(3px)",
              }}
              transition={{
                type: "spring",
                stiffness: 210,
                damping: 20,
                mass: 0.28,
              }}
            >
              {currentStage.name}
            </motion.span>
          </AnimatePresence>
        </ContentWrapper>
      </MotionButton>
    </ComponentContainer>
  );
};

export default ProcessingButton;

/* Motion Button (color states) */
const MotionButton = styled(motion.button)<{
  $loading: boolean;
  $success: boolean;
}>`
  background-color: ${({ $loading, $success }) =>
    $success
      ? "var(--success)"
      : $loading
        ? "var(--secondary)"
        : "var(--primary)"};

  color: #fff;
  outline: none;
  border: 0px;
  padding: 15px 22px;
  border-radius: 999px;
  font-family: Roboto;
  font-weight: 450;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  transition:
    background-color 0.35s ease,
    filter 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    background-color: ${({ $loading, $success }) =>
      $success
        ? "var(--successDarker)"
        : $loading
          ? "var(--secondaryDarker)"
          : "var(--primaryDarker)"};
  }
  box-shadow:
    rgba(0, 0, 0, 0.02) 0px 3px 6px -2px,
    rgba(0, 0, 0, 0.043) 0px 1px 1px;
`;

const ContentWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* Spinner */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.32);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 0.85s linear infinite;
`;

/* Success Icon with SVG */
const SuccessIcon = styled.div`
  width: 25px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: color-mix(in srgb, var(--success) 35%, transparent);

  svg {
    width: 25px;
    height: 25px;
    fill: white;
    opacity: 0.5;
  }
`;
