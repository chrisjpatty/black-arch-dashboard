import React, {useState} from 'react'
import styled from 'react-emotion'
import firebase from './api'

const Footer = () => {
  const [disclaimerShown, setDisclaimerShown] = useState(false)
  const logout = () => firebase.auth().signOut()
  const toggleDisclaimer = () => setDisclaimerShown(!disclaimerShown)
  return (
    <Wrapper>
      {disclaimerShown && <Disclaimer onDismiss={toggleDisclaimer} />}
      <Button onClick={toggleDisclaimer}>Disclaimer</Button>
      <RightAlign>
        <Button onClick={logout}>Logout</Button>
      </RightAlign>
    </Wrapper>
  )
}

const Wrapper = styled('footer')({
  display: 'flex',
  flexDirection: 'row',
  padding: 20,
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%'
})

const RightAlign = styled('div')({
  marginLeft: 'auto'
})

const Button = styled('button')({
  background: 'none',
  border: 'none',
  color: '#fff',
  textTransform: 'uppercase',
  fontWeight: 600
})

const Disclaimer = ({onDismiss}) => (
  <DWrapper>
    <DModal>
      This project has been developed as part of a classroom learning experience by students at Utah State University.  While efforts are made to ensure copyrights and intellectual property rights have not been violated, it is the responsibility of the organization using any classroom projects created by USU and its students to make sure the materials contained therein do not infringe the property rights (including without limitation rights of privacy and publicity, trademark rights, copyrights, patents, trade secrets, and licenses) of third parties.
    </DModal>
    <DShade onClick={onDismiss}/>
  </DWrapper>
)

const DWrapper = styled('div')({
  position: 'fixed',
  width: '100%',
  height: '100%',
  left: 0,
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 100,
  zIndex: 99
})

const DModal = styled('div')({
  background: '#fff',
  borderRadius: 10,
  maxWidth: 600,
  padding: 20,
  color: '#000'
})

const DShade = styled('div')({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: 1
})


export default Footer
