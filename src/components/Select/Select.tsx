import React, { useState, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ArrowDropDownIcon, Box, BoxProps, Text } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'



export interface SelectProps extends BoxProps {
  options: OptionProps[]
  onOptionChange?: (option: OptionProps) => void
  defaultOptionIndex?: number
}

export interface OptionProps {
  label: string
  value: any
}

const Select: React.FunctionComponent<SelectProps> = ({
  options,
  onOptionChange,
  defaultOptionIndex = 0,
  ...props
}) => {

  const { isDark } = useTheme()

  const DropDownHeader = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 16px;
    box-shadow: ${({ theme }) => theme.shadows.inset};
    border: 1px solid #e8e8e8;
    border-radius: 16px;
    background: ${isDark ? 'rgb(39, 38, 44)' : 'white'};
    transition: border-radius 0.15s;
  `

  const DropDownListContainer = styled.div`
    min-width: 136px;
    height: 0;
    position: absolute;
    overflow: hidden;
    background: ${isDark ? 'rgb(39, 38, 44)' : 'white'};
    z-index: ${({ theme }) => theme.zIndices.dropdown};
    transition: transform 0.15s, opacity 0.15s;
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
    width: 100%;

    ${({ theme }) => theme.mediaQueries.sm} {
      min-width: 168px;
    }
  `

  const DropDownContainer = styled(Box)<{ isOpen: boolean }>`
    cursor: pointer;
    width: 100%;
    position: relative;
    background: white;
    border-radius: 16px;
    height: 40px;
    min-width: 136px;
    user-select: none;
    z-index: 20;

    ${({ theme }) => theme.mediaQueries.sm} {
      min-width: 168px;
    }

    ${(propss) =>
      propss.isOpen &&
      css`
        ${DropDownHeader} {
          border-bottom: 1px solid #e8e8e8;
          border-radius: 16px 16px 0 0;
        }

        ${DropDownListContainer} {
          height: auto;
          transform: scaleY(1);
          opacity: 1;
          border: 1px solid #e8e8e8;
          border-top-width: 0;
          border-radius: 0 0 16px 16px;
          box-shadow: #e8e8e8;
        }
      `}

    svg {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
    }
  `

  const DropDownList = styled.ul`
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    z-index: ${({ theme }) => theme.zIndices.dropdown};
  `

  const ListItem = styled.li`
    list-style: none;
    padding: 8px 16px;
    &:hover {
      background: ${isDark ? '#4e4e4e' : '#e8e8e8'};
    }
  `


  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(defaultOptionIndex)

  const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen)
    event.stopPropagation()
  }

  const onOptionClicked = (selectedIndex: number) => () => {
    setSelectedOptionIndex(selectedIndex)
    setIsOpen(false)

    if (onOptionChange) {
      onOptionChange(options[selectedIndex])
    }
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    
    <DropDownContainer isOpen={isOpen} {...props}>
      <DropDownHeader onClick={toggling}>
        <Text>{options[selectedOptionIndex].label}</Text>
      </DropDownHeader>
      <ArrowDropDownIcon color="text" onClick={toggling} />
      <DropDownListContainer>
        <DropDownList ref={dropdownRef}>
          {options.map((option, index) =>
            index !== selectedOptionIndex ? (
              <ListItem onClick={onOptionClicked(index)} key={option.label}>
                <Text>{option.label}</Text>
              </ListItem>
            ) : null,
          )}
        </DropDownList>
      </DropDownListContainer>
    </DropDownContainer>
  )
}

export default Select
