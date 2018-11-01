import React from 'react'
import styled from 'react-emotion'

const TextInput = ({ label, value, type="text", onKeyDown = ()=>{}, onChange }) => {
  const handleChange = e => {
    const value = e.target.value;
    onChange(value)
  }

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={handleChange} onKeyDown={onKeyDown}/>
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 20,
  '&:last-child': {
    marginBottom: 0
  }
})

const Label = styled('label')({
  color: 'rgba(255, 255, 255, 0.57)',
  fontFamily: 'sans-serif',
  marginBottom: 4,
  textTransform: 'uppercase',
  fontSize: 12,
  fontWeight: 600
})

const Input = styled('input')({
  background: 'rgba(255,255,255,.2)',
  borderRadius: 5,
  border: 'none',
  height: 30,
  color: 'rgba(255,255,255,.9)',
  fontSize: 16,
  fontWeight: 600,
  padding: 10,
  transition: 'background 100ms',
  '&:focus': {
    outline: 'none',
    background: 'rgba(255,255,255,.3)'
  }
})

export default TextInput
