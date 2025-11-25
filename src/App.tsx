import { useState } from "react";
import ProcessingButton from "./components/ProcessingButton";
import HoldToDeleteButton from "./components/HoldToDeleteButton";

import styled from "styled-components";

import { breakpoints } from "./breakpoints";

function App() {
  return (
    <StyledContainer>
      <BluredHeader />
      <StyledContent basics-prose>
        <StyledContentHeading basics-text stagger={1} data-animate>
          <i data-fancy-italic>(Neat)</i> Button Micro-Animations
        </StyledContentHeading>
        <StyledContentDescription basics-text stagger={1.5} data-animate>
          I crafted these neat buttons with micro-animations in them, you can
          take a look at these when your out of ideas, looking for inspiration,
          tired, bored, happy, sad, or just look for neat buttons with
          micro-animations in them.
        </StyledContentDescription>
      </StyledContent>
      <StyledButtonsGroup stagger={2} data-animate>
        <StyledButtonCard>
          <ProcessingButton />
        </StyledButtonCard>
        <StyledButtonCard>
          <HoldToDeleteButton />
        </StyledButtonCard>
      </StyledButtonsGroup>
    </StyledContainer>
  );
}

export default App;

const StyledContainer = styled.div`
  max-width: 550px;
  margin: 4rem auto;
  padding: 0 1rem;

  @media (min-width: ${breakpoints.md}) {
    margin: 6rem auto;
  }

  @media (min-width: ${breakpoints.lg}) {
    margin: 8rem auto;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledContentHeading = styled.div<{ stagger: number }>`
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: -0.2px;
  color: var(--text);
  --stagger: ${(props) => props.stagger};

  @media (min-width: ${breakpoints.sm}) {
    font-size: 1.25rem;
  }
`;

const StyledContentDescription = styled.div<{ stagger: number }>`
  font-size: 0.95rem;
  letter-spacing: -0.2px;
  font-weight: 400;
  color: var(--info);
  line-height: 28px;
  --stagger: ${(props) => props.stagger};

  @media (min-width: ${breakpoints.sm}) {
    font-size: 1rem;
    line-height: 30px;
  }
`;

const StyledButtonsGroup = styled.div<{ stagger: number }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 1.5rem 0;
  --stagger: ${(props) => props.stagger};
  @media (min-width: ${breakpoints.md}) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const StyledButtonCard = styled.div`
  width: 100%;
  height: 220px;
  background-color: #fafafa;
  border-radius: 10px;

  @media (min-width: ${breakpoints.sm}) {
    height: 240px;
  }

  @media (min-width: ${breakpoints.md}) {
    flex: 1;
    height: 250px;
  }
`;

const BluredHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  z-index: 1;
  backdrop-filter: blur(6px);
  opacity: 0.9;
  mask-image: linear-gradient(to bottom, #000 30%, transparent);

  @media (min-width: ${breakpoints.md}) {
    height: 90px;
    backdrop-filter: blur(10px);
  }
`;
