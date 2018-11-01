import React from 'react'
import styled from 'react-emotion'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row'
})

const ButtonRadio = ({ buttons, value, onChange }) => (
  <Wrapper>
    {buttons.map((btn, i) => (
      <Button
        selected={btn.value === value}
        onClick={() => {
          onChange(btn.value)
        }}
        key={i}
      >
        {btn.label}
      </Button>
    ))}
  </Wrapper>
)

export const Button = ({ selected, children, ...props }) => (
  <StyledButton {...props} selected={selected}>{children}</StyledButton>
)

const StyledButton = styled('button')(
  {
    color: '#fff',
    transition: 'color 300ms, background 300ms',
    padding: '6px 15px',
    borderRadius: 100,
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 600,
    border: '2px solid #fff',
    marginLeft: 5,
    '&:first-child': {
      marginLeft: 0
    },
    '&:focus': {
      outline: 'none'
    }
  },
  ({ selected }) => ({
    color: selected ? '#000000' : '#ffffff',
    background: selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)'
  })
)

export default ButtonRadio
