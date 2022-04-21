import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'

export interface CardInterface {
    title?: string;
    value?: string;
}

const Container = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: white;
    `

const TitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 27px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ValueContainer = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ActionContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    font-size: 20px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-style: solid;
    border-top: 2px solid #689330;
    color: #689330;
    cursor: pointer;
    `
const ModalTitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const TableContainer = styled.div`
    & td {
        border: solid 1px gray;
        padding: 2px;
        width: 40px;
        height: 40px;
        text-align: center;
    }
`
const LandCard = ({title, value}: CardInterface) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const { isDark } = useTheme();
    return (
        <Container>    
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                {value}
            </ValueContainer>
            <ActionContainer onClick={(e) => setModalOpen(true)}>
                MORE INFO
            </ActionContainer>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={{
                    content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    /* width: "70vw",
                    maxWidth: '70vw',
                    minWidth: '70vw', */
                    borderRadius: '15px',
                    background: isDark ? '#27262c' : 'white',
                    zindex: 15,
                    }
                }}
                contentLabel="Example Modal"
                >
                    <ModalTitleContainer>
                        {title}
                    </ModalTitleContainer>
                    <TableContainer>
                        <table>
                            <tr>
                                <td />
                                <td><img src="/images/svgs/common.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/uncommon.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/rare.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/legendary.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/holy.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/mountains.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/plains.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/woods.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/jungle.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/hills.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </table>
                    </TableContainer>
                
            </Modal>
        </Container>
    )
}

export default LandCard
