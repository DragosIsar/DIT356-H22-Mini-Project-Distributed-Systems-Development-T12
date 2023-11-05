import styled, { css } from 'styled-components'
import { ReactComponent as LogoIcon } from '../assets/images/logo.svg'
import { breakpoints } from '../MediaQueries'

const Logo = styled(LogoIcon)`
  z-index: 999;
  margin-top: 0.2rem;
  width: 152px;
  fill: #131313;
  display: none;

@media (min-width: ${breakpoints.mobileMin}) {
  display: inline;
  vertical-align: middle;
}
`

export default Logo
