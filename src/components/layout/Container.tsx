import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 11%;
    padding-right: 11%;
  }
`

export default Container
