import styled from 'styled-components/macro'
import { breakpoints } from '../../MediaQueries'

export const Container = styled.div`
  width: 100%;
  max-width: 2100px;
  padding-left: 25px;
  padding-right: 25px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${breakpoints.tabletMin}) {
    padding-left: 50px;
    padding-right: 50px;
  }

  @media (min-width: ${breakpoints.desktopMin}) {
    padding-left: 100px;
    padding-right: 100px;
  }
`

export const FullWidthContainer = styled(Container)`
  padding: 100px 0;
  max-width: unset;

  /* @media (min-width: ${breakpoints.tabletMin}) {
    padding: 130px 0;
  } */
`
