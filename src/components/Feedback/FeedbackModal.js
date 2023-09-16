/*
 * Copyright 2023 - John Hanna (https://github.com/JPychon)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import styled from 'styled-components';

// Styled Components

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${props => (props.show ? 'block' : 'none')};
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #121212; 
  padding: 20px 40px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  max-width: 90%; 
`;

const ModalMessage = styled.p`
  color: #E0E0E0;
  font-weight: 500;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #B0B0B0;
  cursor: pointer;
`;

// Component

export const FeedbackModal = ({ message, onClose }) => {
  return (
    <ModalBackdrop show={message !== null}>
      <ModalWrapper>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalMessage>{message}</ModalMessage>
      </ModalWrapper>
    </ModalBackdrop>
  );
};
