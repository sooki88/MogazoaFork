import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    gap: 1.5rem;
    padding: 4rem 0;
  }

  @media (min-width: ${({ theme }) => theme.deviceSizes.desktop}) {
    gap: 2rem;
  }
`;
