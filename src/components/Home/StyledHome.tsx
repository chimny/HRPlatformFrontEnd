import styled from 'styled-components'


export const StyledHome = styled.div`
  max-width: 100vw;
  height: 80vh;
  padding: 0 48px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const StyledHomeChild = styled.div`
  width: 50%;
  align-self: center;
  margin: 0 auto;
  
  & svg{
    font-size: 32rem;
  }
`