import styled from "styled-components";

const StyledSearchContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;
  right: -8rem;
  @media (min-width: ${({ theme }) => theme.deviceSizes.tablet}) {
    z-index: 0;
    right: 0;
    gap: 3rem;
  }
  @media (min-width: ${({ theme }) => theme.deviceSizes.desktop}) {
    gap: 6rem;
  }
`;

export { StyledSearchContainer as InputContainer };