import { useState } from "react";
import ProcessingButton from "./components/ProcessingButton";
import HoldToDeleteButton from "./components/HoldToDeleteButton";

import styled from "styled-components";

function App() {
  return (
    <StyledContainer>
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
    </StyledContainer>
  );
}

export default App;

const StyledContainer = styled.div`
  max-width: 550px;
  margin: 8rem auto;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledContentHeading = styled.div<{ stagger: number }>`
  font-size: 1rem;
  letter-spacing: -0.2px;
  font-weight: 450;
  color: var(--text);
  --stagger: ${(props) => props.stagger};
`;

const StyledContentDescription = styled.div<{ stagger: number }>`
  font-size: 1rem;
  letter-spacing: -0.2px;
  font-weight: 400;
  color: var(--info);
  line-height: 30px;
  --stagger: ${(props) => props.stagger};
`;
