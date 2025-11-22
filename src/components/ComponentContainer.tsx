import * as React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

const ComponentContainer: React.FC<Props> = (props: Props) => {
  return <StyledComponentContainer>{props.children}</StyledComponentContainer>;
};

export default ComponentContainer;

const StyledComponentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
